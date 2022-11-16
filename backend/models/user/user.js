// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import countryList from 'country-list-with-dial-code-and-flag';
import emailValidator from 'email-validator';
import { phone } from 'phone';
import findOneOrCreate from 'mongoose-find-one-or-create';
import moment from 'moment';
import imageFileModel from '../file/image-file.js';

const passwordRegexValidators = [
    {
        validator: function (password) {
            const regex = /^(?=.*?[A-Z])/;
            return regex.test(password);
        },
        message: 'Password must contain atleast one uppercase',
    },
    {
        validator: function (password) {
            const regex = /(?=.*?[a-z])/;
            return regex.test(password);
        },
        message: 'Password must contain atleast one lowercase',
    },
    {
        validator: function (password) {
            const regex = /(?=.*?[0-9])/;
            return regex.test(password);
        },
        message: 'Password must contain atleast one digit',
    },
    {
        validator: function (password) {
            const regex = /(?=.*?[#?!@$%^&*-])/;
            return regex.test(password);
        },
        message: 'Password must contain atleast one special character',
    },
    {
        validator: function (password) {
            const regex = /.{8,}$/;
            return regex.test(password);
        },
        message: 'Password must contain minimum 8 characters',
    },
];

const countries = countryList.map((country) => country.code);
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        //user details
        username: {
            type: String,
            maxLength: [30, 'Username exceeds the limit (30 characters only).'],
        },
        email: {
            verified: {
                type: Boolean,
                default: false,
            },
            verificationToken: { type: String, default: null },
            address: {
                type: String,
                lowercase: true,
                unique: true,
                sparse: true,
                default: null,
                validate: [
                    {
                        validator: function (email) {
                            if (email === null) {
                                return true;
                            }
                            return emailValidator.validate(email);
                        },
                        message: 'Enter valid email address.',
                    },
                ],
            },
            updateRequest: {
                requested: { type: Boolean, default: false },
                newEmail: {
                    type: String,
                    lowercase: true,
                    unique: true,
                    sparse: true,
                    validate: [
                        {
                            validator: function (email) {
                                if (email === null) {
                                    return true;
                                }
                                return emailValidator.validate(email);
                            },
                            message: 'Enter valid email address.',
                        },
                    ],
                },
                otpExpire: { type: Date, default: null },
                currentEmailOtp: { type: String, default: null },
                newEmailOtp: { type: String, default: null },
            },
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'user'],
                message: 'Invalid role',
            },
            default: 'user',
        },
        profilePicture: { type: imageFileModel },
        password: {
            type: String,
            select: false,
            validate: [...passwordRegexValidators],
            // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
            // This regex will enforce these rules:
            // At least one upper case English letter, (?=.*?[A-Z]) *
            // At least one lower case English letter, (?=.*?[a-z])
            // At least one digit, (?=.*?[0-9])
            // At least one special character, (?=.*?[#?!@$%^&*-])
            // Minimum eight in length .{8,} (with the anchors)
        },
        phone: {
            type: String,
            unique: true,
            sparse: true,
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: 'Enter valid gender.',
            },
        },
        dateOfBirth: {
            type: Date,
            validate: [
                {
                    validator: function (date) {
                        return moment.isDate(date);
                    },
                    message: 'Enter valid date of birth.',
                },
                {
                    validator: function (date) {
                        return moment(date).isBefore(moment(), 'day');
                    },
                    message: 'Enter a date before today.',
                },
            ],
        },
        country: {
            type: String,
            enum: {
                values: [...countries],
                message: 'Enter valid country name.',
            },
        },
        googleAccount: {
            id: { type: String },
            username: { type: String },
            email: { type: String },
            picture: { type: String },
        },
        facebookAccount: {
            id: { type: String },
            username: { type: String },
            email: { type: String },
            picture: { type: String },
            gender: { type: String },
            dateOfBirth: { type: String },
        },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        accessToken: { type: String },
        refreshToken: { type: String },
        resetPasswordToken: { type: String, default: null },
        channel: { type: mongoose.Types.ObjectId, ref: 'Channel' },
        following: [{ type: mongoose.Types.ObjectId, ref: 'Channel' }],
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;

    const { phone: phoneNumber, country } = user;
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
    }
    if (user.isModified('phone')) {
        const modifiedPhone = phone(phoneNumber, {
            country,
            validateMobilePrefix: true,
            strictDetection: true,
        });
        const { isValid, phoneNumber: modifiedPhoneNumber } = modifiedPhone;
        if (!isValid) {
            return next({ message: 'Enter valid phone number' });
        }
        user.phone = modifiedPhoneNumber;
    }
    next();
});

userSchema.plugin(findOneOrCreate);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
    const user = this;
    const {
        _id: id,
        email,
        username,
        role,
        googleAccount,
        facebookAccount,
    } = user;

    const { address: emailAddress } = email;
    const { email: googleEmail, username: googleUsername } = googleAccount;
    const { email: facebookEmail, username: facebookUsername } =
        facebookAccount;

    let payload = {
        id,
        email: emailAddress || googleEmail || facebookEmail,
        username: username || googleUsername || facebookUsername,
        role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    return { accessToken, refreshToken };
};

userSchema.methods.generateResetPasswordToken = function () {
    const user = this;
    const { _id: userId, email } = user;
    const payload = { userId, email: email.address };
    user.resetPasswordToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });

    return user.resetPasswordToken;
};

userSchema.methods.verifyJwtToken = function (token) {
    const user = this;
    console.log(user);
    const { _id: userId, email } = user;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (
        decodedToken.userId === userId.toString() &&
        decodedToken.email === email.address
    ) {
        return true;
    }
    return false;
};

userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const { _id: userId, email } = user;
    const payload = { userId, email: email.address };
    user.email.verificationToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return user.email.verificationToken;
};

export default mongoose.model('User', userSchema);
