import axios from 'axios';

const API_URL = '/api/auth';

const register = async function (userData) {
    console.log(userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};
const authService = { register };

export default authService;
