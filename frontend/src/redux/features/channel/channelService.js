import api from '../../../api';
import axios from 'axios';

const API_URL = '/channel';

const getChannel = async function (userId) {
    const { data } = await api.get(`${API_URL}/get-channel/${userId}`);
    console.log('channel data');
    console.log(data);
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
    const { data } = await api.get(
        `${API_URL}/channel-analytics/${channelId}`,
        {
            params: otherParams,
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return data;
};

const channelService = {
    getChannel,
    createChannel,
    followChannel,
    channelAnalytics,
};

export default channelService;
