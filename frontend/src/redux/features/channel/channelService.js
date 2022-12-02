import api from '../../../api';
import axios from 'axios';

const API_URL = '/channel';

const getChannel = async function (channel, accessToken) {
    const { userId, params } = channel;
    console.log('this is params');
    console.log(params);
    const { data } = await api.get(`${API_URL}/get-channel/${userId}`, {
        params,
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : 'Guest',
        },
    });
    console.log('popular');
    console.log(data.channel.requestedVideos);
    return data;
};

const createChannel = async function (channelDetails, accessToken) {
    let { banner, channelLogo, ...otherDetails } = channelDetails;
    if (banner) {
        const formData = new FormData();
        formData.append('file', banner);
        formData.append('upload_preset', 'channel-banners');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        banner = data;
    }
    if (channelLogo) {
        const formData = new FormData();
        formData.append('file', channelLogo);
        formData.append('upload_preset', 'channel-logos');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        channelLogo = data;
    }
    const { data } = await api.post(
        `${API_URL}/create-channel/`,
        { banner, channelLogo, ...otherDetails },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return data;
};

const followChannel = async function (channelAndUser, accessToken) {
    const { data } = await api.patch(
        `${API_URL}/follow-channel/`,
        { ...channelAndUser },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return data;
};

const channelAnalytics = async function (params, accessToken) {
    const { channelId, ...otherParams } = params;
    const { data } = await api.get(`${API_URL}/channel-analytics/${channelId}`, {
        params: otherParams,
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
};

const updateChannel = async function (update, accessToken) {
    console.log(update);
    const { channelId, ...otherDetails } = update;
    const { channelLogo, banner, watermark } = otherDetails;
    if (channelLogo) {
        const formData = new FormData();
        formData.append('file', channelLogo);
        formData.append('upload_preset', 'channel-logos');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        otherDetails.channelLogo = data;
    }
    if (banner) {
        const formData = new FormData();
        formData.append('file', banner);
        formData.append('upload_preset', 'channel-banners');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        otherDetails.banner = data;
    }
    if (watermark) {
        const formData = new FormData();
        formData.append('file', watermark);
        formData.append('upload_preset', 'channel-watermarks');
        formData.append('cloud_name', 'drjndmchy');
        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/drjndmchy/upload',
            formData
        );
        otherDetails.watermark = data;
    }
    const { data } = await api.put(`${API_URL}/update-channel/${channelId}`, otherDetails, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
};
const likeChannel = async (details, accessToken) => {
    const { channelId, ...otherDetails } = details;
    console.log(channelId);
    const { data } = await api.patch(`${API_URL}/update-channel/${channelId}`, otherDetails, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
};
const dislikeChannel = async (details, accessToken) => {
    const { channelId, ...otherDetails } = details;
    const { data } = await api.patch(`${API_URL}/update-channel/${channelId}`, otherDetails, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
};
const channelService = {
    getChannel,
    createChannel,
    followChannel,
    channelAnalytics,
    updateChannel,
    likeChannel,
    dislikeChannel,
};

export default channelService;
