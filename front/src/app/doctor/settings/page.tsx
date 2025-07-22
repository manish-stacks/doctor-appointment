'use client';

import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useState } from 'react';

export default function PatientSettings() {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const userId = 'replace-with-user-id'; // replace with actual user ID logic (from context/auth)

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        const { currentPassword, newPassword, confirmPassword } = passwords;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return setMessage('All fields are required.');
        }

        if (newPassword !== confirmPassword) {
            return setMessage('New passwords do not match.');
        }

        try {
            setLoading(true);
            setMessage('');

            await AxiosInstance.post(`/user/change-password/${userId}`, {
                currentPassword,
                newPassword,
            });

            setMessage('Password changed successfully!');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.response?.data?.message || 'Something went wrong.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <Breadcrumb title="Settings" />

            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                {message && (
                    <p className="mb-4 text-center text-sm text-red-500">{message}</p>
                )}
                <form onSubmit={handlePasswordChange} className="w-full max-w-md">
                    {['Current Password', 'New Password', 'Confirm Password'].map((label, idx) => {
                        const keys = ['currentPassword', 'newPassword', 'confirmPassword'] as const;
                        return (
                            <div className="mb-4" key={keys[idx]}>
                                <label className="block text-gray-700 mb-2">{label}</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full p-2 border rounded"
                                        placeholder={label}
                                        value={passwords[keys[idx]]}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                [keys[idx]]: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2.5 text-gray-500"
                                        tabIndex={-1}
                                    >
                                        👁️
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
                    >
                        {loading ? 'UPDATING...' : 'UPDATE'}
                    </button>
                </form>
            </div>
        </div>
    );
}
