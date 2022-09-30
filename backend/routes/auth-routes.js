// @ts-nocheck
import express from 'express';
import {
    login,
    register,
    verifyEmail,
    getGoogleAuthURL,
    googleAuthCallback,
    facebookAuthSuccess,
    facebookAuthFailure,
    refreshAuthToken,
} from '../controllers/auth-controller.js';
import { jwtAuthenticate } from '../middlewares/jwt-auth.js';
import { config } from 'dotenv';
import {
    facebookAuth,
    facebookAuthCallback,
} from '../middlewares/facebook-auth.js';

const router = express.Router();
config();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/confirm-email/:token').get(verifyEmail);
router.route('/refresh-token').get(jwtAuthenticate, refreshAuthToken);
router.route('/google-auth').get(getGoogleAuthURL);
router.route('/google-auth-callback').get(googleAuthCallback);
router.route('/facebook-auth').get(facebookAuth);
router
    .route('/facebook-auth-callback')
    .get(facebookAuthCallback, facebookAuthSuccess);
router.route('/facebook-auth-failed').get(facebookAuthFailure);

export default router;
