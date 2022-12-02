// @ts-nocheck
import express, { Router } from 'express';
import { config } from 'dotenv';
import {
    getChannel,
    updateChannel,
    createChannel,
    followChannel,
    channelAnalytics,
    updateChannelNotProtected,
} from '../controllers/channel-controllers.js';
import { jwtAuthenticate, jwtAuthenticate2 } from '../middlewares/jwt-auth.js';

const router = Router();

config();

router.post('/create-channel', jwtAuthenticate, createChannel);
router.get('/get-channel/:id', jwtAuthenticate2, getChannel);
router.patch('/follow-channel', jwtAuthenticate, followChannel);
router.get('/channel-analytics/:id', jwtAuthenticate, channelAnalytics);
router
    .route('/update-channel/:id')
    .put(jwtAuthenticate, updateChannel)
    .patch(jwtAuthenticate, updateChannelNotProtected);

export default router;
