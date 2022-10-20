import { config } from 'dotenv';
import videoModel from '../models/video/video.js';
config();

const saveVideo = async (req, res, next) => {
    try {
        console.log('request body');
        console.log('=============');
        console.log(req.body);
        const { body } = req;
        console.log(body)
        const video = await videoModel.create(body);

        res.status(201).json({
            success: true,
            message: 'Video saved successfully',
            video,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateVideoDetails = async (req, res, next) => {
    try {
        const { thumbnail, videoDetails } = req.body;
        const { id: videoId } = req.params;
        const video = await videoModel.findByIdAndUpdate(
            videoId,
            { thumbnail, ...videoDetails },
            { new: true }
        );
        res.status(201).json({
            success: true,
            video,
            message: 'Video details updated successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export { saveVideo, updateVideoDetails };
