// @ts-nocheck
import express from 'express';
import { config } from 'dotenv';
import {
    getUser,
    resetPassword,
    resetPasswordCallback,
    blockOrUnblockAccount,
} from '../controllers/account-controllers.js';

import { jwtAuthenticate } from '../middlewares/jwt-auth.js';

const router = express.Router();
config();

router.route('/get-user/:id').get(jwtAuthenticate, getUser);
router
    .route('/block-or-unblock-account/:id')
    .patch(jwtAuthenticate, blockOrUnblockAccount);
router.route('/reset-password').post(resetPassword);
router.route('/reset-password-callback/:id').post(resetPasswordCallback);

export default router;
