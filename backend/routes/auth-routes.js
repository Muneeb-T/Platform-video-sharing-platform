// @ts-nocheck
import express from 'express';
import {
    login,
    register,
    getGoogleAuthURL,
    googleAuthCallback,
    facebookAuthSuccess,
} from '../controllers/auth-controller.js';
import { config } from 'dotenv';
import {
    facebookAuth,
    facebookAuthCallback,
} from '../middlewares/facebook-auth.js';

const router = express.Router();
config();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/google-auth').get(getGoogleAuthURL);
router.route('/google-auth-callback').get(googleAuthCallback);

router.route('/facebook-auth').get(facebookAuth);
router
    .route('/facebook-auth-callback')
    .get(facebookAuthCallback, facebookAuthSuccess);

router.route('/google-auth-failed').get((req, res) => {
    console.log('Google authentication failed');
});

router.route('/google-auth-success').get((req, res) => {
    console.log('Google authentication failed');
});

export default router;
