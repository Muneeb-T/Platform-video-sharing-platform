import api from '../../../api';
const API_URL = '/account';
const getUser = async function (userId) {
    const response = await api.post(`${API_URL}/get-user/:${userId}`);
    return response.data;
};

const resetPassword = async function (email) {
    const response = await api.post(`${API_URL}/reset-password`, email);
    return response.data;
};

const resetPasswordCallback = async function (resetPasswordData) {
    const { values: resetPasswordDetails, token } = resetPasswordData;
    const response = await api.post(
        `${API_URL}/reset-password-callback/${token}`,
        resetPasswordDetails
    );
    return response.data;
};

const accountService = {
    resetPassword,
    resetPasswordCallback,
    getUser,
};

export default accountService;
