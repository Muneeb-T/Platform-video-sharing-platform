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
    facebookAuth,
} from '../controllers/auth-controller.js';
import { jwtAuthenticate } from '../middlewares/jwt-auth.js';
import { config } from 'dotenv';
// import {
//     facebookAuth,
//     facebookAuthCallback,
// } from '../middlewares/facebook-auth.js';

const router = express.Router();
config();

router.post('/register', register);
router.post('/login', login);
router.get('/confirm-email/:token', verifyEmail);
router.get('/refresh-token', jwtAuthenticate, refreshAuthToken);
router.get('/google-auth', getGoogleAuthURL);
router.get('/google-auth-callback', googleAuthCallback);
router.post('/facebook-auth', facebookAuth);

// router
//     .route('/facebook-auth-callback')
//     .get(facebookAuthCallback, facebookAuthSuccess);
// router.route('/facebook-auth-failed').get(facebookAuthFailure);

export default router;
