// @ts-nocheck
import express, { Router } from 'express';
import { config } from 'dotenv';
import {
    getChannel,
    updateChannel,
    createChannel,
    followChannel,
    channelAnalytics,
} from '../controllers/channel-controllers.js';
import { jwtAuthenticate } from '../middlewares/jwt-auth.js';

const router = Router();

config();

router.post('/create-channel', jwtAuthenticate, createChannel);
router.get('/get-channel/:id', getChannel);
router.patch('/follow-channel', jwtAuthenticate, followChannel);
router.get('/channel-analytics/:id', jwtAuthenticate, channelAnalytics);

export default router;
