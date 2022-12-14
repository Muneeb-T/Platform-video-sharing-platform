import axios from 'axios';
const backendHostname = process.env.REACT_APP_BACKEND_HOSTNAME;
const axiosApiInstance = axios.create({
    baseURL: `${backendHostname}/api`,
    withCredentials: true,
});

export default axiosApiInstance;
