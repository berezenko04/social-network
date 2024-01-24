import axios from "axios";
import Cookies from 'js-cookie'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/v1'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = Cookies.get('token');
    return config;
});

export default instance;