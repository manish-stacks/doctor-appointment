"use client";


import { AxiosInstance } from '@/helpers/Axios.instance';
import { UserResponse, useUserStore } from '@/store/useUserStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const router = useRouter();

    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await AxiosInstance.get(`/auth/me`);
    //         console.log(response)
    //     }
    //     fetch();
    // },[]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        if (timer === 0) {
            setResendDisabled(false);
            setTimer(30);
        }
        return () => clearInterval(interval);
    }, [resendDisabled, timer]);

    const validateMobileNumber = (number: string) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(number);
    };

    const handleSendOTP = async () => {
        setError('');
        if (!validateMobileNumber(mobileNumber)) {
            setError('Please enter a valid Indian mobile number');
            return;
        }

        setIsLoading(true);
        try {
            await AxiosInstance.post(`/auth/login`, { phone: Number(mobileNumber), type: 'login' });
            setShowOTP(true);
            setResendDisabled(true);
            toast.success(`OTP has been sent to ${mobileNumber}`);
        } catch (error) {
            toast.error('Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };
    const handleResendOTP = async () => {
        setError('');
        if (!validateMobileNumber(mobileNumber)) {
            setError('Please enter a valid Indian mobile number');
            return;
        }

        setIsLoading(true);
        try {
            await AxiosInstance.post(`/auth/resend`, { phone: Number(mobileNumber), type: 'login' });
            setShowOTP(true);
            setResendDisabled(true);
            toast.success(`OTP has been sent to ${mobileNumber}`);
        } catch (error) {
            toast.error('Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const response = await AxiosInstance.post(`/auth/verify-otp`, {
                phone: Number(mobileNumber),
                otp,
                type: 'login',
            }) as UserResponse;

            console.log(response)

            fetchUserDetails(response);

            if (!response.success) {
                toast.error(response.message)
                return;
            }
            toast.success('OTP verified successfully');
            onClose();

            return router.push(response.role === 'user' ? '/patient/dashboard' : '/doctor/dashboard');

        } catch (error) {
            toast.error('Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setShowOTP(false);
        setOTP('');
        setMobileNumber('');
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-xl px-4 sm:px-10 py-6 sm:py-8 w-[95%] sm:w-full max-w-lg relative mx-4 sm:mx-0"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>

                        <div className="space-y-4 sm:space-y-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
                                {showOTP ? 'Verify OTP' : 'Login / Sign Up'}
                            </h2>
                            <div className="space-y-4">
                                {!showOTP ? (
                                    <div className="space-y-3">
                                        <input
                                            placeholder="Enter mobile number"
                                            value={mobileNumber}
                                            onChange={(e) => {
                                                setMobileNumber(e.target.value.replace(/\D/g, ''));
                                                setError('');
                                            }}
                                            type="tel"
                                            maxLength={10}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {error && <span className='text-sm text-rose-400 block'>{error}</span>}
                                        <button
                                            onClick={handleSendOTP}
                                            disabled={isLoading}
                                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <span className='mt-3 text-slate-400 text-sm sm:text-base block text-center'>
                                            Enter OTP sent to +91 {mobileNumber}
                                        </span>
                                        <div className='flex justify-center gap-2 sm:gap-4 my-4'>
                                            {[...Array(6)].map((_, index) => (
                                                <input
                                                    key={index}
                                                    type='tel'
                                                    maxLength={1}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={otp[index] || ''}
                                                    onChange={(e) => {
                                                        const newOtp = otp.split('');
                                                        newOtp[index] = e.target.value;
                                                        setOTP(newOtp.join(''));
                                                        if (e.target.value && e.target.nextElementSibling) {
                                                            (e.target.nextElementSibling as HTMLInputElement).focus();
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Backspace' && !otp[index]) {
                                                            const currentTarget = e.target as HTMLInputElement;
                                                            const prevInput = currentTarget.previousElementSibling as HTMLInputElement;
                                                            if (prevInput) {
                                                                prevInput.focus();
                                                                const newOtp = otp.split('');
                                                                newOtp[index - 1] = '';
                                                                setOTP(newOtp.join(''));
                                                            }
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className="space-y-3">
                                            <button
                                                onClick={handleVerifyOTP}
                                                disabled={isLoading}
                                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Verify OTP
                                            </button>
                                            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between'>
                                                <button
                                                    onClick={handleReset}
                                                    className="text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                                                >
                                                    Change Number
                                                </button>
                                                <button
                                                    onClick={handleResendOTP}
                                                    disabled={resendDisabled}
                                                    className="text-blue-500 hover:text-blue-600 disabled:text-gray-400 text-sm sm:text-base"
                                                >
                                                    {resendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </AnimatePresence>

    );
};
