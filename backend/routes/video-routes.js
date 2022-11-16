import express from 'express';
import { jwtAuthenticate, jwtAuthenticate2 } from '../middlewares/jwt-auth.js';
import {
    saveVideo,
    updateVideoDetails,
    updateVideoDetailsNotProtected,
    getVideos,
    getVideo,
} from '../controllers/video-controllers.js';
const router = express.Router();

router.post('/upload/:id', jwtAuthenticate, saveVideo);
router
    .route('/update-video-details/:id')
    .put(jwtAuthenticate, updateVideoDetails)
    .patch(updateVideoDetailsNotProtected);
router.get('/videos', jwtAuthenticate2, getVideos);
router.get('/video', getVideo);
export default router;
