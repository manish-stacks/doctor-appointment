'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Shield, ArrowLeft, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useUserStore } from '@/store/useUserStore';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'login' | 'mobile' | 'otp';
type LoginMethod = 'email' | 'mobile';

export function AuthModal({ isOpen, onClose }: LoginModalProps) {
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
    const router = useRouter();
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

    const resetModal = () => {
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

    const handleClose = () => {
        resetModal();
        onClose();
    };

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === 'demo@example.com' && password === 'password') {
            setIsLoading(false);
            handleClose();
            router.push('/dashboard');
        } else {
            setIsLoading(false);
            setError('Invalid email or password. Use demo@example.com / password');
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
            await AxiosInstance.post(`/auth/login`, {
                phone: Number(mobileNumber),
                role: 'user',
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
            const response = await AxiosInstance.post(`/auth/verify-otp`, {
                phone: Number(mobileNumber),
                otp,
                type: 'login',
            });

            if (!response.data || !response.data.success) {
                setError('OTP verification failed. Please try again.');
                return;
            }

            fetchUserDetails(response.data);
            handleClose();
            router.push('/patient/dashboard');
            return;
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to send OTP. Please try again later.');
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
            await AxiosInstance.post(`/auth/resend`, { phone: Number(mobileNumber), type: 'login' });
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
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                        Welcome to HealthCare
                    </DialogTitle>
                </DialogHeader>

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
                                <div className="flex items-center space-x-4 mb-6">

                                    <div className="text-center flex-1">
                                        <h3 className="text-lg font-semibold">
                                            Patient Login
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Choose your preferred login method
                                        </p>
                                    </div>
                                </div>

                                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
                                        <TabsTrigger value="email">Email & Password</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="email" className="space-y-4 mt-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="pl-10"
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
                                                    className="pl-10 pr-10"
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

                                        
                                        {error && (
                                            <motion.p
                                                className="text-red-500 text-sm"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        <Button
                                            onClick={handleEmailLogin}
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                        </Button>
                                    </TabsContent>

                                    <TabsContent value="mobile" className="space-y-6 mt-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="mobile">Mobile Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    id="mobile"
                                                    type="tel"
                                                    placeholder="Enter your mobile number"
                                                    value={mobileNumber}
                                                    onChange={(e) => setMobileNumber(e.target.value)}
                                                    className="pl-10"
                                                    maxLength={10}
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.p
                                                className="text-red-500 text-sm"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        <Button
                                            onClick={handleSendOTP}
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            {isLoading ? 'Sending...' : 'Send OTP'}
                                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                        </Button>


                                    </TabsContent>

                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <button className="flex items-center justify-center gap-2 px-4 py-2  rounded  transition border-2">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                                            Google
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-4 py-2  rounded transition border-2">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5" />
                                            Facebook
                                        </button>
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
                                        className="p-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </Button>
                                    <div className="text-center flex-1">
                                        <h3 className="text-lg font-semibold">Verify OTP</h3>
                                        <p className="text-sm text-gray-600">
                                            Enter the 6-digit code sent to {mobileNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="otp">OTP</Label>
                                        <div className="relative">
                                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="otp"
                                                type="text"
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="pl-10 text-center text-lg tracking-widest"
                                                maxLength={6}
                                            />
                                        </div>
                                       
                                    </div>

                                    {error && (
                                        <motion.p
                                            className="text-red-500 text-sm"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    <Button
                                        onClick={handleVerifyOTP}
                                        disabled={isLoading}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        className="w-full bg-gray-100 text-blue-600 hover:text-blue-700"
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
            </DialogContent>
        </Dialog>
    );
}