'use client';

import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PatientSettings() {

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwords.newPassword || !passwords.confirmPassword) {
            toast.error('All fields are required');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        try {
            setLoading(true);
            await AxiosInstance.post('/user/change-password', {
                newPassword: passwords.newPassword,
            });

            toast.success('Password updated successfully');

            setPasswords({
                newPassword: '',
                confirmPassword: '',
            });

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Password update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <Breadcrumb title="Settings" />

            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>

                <form onSubmit={handlePasswordChange} className="w-full max-w-md">


                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="New password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            placeholder="Confirm new password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
                    >
                        {loading ? 'Updating...' : 'UPDATE PASSWORD'}
                    </button>
                </form>
            </div>
        </div>
    );
}
