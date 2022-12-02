// @ts-nocheck
import { config } from 'dotenv';
import accountModel from '../models/user/user.js';
import { google } from 'googleapis';
import { sendEmail } from '../utils/send-email.js';
import mongoose from 'mongoose';

config();

const register = async (req, res, next) => {
    let user;
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

        user = await accountModel.create({
            username: email.slice(0, email.indexOf('@')),
            'email.address': email,
            password,
        });

        const verificationToken = user.generateVerificationToken();
        await user.save();

        const { _id: userId } = user;
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
                ${
                    process.env.FRONTEND_HOST_NAME
                }/register/confirm-email/${verificationToken}
                Have fun and don't hesitate to contact us with your feedback`,
        };
        await sendEmail(messageDetails, userId);
        res.status(201).json({
            success: true,
            user,
            message: `Confirmation message has sent to email address ${email}`,
        });
    } catch (err) {
        console.log(err)
        // console.log('\nRegister user api error');
        // console.log('========================');
        if (user) {
            user.remove();
        }
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
        // console.log('\nRequest body');
        // console.log('============');
        // console.log(req.body);

        const { email, password } = req.body;
        if (email == '' || password == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        let user = await accountModel
            .findOne({
                $or: [
                    { 'email.address': email },
                    { 'googleAccount.email': email },
                    { 'facebookAccount.email': email },
                ],
            })
            .select('+password')
            .populate('channel');

        if (
            !user ||
            (user && (!user.password || !user.comparePassword(password)))
        ) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });
        }

        if (
            user &&
            !user.email.verified &&
            user.email.address &&
            user.email.verificationToken
        ) {
            return res.status(401).json({
                success: false,
                message:
                    'Please verify your email address.We already have sent you a verification email.',
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked.',
            });
        }

        const { accessToken, refreshToken } = user.generateJWT();

        await user.save();

        user = user.toObject();
        delete user.password;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                accessToken,
                user,
                message: 'You have successfully logged in.',
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
        const { token: verificationToken } = req.params;
        const user = await accountModel.findOne({
            'email.verificationToken': verificationToken,
        });

        if (user && user.verifyJwtToken(verificationToken)) {
            user.email.verified = true;
            user.email.verificationToken = null;
            user.email.verificationTokenExpire = null;
            const { accessToken, refreshToken } = user.generateJWT();
            await user.save();

            return res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                })
                .status(201)
                .json({
                    success: true,
                    user,
                    accessToken,
                    message: 'Email verified successfully',
                });
        }

        res.status(400).json({
            success: false,
            message: 'Email verification token is invalid or has been expired',
        });
    } catch (err) {
        // console.log('Email verification error');
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

//googleAuthClient
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.FRONTEND_HOST_NAME}/google-auth`
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

        console.log(req.query);

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials({ access_token: tokens.access_token });
        const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
        const { data } = await oauth2.userinfo.get();
        const { email, name, id, picture } = data;
        // console.log('\nUser details from google');
        // console.log('========================');
        // console.log(data);
        const user = await accountModel
            .findOneAndUpdate(
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
            )
            .populate('channel');

        if (!user.username) {
            user.username = user.googleAccount.username;
        }
        if (!user.email.address) {
            user.email.address = email;
            user.email.verified = true;
            await user.save();
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }

        const { accessToken, refreshToken } = user.generateJWT();
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                user,
                accessToken,
            });
    } catch (err) {
        // console.log('\nGoogle authentication error');
        // console.log('===========================');
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const facebookAuth = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log('\nFacebook authenitcation success');
        console.log('================================');
        console.log(userData);
        const {
            id,
            username,
            displayName,
            first_name: firstName,
            last_name: lastName,
            name,
            email,
            gender,
            birthday,
            picture,
        } = userData;

        console.log(userData);
        const user = await accountModel
            .findOneAndUpdate(
                {
                    $or: [
                        { 'email.address': email },
                        { 'googleAccount.email': email },
                        { 'facebookAccount.email': email },
                        { 'facebookAccount.id': id },
                    ],
                },
                {
                    'facebookAccount.username':
                        username ||
                        displayName ||
                        name ||
                        `${firstName} ${lastName}` ||
                        email.slice(0, email.indexOf('@')),
                    'facebookAccount.id': id,
                    'facebookAccount.email': email,
                    'facebookAccount.dateOfBirth': birthday,
                    'facebookAccount.gender': gender,
                    'facebookAccount.picture': picture.data.url,
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                }
            )
            .populate('channel');

        if (!user.username) {
            user.username =
                username ||
                displayName ||
                name ||
                `${firstName} ${lastName}` ||
                email.slice(0, email.indexOf('@'));
        }

        if (!user.email.address) {
            user.email.address = email;
            user.email.verified = true;
            await user.save();
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }

        const { accessToken, refreshToken } = user.generateJWT();

        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                accessToken,
                user,
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const facebookAuthSuccess = async (req, res, next) => {
    try {
        let { user } = req;
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Login failed.Your account has been locked',
            });
        }

        const { accessToken, refreshToken } = user.generateJWT();

        await user.save();
        user = user.populate('channel');

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                accessToken,
                user,
            });
    } catch (err) {
        // console.log('\nFacebook authentication success api error');
        // console.log('=========================================');
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const refreshAuthToken = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const user = await accountModel.findOne({ _id: userId });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }
        const { accessToken, refreshToken } = user.generateJWT();
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .status(201)
            .json({
                success: true,
                accessToken,
                message: 'Access token refreshed successfully',
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const facebookAuthFailure = (req, res, next) => {
    try {
        console.log('\nFacebook authentication failed');
        console.log('===============================');
        console.log(req);
        res.status(401).json({
            success: true,
            message: 'Facebook authentication failed',
        });
    } catch (err) {
        console.log(err)
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
    refreshAuthToken,
    facebookAuthFailure,
    facebookAuth,
};
