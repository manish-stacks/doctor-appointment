import { AxiosInstance } from "../helper/Axios.instance";

export const handleEmailLogin = async ({ email, password }: { email: string; password: string }) => {
    if (!email || !password) {
        throw new Error('Please enter both email and password');
    }

    try {
        const response = await AxiosInstance.post(`/auth/login-email`, {
            email,
            password,
        });

        if (!response.data || !response.data.success) {
            throw new Error('Invalid email or password. Please try again.');
        }

        if (!response.data.user.role === 'doctor' && !response.data.user.role === 'user') {
            throw new Error('Invalid email or password. Please try again.');
        }

        return response.data;
    } catch (error: unknown) {
        throw new Error('Invalid credentials. Please try again.');
    }
};