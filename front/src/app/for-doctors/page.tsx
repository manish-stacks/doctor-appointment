'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Shield, ArrowLeft, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useUserStore } from '@/store/useUserStore';

type Step = 'login' | 'mobile' | 'otp';
type LoginMethod = 'email' | 'mobile';

export default function DoctorLoginPage() {
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const [step, setStep] = useState<Step>('login');
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('mobile');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // const router = useRouter();
    const [timer, setTimer] = useState(30);

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

    const resetForm = () => {
        setStep('login');
        setLoginMethod('email');
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setMobileNumber('');
        setOtp('');
        setError('');
        setIsLoading(false);
    };

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await AxiosInstance.post(`/auth/doctor/login`, {
                email,
                password,
                role: 'doctor',
            });

            if (!response.data || !response.data.success) {
                setError('Invalid email or password. Please try again.');
                setIsLoading(false);
                return;
            }

            fetchUserDetails(response.data);
            window.location.href = '/doctor/dashboard';
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOTP = async () => {
        if (!mobileNumber || mobileNumber.length < 10) {
            setError('Please enter a valid mobile number');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await AxiosInstance.post(`/auth/doctor/login`, {
                phone: Number(mobileNumber),
                role: 'doctor',
            });
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to send OTP. Please try again later.');
            setIsLoading(false);
            return null;
        }

        setIsLoading(false);
        setStep('otp');
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        if (otp === '123456') {
            setError('Invalid OTP. Please try again.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await AxiosInstance.post(`/auth/doctor/verify-otp`, {
                phone: Number(mobileNumber),
                otp,
                type: 'login',
                role: 'doctor',
            });

            if (!response.data || !response.data.success) {
                setError('OTP verification failed. Please try again.');
                return;
            }

            fetchUserDetails(response.data);
            resetForm();
            window.location.href = '/doctor/dashboard';
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to verify OTP. Please try again later.');
        } finally {
            setResendDisabled(true);
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError('');

        if (!mobileNumber || mobileNumber.length < 10) {
            setError('Please enter a valid mobile number');
            return;
        }

        setIsLoading(true);
        try {
            await AxiosInstance.post(`/auth/doctor/resend`, { 
                phone: Number(mobileNumber), 
                type: 'login',
                role: 'doctor'
            });
            setResendDisabled(true);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to send OTP. Please try again later.');
        } finally {
            setIsLoading(false);
        }
        setStep('otp');
    };

    const slideVariants = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="relative overflow-hidden min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {step === 'login' && (
                                <motion.div
                                    key="login"
                                    variants={slideVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-semibold text-blue-800 mb-2">
                                            Welcome Back, Doctor
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Choose your preferred login method
                                        </p>
                                    </div>

                                    <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                                        <TabsList className="grid w-full grid-cols-2 mb-6">
                                            <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
                                            <TabsTrigger value="email">Email & Password</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="email" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Doctor Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your registered email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="pl-10 h-12"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <div className="relative">
                                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="pl-10 pr-10 h-12"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                                                    Forgot Password?
                                                </button>
                                            </div>

                                            {error && (
                                                <motion.p
                                                    className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {error}
                                                </motion.p>
                                            )}

                                            <Button
                                                onClick={handleEmailLogin}
                                                disabled={isLoading}
                                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                                            >
                                                {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                                                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                            </Button>
                                        </TabsContent>

                                        <TabsContent value="mobile" className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="mobile">Registered Mobile Number</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        id="mobile"
                                                        type="tel"
                                                        placeholder="Enter your registered mobile number"
                                                        value={mobileNumber}
                                                        onChange={(e) => setMobileNumber(e.target.value)}
                                                        className="pl-10 h-12"
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>

                                            {error && (
                                                <motion.p
                                                    className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {error}
                                                </motion.p>
                                            )}

                                            <Button
                                                onClick={handleSendOTP}
                                                disabled={isLoading}
                                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                                            >
                                                {isLoading ? 'Sending...' : 'Send OTP'}
                                                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                            </Button>
                                        </TabsContent>

                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 text-center mb-4">
                                                Or continue with professional accounts
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition border-2 hover:bg-gray-50 hover:border-gray-300">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Google</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition border-2 hover:bg-gray-50 hover:border-gray-300">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Microsoft" className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Facebook</span>
                                                </button>
                                            </div>
                                        </div>
                                    </Tabs>
                                </motion.div>
                            )}

                            {step === 'otp' && (
                                <motion.div
                                    key="otp"
                                    variants={slideVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center space-x-4 mb-6">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep('login')}
                                            className="p-2 hover:bg-gray-100"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </Button>
                                        <div className="text-center flex-1">
                                            <h3 className="text-xl font-semibold text-blue-800">Verify OTP</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Enter the 6-digit code sent to {mobileNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="otp">Verification Code</Label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    id="otp"
                                                    type="text"
                                                    placeholder="Enter 6-digit OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    className="pl-10 text-center text-lg tracking-widest h-12"
                                                    maxLength={6}
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.p
                                                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        <Button
                                            onClick={handleVerifyOTP}
                                            disabled={isLoading}
                                            className="w-full bg-green-600 hover:bg-green-700 h-12 text-base"
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify & Access Dashboard'}
                                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            className="w-full bg-gray-100 text-blue-600 hover:text-blue-700 hover:bg-gray-200 h-12"
                                            onClick={handleResendOTP}
                                            disabled={resendDisabled}
                                        >
                                            {resendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 space-y-2">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account? 
                        <button className="text-blue-600 hover:text-blue-700 hover:underline ml-1">
                            Register as Doctor
                        </button>
                    </p>
                    <p className="text-xs text-gray-500">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>
        </div>
    );
}