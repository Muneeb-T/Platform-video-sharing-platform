// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import countryList from 'country-list-with-dial-code-and-flag';
import emailValidator from 'email-validator';
import linkModel from './link.js';
import fileModel from './file.js';
import { phone } from 'phone';
import findOneOrCreate from 'mongoose-find-one-or-create';
import moment from 'moment';

const countries = countryList.map((country) => country.code);
const { Schema } = mongoose;
const channelSchema = new Schema(
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
                validate: {
                    validator: function (email) {
                        return emailValidator.validate(email);
                    },
                    message: 'Enter valid email address.',
                },
            },
        },
        role: {
            type: String,
            enum: {
                default: 'user',
                values: ['admin', 'user'],
                message: 'Invalid role',
            },
        },
        password: {
            type: String,
            validate: {
                validator: function (password) {
                    const regex =
                        /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                    return regex.test(password);
                },
                message:
                    'Password must contain - At least one upper case English,At least one lower case English,At least one digit,At least one special character,Minimum eight characters.',
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
        //basic info
        description: {
            type: String,
            maxLength: [
                1000,
                'Description exceeds the limit (1000 characters only).',
            ],
        },
        links: {
            type: [linkModel],
        },
        linksOnBanner: {
            type: Number,
            max: [
                5,
                'Number of links for displaying on banner exceeds the limit(5 links only).',
            ],
            min: [
                0,
                'Number of links for displaying on banner must be between 0 and 5.',
            ],
        },
        contact: {
            phoneNumber: {
                type: String,
                index: false,
            },
            email: {
                type: String,
                validate: {
                    validator: function (email) {
                        return emailValidator.validate(email);
                    },
                    message: 'Enter valid email address.',
                },
                index: false,
            },
        },
        //branding
        channelLogo: { type: fileModel },
        banners: [{ type: fileModel }],
        watermark: { type: fileModel },
        //layout
    },
    { timestamps: true }
);

channelSchema.plugin(findOneOrCreate);

channelSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    if (user.isModified('phone')) {
        const modifiedPhone = phone(user.phone, { country: user.country });
        if (modifiedPhone.isValid) {
            user.phone = modifiedPhone.phoneNumber;
            next();
        }
        return next({ message: 'Enter valid phone number.' });
    }
});

channelSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

channelSchema.methods.generateJWT = function () {
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

export default mongoose.model('Channel', channelSchema);
