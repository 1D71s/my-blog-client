import axios, { AxiosInstance } from 'axios';

const url = process.env.REACT_APP_URL

const instance: AxiosInstance = axios.create({
    baseURL: url
});

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default instance;
