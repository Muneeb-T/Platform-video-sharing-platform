import api from '../../../api';
import axios from 'axios';


const API_URL = '/video';

const uploadVideo = async function (video, getProgress) {
    const { data: cloudUpload } = await axios.post(
        'https://api.cloudinary.com/v1_1/drjndmchy/upload',
        video,
        {
            onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                getProgress(percentCompleted);
            },
        }
    );
    return cloudUpload;
};

const saveVideoDetails = async function (videoDetails) {
    console.log('reached at save function ');
    const { video, details } = videoDetails;
    let { thumbnail, ...others } = details;
    if (thumbnail) {
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            thumbnail
        );
        thumbnail = data;
    }
    const { data } = await api.post(`${API_URL}/upload`, {
        thumbnail,
        ...others,
        video,
    });

    return data;
};

const videoService = { uploadVideo, saveVideoDetails };

export default videoService;
