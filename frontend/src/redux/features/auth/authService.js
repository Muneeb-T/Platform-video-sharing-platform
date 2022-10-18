import api from '../../../api';

const API_URL = '/auth';

const register = async function (userData) {
    const { data } = await api.post(`${API_URL}/register`, userData);
    return data;
};

const login = async function (userData) {
    const { data } = await api.post(`${API_URL}/login`, userData);
    return data;
};

const facebookAuth = async function (userData) {
    const { data } = await api.post(`${API_URL}/facebook-auth`, userData);
    return data;
};

const verifyAccount = async function (token) {
    const { data } = await api.get(`${API_URL}/confirm-email/${token}`);
    return data;
};

const googleAuth = async function (code) {
    const { data } = await api.get(`${API_URL}/google-auth-callback/`, {
        params: { code },
    });
    return data;
};

const authService = {
    register,
    login,
    verifyAccount,
    facebookAuth,
    googleAuth,
};

export default authService;
