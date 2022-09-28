// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import countryList from 'country-list-with-dial-code-and-flag';
import emailValidator from 'email-validator';
import { phone } from 'phone';
import findOneOrCreate from 'mongoose-find-one-or-create';
import moment from 'moment';

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
            address: {
                type: String,
                lowercase: true,
                unique: true,
                sparse: true,
                validate: [
                    {
                        validator: function (email) {
                            return emailValidator.validate(email);
                        },
                        message: 'Enter valid email address.',
                    },
                ],
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
        password: {
            type: String,
            select: false,
            validate: {
                validator: function (password) {
                    const regex =
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                    return regex.test(password);
                },
                message:
                    'Password must contain - At least one upper case, At least one lower case, At least one digit, At least one special character, Minimum eight characters.',
            },
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
        },
        isBlocked: { type: Boolean, default: false },
        resetPasswordToken: { type: String },
        resetPasswordTokenExpiry: { type: Date },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        console.log(user);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
    }
});

userSchema.plugin(findOneOrCreate);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    });
};

userSchema.methods.generateResetPasswordToken = async function () {
    const user = this;
    const { _id: userId } = user;
    const salt = bcrypt.genSaltSync(10);
    const resetPasswordToken = bcrypt.hashSync(userId.toString(), salt);
    await user.updateOne(
        {},
        {
            resetPasswordToken,
            resetPasswordTokenExpiry: Date.now() + 15 * 60 * 1000,
        }
    );
    return resetPasswordToken;
};

export default mongoose.model('User', userSchema);
