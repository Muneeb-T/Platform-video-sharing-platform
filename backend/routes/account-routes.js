// @ts-nocheck
import express from 'express';
import { config } from 'dotenv';
import {
    getUser,
    resetPassword,
    resetPasswordCallback,
    blockOrUnblockAccount,
    getAllUsers,
} from '../controllers/account-controllers.js';

import { jwtAuthenticate } from '../middlewares/jwt-auth.js';

const router = express.Router();
config();

router.route('/get-user/:id').get(jwtAuthenticate, getUser);
router.route('/get-users').get(jwtAuthenticate, getAllUsers);
router
    .route('/block-or-unblock-account/:id')
    .patch(jwtAuthenticate, blockOrUnblockAccount);
router.route('/update-user/:id').get();
router.route('/reset-password').post(resetPassword);
router.route('/reset-password-callback/:token').post(resetPasswordCallback);

export default router;
