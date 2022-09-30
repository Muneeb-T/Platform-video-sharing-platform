// @ts-nocheck
import express, { Router } from 'express';
import { config } from 'dotenv';
import {
    getChannel,
    updateChannel,
} from '../controllers/channel-controllers.js';
import upload from '../middlewares/multer-cloudinary.js';
import { jwtAuthenticate } from '../middlewares/jwt-auth.js';

const router = Router();

config();

router.route('/get-channel/:id').get(getChannel);
router.route('/update-channel/:id').put(
    upload.fields([
        {
            name: 'channelLogo',
            maxCount: 1,
        },
        {
            name: 'banners',
            maxCount: 3,
        },
        {
            name: 'watermark',
            maxCount: 1,
        },
    ]),
    updateChannel
);

export default router;
