// @ts-nocheck
import express from 'express';
import { config } from 'dotenv';
import {
    getUser,
    getChannel,
    updateChannel,
} from '../controllers/channel-controllers.js';

import upload from '../middlewares/multer-cloudinary.js';

const router = express.Router();
config();

router.route('/get-user/:id').get(getUser);
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
