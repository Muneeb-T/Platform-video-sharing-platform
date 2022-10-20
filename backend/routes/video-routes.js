import express from 'express';
import {
    saveVideo,
    updateVideoDetails,
} from '../controllers/video-controllers.js';
const router = express.Router();

router.post('/upload', saveVideo);
router.put('/update-video-details/:id', updateVideoDetails);

export default router;
