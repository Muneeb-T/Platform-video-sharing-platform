// @ts-nocheck
import { config } from 'dotenv';
import userModel from '../models/user/user.js';
import { sendEmail } from '../utils/send-email.js';
import generateResetPasswordHtml from '../utils/html-pages/reset-password.js';

config();

const getUser = async (req, res, next) => {
    try {
        // console.log('\nGET : Get user');
        // console.log('\nRequested user Id');
        // console.log('===================');
        // console.log('User ID : ', req.user.id);

        const { id: requestedUserId } = req.params;
        const { user: requestedUser } = req;
        const { id: authenticatedUserId, role } = requestedUser;

        if (requestedUserId !== authenticatedUserId || role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Page not found' });
        }

        const user = await userModel.findById(requestedUserId);

        res.status(200).json({
            success: true,
            message: 'Fetched user details succesfully',
            user,
        });
    } catch (err) {
        // console.log('\nGet user error');
        // console.log('===============');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Page not found' });
        }
        const users = await userModel.find();
        res.status(200).json({
            success: true,
            users,
            message: 'Fetched all users successfully',
        });
    } catch (err) {
        // console.log('\nGet all users error');
        // console.log('====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const blockOrUnblockAccount = async (req, res, next) => {
    try {
        const { user, params } = req;
        const { id: userId } = params;
        const { role } = user;

        if (role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Unautherized access' });
        }

        const blockOrUnblock = await userModel.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        isBlocked: {
                            $eq: [false, '$isBlocked'],
                        },
                    },
                },
            ],
            { new: true }
        );

        const { isBlocked } = blockOrUnblock;

        res.status(201).json({
            success: false,
            message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (email == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        const user = await userModel
            .findOne({ 'email.address': email })
            .select({ username: 1, email: 1 });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Sorry, We couldn't find such user",
            });
        }
        const { username } = user;
        const capitalizedUsername = `${username
            .charAt(0)
            .toUpperCase()} ${username.slice(1)}`;

        const resetPasswordToken = user.generateResetPasswordToken();
        await user.save();

        const messageDetails = {
            to: email,
            subject: '[Platfrom] - Account recovery',
            text: `
            Hi ${capitalizedUsername} !
            We received a request to reset your Platform password.`,
            html: generateResetPasswordHtml(resetPasswordToken),
        };
        await sendEmail(messageDetails);
        res.status(200).json({
            success: true,
            message: `Confirmation message has sent to ${email}`,
        });
    } catch (err) {
        // console.log('\nReset password error');
        // console.log('=====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const resetPasswordCallback = async (req, res, next) => {
    try {
        const { body, params } = req;
        const { password, 'confirm-password': confirmPassword } = body;
        const { token: resetPasswordToken } = params;

        if (password == '' || confirmPassword !== password) {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Reset Password Token is invalid or has been expired',
            });
        }
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpire = null;

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (err) {
        // console.log('\nReset password error');
        // console.log('=====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    getUser,
    blockOrUnblockAccount,
    resetPassword,
    resetPasswordCallback,
    getAllUsers,
};
