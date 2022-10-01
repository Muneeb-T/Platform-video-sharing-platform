// @ts-nocheck
import express from 'express';
import { config } from 'dotenv';
import {
    getUser,
    getAllUsers,
    updateUser,
    resetPassword,
    resetPasswordCallback,
    blockOrUnblockUser,
    resetEmail,
    resetEmailCallback,
    deleteOrRestoreUser,
} from '../controllers/account-controllers.js';

import { jwtAuthenticate } from '../middlewares/jwt-auth.js';

const router = express.Router();
config();

router.route('/get-user/:id').get(jwtAuthenticate, getUser);
router.route('/get-users').get(jwtAuthenticate, getAllUsers);
router
    .route('/block-unblock-account/:id')
    .patch(jwtAuthenticate, blockOrUnblockUser);
router.route('/update-user/:id').patch(jwtAuthenticate, updateUser);
router
    .route('/delete-restore-account/:id')
    .patch(jwtAuthenticate, deleteOrRestoreUser);
router.route('/reset-email').post(jwtAuthenticate, resetEmail);
router.route('/reset-email-callback').post(jwtAuthenticate, resetEmailCallback);
router.route('/reset-password').post(resetPassword);
router.route('/reset-password-callback/:token').post(resetPasswordCallback);

export default router;
