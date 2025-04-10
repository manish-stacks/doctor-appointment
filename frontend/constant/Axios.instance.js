import axios from 'axios';
import { API_URL_BASE } from './Api';

export const AxiosInstance = axios.create({
    baseURL: API_URL_BASE,
    timeout: 5000,
});

AxiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('Axios Error:', error?.response?.data?.message || error.message);
        const message = error?.response?.data?.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);
