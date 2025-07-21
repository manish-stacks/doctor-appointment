

import { useUserStore } from '@/store/useUserStore';
import axios, { AxiosError } from 'axios';
import Cookies from "js-cookie";


if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('API_URL environment variable is not defined');
}

interface ApiErrorResponse {
    message: string;
    status?: number;
}

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        if (status === 403) {
            console.warn('403 Forbidden - Logging out...');
            useUserStore.getState().logout();
        }
        // console.error('Axios Error:', errorMessage);
        return Promise.reject(new Error(errorMessage));
    }
);
