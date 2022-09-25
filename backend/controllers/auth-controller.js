// @ts-nocheck
import { config } from 'dotenv';
import channelModel from '../models/channel/channel.js';
import mongoose from 'mongoose';
import { google } from 'googleapis';
config();
const register = async (req, res, next) => {
    try {
        // console.log('\nRequest body');
        // console.log('============');
        // console.log(req.body);

        const { email, password } = req.body;
        if (email === '' || password === '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }
        try {
            const newUser = new channelModel(req.body);
            const user = await newUser.save();
            res.status(201).json({
                success: true,
                token: user.generateJWT(),
                user: { _id: user._id, user: user.email },
            });
        } catch (err) {
            // console.log('\nRegister user error');
            // console.log('===================');
            // console.log(err);
            let { message } = err;
            const { errors, keyPattern, name } = err;
            console.log('Error name : ', name);
            if (err.code === 11000) {
                const key = Object.keys(keyPattern)[0];
                message = `Already have account in this ${key}`;
            }

            if (err instanceof mongoose.Error.CastError) {
                const key = Object.keys(errors)[0];
                message = `Enter valid ${key}`;
            }

            if (err instanceof mongoose.Error.ValidationError) {
                const key = Object.keys(errors)[0];
                if (errors[key].name === 'CastError') {
                    message = `Enter a valid ${key}`;
                } else {
                    message = errors[key].message;
                }
            }

            res.status(500).json({ success: false, message });
        }
    } catch (err) {
        // console.log('\nRegister user api error');
        // console.log('========================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const login = async (req, res, next) => {
    try {
        // console.log('\nRequest body');
        // console.log('============');
        // console.log(req.body);

        const { email, password } = req.body;
        if (email === '' || password === '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        let user = await channelModel.findOne({ email }).select({
            username: 1,
            email: 1,
            phone: 1,
            gender: 1,
            country: 1,
            dateOfBirth: 1,
            googleAccount: 1,
            facebookAccount: 1,
            channelLogo: 1,
            password: 1,
        });

        if (!user)
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });

        if (!user.comparePassword(password))
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });

        const token = user.generateJWT()
        user = user.toObject();
        delete user.password;

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (err) {
        console.log('\nLogin api error');
        console.log('===============');
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//googleAuthClient
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.ROOT_URL}/api/auth/google-auth-callback`
);

const getGoogleAuthURL = async (req, res, next) => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
    });
    res.redirect(authorizationUrl);
};

const googleAuthCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials({ access_token: tokens.access_token });
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });
        const { data } = await oauth2.userinfo.get();
        const { email, name, id, picture } = data;
        // console.log('\nUser details from google');
        // console.log('========================');
        // console.log(data);

        const user = await channelModel
            .findOneAndUpdate(
                {
                    $or: [
                        { email },
                        { 'googleAccount.email': email },
                        { 'googleAccount.id': id },
                        { 'facebookAccount.email': email },
                    ],
                },
                {
                    'googleAccount.username': name,
                    'googleAccount.id': id,
                    'googleAccount.email': email,
                    'googleAccount.picture': picture,
                },
                {
                    new: true,
                    upsert: true,
                }
            )
            .select({
                username: 1,
                email: 1,
                phone: 1,
                gender: 1,
                country: 1,
                dateOfBirth: 1,
                googleAccount: 1,
                facebookAccount: 1,
                channelLogo: 1,
            });

        res.status(200).json({ success: true, token: user.generateJWT() });
    } catch (err) {
        // console.log('\nGoogle authentication error');
        // console.log('===========================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const facebookAuthSuccess = async (req, res, next) => {
    try {
        const { token } = req.user;
        res.status(200).json({ success: true, token });
    } catch (err) {
        // console.log('\nFacebook authentication success api error');
        // console.log('=========================================');
        // console.log(err);
        res.status(500).json({
            sucesss: false,
            message: 'Internal server error',
        });
    }
};

export {
    register,
    login,
    getGoogleAuthURL,
    googleAuthCallback,
    facebookAuthSuccess,
};
