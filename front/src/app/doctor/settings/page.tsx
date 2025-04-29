'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { useState } from 'react';

export default function PatientSettings() {


    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password update logic here
    };

    return (
        <div className="p-4">
            <Breadcrumb title="Settings" />


            {/* Password Change Section */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                placeholder="Old password"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            />
                            <button type="button" className="absolute right-2 top-2.5 text-gray-500">
                                👁️
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                placeholder="New password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            />
                            <button type="button" className="absolute right-2 top-2.5 text-gray-500">
                                👁️
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                placeholder="Confirm Password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            />
                            <button type="button" className="absolute right-2 top-2.5 text-gray-500">
                                👁️
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
                    >
                        UPDATE
                    </button>
                </form>
            </div>
        </div>
    );
}
