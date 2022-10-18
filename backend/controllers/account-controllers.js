// @ts-nocheck
import { config } from 'dotenv';
import accountModel from '../models/user/user.js';
import { sendEmail } from '../utils/send-email.js';
import generateResetPasswordHtml from '../utils/html-pages/reset-password.js';
import generateOtp from '../utils/generate-otp.js';

config();

const getUser = async (req, res) => {
    try {
        // console.log('\nGET : Get user');
        // console.log('\nRequested user Id');
        // console.log('===================');
        // console.log('User ID : ', req.user.id);

        const { id: requestedUserId } = req.params;
        const { user: authenticatedUser } = req;
        const { id: authenticatedUserId, role } = authenticatedUser;

        if (requestedUserId !== authenticatedUserId && role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Page not found' });
        }

        const user = await accountModel.findById(requestedUserId);

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

const getAllUsers = async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Page not found' });
        }
        const users = await accountModel.find();
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

const resetEmail = async (req, res) => {
    try {
        const { user: authenticatedUser, body } = req;
        const { email: newEmail, password } = body;
        const { email: emailObject, id: userId } = authenticatedUser;
        const { address: currentEmail } = emailObject;

        if (newEmail == '' || password == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        if (newEmail === currentEmail) {
            return res.status(409).json({
                success: false,
                message: 'You have entered same email address again',
            });
        }

        const user = await accountModel.findById(authenticatedUser);
        //hghjhg oto ==ojkjkl
        user.email.updateRequest = {
            requested: true,
            newEmail,
            otpExpire: Date.now() + 5 * 60 * 1000,
            currentEmailOtp: generateOtp(6),
            newEmailOtp: generateOtp(6),
        };
        await user.save();

        const { newEmailOtp, currentEmailOtp } = user.email.updateRequest;

        const messageDetailsOldEmail = {
            to: currentEmail,
            subject: '[Platfrom] Update email address',
            text: `${currentEmailOtp}`,
        };
        await sendEmail(messageDetailsOldEmail, userId);

        const messageDetailsNewEmail = {
            to: newEmail,
            subject: '[Platfrom] Update email address',
            text: `${newEmailOtp}`,
        };
        await sendEmail(messageDetailsNewEmail, userId);

        res.status(200).json({
            success: true,
            message:
                'OTP verification code has been for both emails sent successfully',
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const resetEmailCallback = async (req, res) => {
    try {
        const { user: requestedUser, body } = req;
        const {
            newEmailOtp: requestedNewEmailOtp,
            currentEmailOtp: requestedCurrentEmailOtp,
        } = body;
        const { id: userId } = requestedUser;

        if (requestedNewEmailOtp == '' || requestedCurrentEmailOtp == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        const user = await accountModel.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'No such user found' });
        }
        const { email } = user;
        const { updateRequest } = email;
        const {
            requested,
            newEmailOtp: savedNewEmailOtp,
            currentEmailOtp: savedCurrentEmailOtp,
            newEmail,
            otpExpire,
        } = updateRequest;

        if (!requested) {
            return res.status(404).json({
                success: false,
                message: 'No such request found',
            });
        }

        if (otpExpire < Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'OTP expired',
            });
        }

        if (requestedCurrentEmailOtp !== savedCurrentEmailOtp) {
            return res.status(403).json({
                success: false,
                errorEmail: { email: email.address, newEmail: false },
                message: 'Invalid OTP',
            });
        }
        if (requestedNewEmailOtp !== savedNewEmailOtp) {
            return res.status(403).json({
                success: false,
                errorEmail: { email: newEmail, newEmail: true },
                message: 'Invalid OTP',
            });
        }

        user.email.updateRequest.requested = false;
        user.email.updateRequest.newEmail = null;
        user.email.updateRequest.newEmailOtp = null;
        user.email.updateRequest.currentEmailOtp = null;
        user.email.updateRequest.otpExpire = null;
        user.email.address = newEmail;

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Email updated successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id: requestedUserId } = req.params;
        const { user: authenticatedUser, body } = req;
        const { id: authenticatedUserId, role } = authenticatedUser;
        const { username, gender, dateOfBirth, country } = body;
        if (requestedUserId !== authenticatedUserId && role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
        }
        const user = await accountModel
            .findById(requestedUserId)
            .select('-password');

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'Invalid user' });
        }

        if (username) user.username = username;
        if (gender) user.gender = gender;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (country) user.country = county;
        await user.save();

        res.status(201).json({
            success: false,
            user,
            message: 'User updated successfully',
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const blockOrUnblockUser = async (req, res) => {
    try {
        const { user, params } = req;
        const { id: userId } = params;
        const { role } = user;

        if (role !== 'admin') {
            return res
                .status(404)
                .json({ success: false, message: 'Unautherized access' });
        }

        const blockOrUnblock = await accountModel.findByIdAndUpdate(
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
            success: true,
            message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        console.log(req.body)
        const { email } = req.body;
        if (email == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }
        const user = await accountModel
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

const resetPasswordCallback = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const { body, params } = req;
        const { newPassword, confirmPassword } = body;
        const { token: resetPasswordToken } = params;

        if (newPassword == '' || confirmPassword == '') {
            return res
                .status(401)
                .json({ success: false, message: 'Bad credentials' });
        }

        if (confirmPassword !== newPassword) {
            return res
                .status(401)
                .json({ success: false, message: 'Password and confirm password must be same' });
        }

        const user = await accountModel.findOne({ resetPasswordToken });

        if (user && user.verifyJwtToken(resetPasswordToken)) {
            user.password = newPassword;
            user.resetPasswordToken = null;
            user.resetPasswordTokenExpire = null;

            await user.save();

            return res.status(201).json({
                success: true,
                message: 'Password updated successfully',
            });
        }

        res.status(400).json({
            success: false,
            message: 'Reset Password Token is invalid or has been expired',
        });
    } catch (err) {
        // console.log('\nReset password error');
        // console.log('=====================');
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteOrRestoreUser = async (req, res, next) => {
    try {
        const { id: requestedUserId } = req.params;
        const { user: authenticatedUser, body } = req;
        const { id: authenticatedUserId, role } = authenticatedUser;
        if (requestedUserId !== authenticatedUserId && role !== 'admin') {
            return res
                .status(401)
                .json({ success: false, message: 'Unautherized access' });
        }

        const deleteOrRestore = await accountModel.findByIdAndUpdate(
            requestedUserId,
            [
                {
                    $set: {
                        isDeleted: {
                            $eq: [false, '$isDeleted'],
                        },
                    },
                },
            ],
            { new: true }
        );

        const { isDeleted } = deleteOrRestore;

        res.status(201).json({
            success: true,
            message: `User ${isDeleted ? 'deleted' : 'restored'} successfully`,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    getUser,
    getAllUsers,
    updateUser,
    blockOrUnblockUser,
    resetEmail,
    resetEmailCallback,
    resetPassword,
    resetPasswordCallback,
    deleteOrRestoreUser,
};
