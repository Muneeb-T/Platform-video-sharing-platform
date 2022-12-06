import api from '../../../api';
import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';

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

const saveVideoDetails = async function (videoDetails, accessToken) {
    console.log('video details');
    console.log(videoDetails);
    const { video, details } = videoDetails;
    let { thumbnail, userId, ...others } = details;
    if (thumbnail) {
        const formData = new FormData();
        formData.append('file', thumbnail);
        formData.append('upload_preset', 'channel-logos');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        console.log(data);
        thumbnail = data;
    }
    console.log('upload');
    console.log(thumbnail);
    const { data } = await api.post(
        `${API_URL}/upload/${userId}`,
        {
            thumbnail,
            ...others,
            video,
        },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );

    return data;
};

const getLatestVideo = async function (params) {
    const { data } = await api.get(`${API_URL}/video/`, { params });
    return data;
};

const getVideos = async function (searchParams, accessToken) {
    const { data } = await api.get(`${API_URL}/videos/`, {
        params: searchParams,
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : 'Guest',
        },
    });
    return data;
};

const getVideo = async function (params) {
    const { data } = await api.get(`${API_URL}/video/`, { params });
    console.log(data);
    return data;
};

const updateVideo = async function (updations, accessToken) {
    let { thumbnail, videoId, ...otherDetails } = updations;
    if (thumbnail) {
        const formData = new FormData();
        formData.append('file', thumbnail);
        formData.append('upload_preset', 'thumbnails');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload/',
            formData
        );
        console.log(data);
        thumbnail = data;
    }
    const { data } = await api.put(
        `${API_URL}/update-video-details/${videoId}`,
        {
            thumbnail,
            ...otherDetails,
        },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return data;
};

const likeOrDislikeVideo = async function (likeOrDislike, accessToken) {
    const { videoId, ...otherDetails } = likeOrDislike;
    const { data } = await api.put(`${API_URL}/update-video-details/${videoId}`, otherDetails, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
};

const setViews = async function (views) {
    const { videoId, ...otherDetails } = views;
    const { data } = await api.patch(`${API_URL}/update-video-details/${videoId}`, otherDetails);
    return data;
};

const saveComment = async function (comment, accessToken) {
    const { videoId, ...otherDetails } = comment;
    const { data } = await api.put(
        `${API_URL}/update-video-details/${videoId}`,
        { comment: otherDetails },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return data;
};

const saveViewData = async function (view) {
    const { video, ...otherDetails } = view;

    console.log(otherDetails);
    const { data } = await api.patch(`${API_URL}/update-video-details/${video}`, {
        ...otherDetails,
    });
    return data;
};

const likeOrDislikeComment = async function (likeOrDislike, accessToken) {
    const { videoId, ...otherDetails } = likeOrDislike;

    console.log('Request in service');
    console.log(otherDetails);

    const { data } = await api.put(
        `${API_URL}/update-video-details/${videoId}`,
        { updateComment: otherDetails },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );

    console.log('Response in service');
    console.log(otherDetails);

    return data;
};

const deleteVideos = async function (videos, accessToken) {
    const { data } = await api.patch(`${API_URL}/delete-videos`, videos, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    return data;
};

const videoService = {
    uploadVideo,
    saveVideoDetails,
    getLatestVideo,
    getVideos,
    getVideo,
    updateVideo,
    likeOrDislikeVideo,
    setViews,
    saveComment,
    saveViewData,
    likeOrDislikeComment,
    deleteVideos,
};

export default videoService;
