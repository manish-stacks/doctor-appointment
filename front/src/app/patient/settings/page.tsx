'use client';

import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { ConfirmModal } from '@/components/ui/custom/ConfirmModal';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PatientSettings() {

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: true,
        appointmentReminders: true,
        showProfileToDoctors: true,
        allowAnalytics: false,
    });

    const [isDelete, setIsDelete] = useState(false);


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await AxiosInstance.get('/user/profile');
                setSettings({
                    emailNotifications: res.data.emailNotifications,
                    smsNotifications: res.data.smsNotifications,
                    appointmentReminders: res.data.appointmentReminders,
                    showProfileToDoctors: res.data.showProfileToDoctors,
                    allowAnalytics: res.data.allowAnalytics,
                });
            } catch (err) {
                toast.error('Failed to load settings');
            }
        };

        fetchSettings();
    }, []);


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

    const handleSettingsUpdate = async () => {
        try {
            await AxiosInstance.post('/user/update-settings', settings);
            toast.success('Settings updated successfully');
        } catch (err) {
            toast.error('Failed to update settings');
        }
    };
    const handleDeleteAccount = async () => {
        try {
            await AxiosInstance.delete('/user/delete-account');
            toast.success('Account deactivated');
            window.location.href = '/';
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };



    return (
        <div className="p-4 space-y-6">
            <Breadcrumb title="Settings" />
            <button
                onClick={handleSettingsUpdate}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Save Settings
            </button>

            {/* ================= PASSWORD SECTION ================= */}
            <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>

                <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                    <div>
                        <label className="block mb-1">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({ ...passwords, newPassword: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={passwords.confirmPassword}
                            onChange={(e) =>
                                setPasswords({ ...passwords, confirmPassword: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>

            {/* ================= NOTIFICATION SETTINGS ================= */}
            <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>

                <div className="space-y-3">
                    <label className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) =>
                                setSettings({ ...settings, emailNotifications: e.target.checked })
                            }
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <span>SMS Notifications</span>
                        <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={(e) =>
                                setSettings({ ...settings, smsNotifications: e.target.checked })
                            }
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <span>Appointment Reminders</span>
                        <input
                            type="checkbox"
                            checked={settings.appointmentReminders}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    appointmentReminders: e.target.checked,
                                })
                            }
                        />
                    </label>

                </div>
            </div>

            {/* ================= PRIVACY SETTINGS ================= */}
            <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>

                <div className="space-y-3">
                    <label className="flex items-center justify-between">
                        <span>Show Profile to Doctors</span>
                        <input
                            type="checkbox"
                            checked={settings.showProfileToDoctors}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    showProfileToDoctors: e.target.checked,
                                })
                            }
                        />
                    </label>

                    <label className="flex items-center justify-between">
                        <span>Allow Data Sharing for Analytics</span>
                        <input
                            type="checkbox"
                            checked={settings.allowAnalytics}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    allowAnalytics: e.target.checked,
                                })
                            }
                        />
                    </label>

                </div>
            </div>

            {/* ================= LEGAL LINKS ================= */}
            <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Legal</h2>

                <div className="space-y-2 text-blue-600">
                    <a href="/privacy-policy" target='_blank' className="block hover:underline">
                        Privacy Policy
                    </a>

                    <a href="/terms-conditions" target='_blank' className="block hover:underline">
                        Terms & Conditions
                    </a>
                </div>
            </div>

            {/* ================= DELETE ACCOUNT ================= */}
            <div className="bg-white rounded-lg p-6 shadow border border-red-200">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                    Danger Zone
                </h2>

                <button
                    onClick={() => setIsDelete(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Delete Account
                </button>
            </div>

            {isDelete && (
                <ConfirmModal
                    title="Deactivate Account?"
                    description="Are you sure you want to deactivate your account? You can contact support to reactivate it."
                    onCancel={() => setIsDelete(false)}
                    onConfirm={handleDeleteAccount}
                    confirmLabel="Yes, Deactivate"
                    cancelLabel="Cancel"
                />
            )}

        </div>
    );

}
