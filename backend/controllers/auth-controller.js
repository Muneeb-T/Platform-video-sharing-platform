// @ts-nocheck
import { config } from 'dotenv';
import accountModel from '../models/user/user.js';
import { google } from 'googleapis';
import { sendMail } from '../utils/send-email.js';
import bcrypt from 'bcryptjs';
config();

const register = async (req, res, next) => {
    try {
        // console.log('\nRequest body');
        // console.log('============');
        // console.log(req.body);
        const { email, password } = req.body;
        if (email == '' || password == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        let user = await accountModel.findOne({
            $or: [
                { 'googleAccount.email': email },
                { 'facebookAccount.email': email },
            ],
        });

        if (user) {
            throw new Error({ code: 11000 });
        }

        user = await accountModel.create({
            username: email.slice(0, email.indexOf('@')),
            'email.address': email,
            password,
        });

        const messageDetails = {
            to: email,
            subject: '[Platfrom] Confirm email address',
            text: `
                Welcome ${
                    user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)
                } !

                Thanks for signing up with Platform !

                You must follow this link to activate your account:
                ${process.env.ROOT_URL}/api/auth/confirm-email/${user._id}
                Have fun and don't hesitate to contact us with your feedback`,
        };
        await sendMail(messageDetails);
        res.status(201).json({
            success: true,
            message: `Confirmation message has sent to email address ${email}`,
        });
    } catch (err) {
        // console.log('\nRegister user api error');
        // console.log('========================');
        console.log(err);
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Already have acccount in this email',
            });
        }
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        console.log('\nRequest body');
        console.log('============');
        console.log(req.body);

        const { email, password } = req.body;
        if (email == '' || password == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        let user = await accountModel
            .findOne({ 'email.address': email })
            .select('+password');

        if (!user || !user.email.verified)
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });

        if (!user.comparePassword(password))
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }

        const token = user.generateJWT();
        user = user.toObject();
        delete user.password;

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (err) {
        // console.log('\nLogin api error');
        // console.log('===============');
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const user = await accountModel.findByIdAndUpdate(
            userId,
            {
                'email.verified': true,
            },
            { new: true }
        );
        res.status(201).json({
            success: true,
            user,
            token: user.generateJWT(),
            message: 'Email verified successfully',
        });
    } catch (err) {
        console.log('Email verification error');
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
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
        const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
        const { data } = await oauth2.userinfo.get();
        const { email, name, id, picture } = data;
        // console.log('\nUser details from google');
        // console.log('========================');
        // console.log(data);
        const user = await accountModel.findOneAndUpdate(
            {
                $or: [
                    { 'email.address': email },
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
                runValidators: true,
            }
        );

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }

        res.status(200).json({
            success: true,
            token: user.generateJWT(),
            user,
        });
    } catch (err) {
        // console.log('\nGoogle authentication error');
        // console.log('===========================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const facebookAuthSuccess = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }
        res.status(200).json({
            success: true,
            token: user.generateJWT(),
            user,
        });
    } catch (err) {
        // console.log('\nFacebook authentication success api error');
        // console.log('=========================================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    register,
    login,
    verifyEmail,
    getGoogleAuthURL,
    googleAuthCallback,
    facebookAuthSuccess,
};

