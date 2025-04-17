import axios, { AxiosError } from 'axios';
import { config } from 'dotenv';

config();

if (!process.env.API_URL) {
    throw new Error('API_URL environment variable is not defined');
}

interface ApiErrorResponse {
    message: string;
    status?: number;
}

export const AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Axios Error:', errorMessage);
        return Promise.reject(new Error(errorMessage));
    }
);
