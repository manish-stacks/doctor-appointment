'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/custom/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Shield, ArrowLeft, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useUserStore } from '@/store/useUserStore';
import toast from 'react-hot-toast';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'login' | 'mobile' | 'otp';
type LoginMethod = 'email' | 'mobile';

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const [step, setStep] = useState<Step>('login');
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('mobile');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    // const [otp, setOtp] = useState('');
    const [otp, setOtp] = useState(Array(6).fill(""));
    const otpRefs = useRef([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
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

        try {
            const response = await AxiosInstance.post(`/auth/login-email`, {
                email,
                password,
                role: 'user',
            });

            if (!response.data || !response.data.success) {
                setError('Invalid email or password. Please try again.');
                setIsLoading(false);
                return;
            }

            fetchUserDetails(response.data);
            toast.success('Login successful');
            handleClose();
            // router.push('/patient/dashboard');
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Login failed. Please try again later.');
            setIsLoading(false);
            return null;
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
            if (error.message == 'You are not authorized to login as user.') {
                window.location.href = '/for-doctors';
            }
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
                otp: otp.join(''),
                type: 'login',
            });

            if (!response.data || !response.data.success) {
                setError('OTP verification failed. Please try again.');
                return;
            }

            fetchUserDetails(response.data);
            handleClose();
            toast.success('Login successful!');

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

    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        // Allow only numbers
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // single digit only
        setOtp(newOtp);

        // Move to next input
        if (value && index < otp.length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (isNaN(pastedData)) return;

        const newOtp = pastedData.split("");
        setOtp(newOtp);

        newOtp.forEach((_, i) => {
            otpRefs.current[i]?.focus();
        });
    };


    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-blue-700 pt-5">
                        Patient Login
                    </DialogTitle>
                    <p className="text-center text-sm text-gray-500 mt-1">
                        Secure access to your appointments & reports
                    </p>
                </DialogHeader>

                <div className="relative overflow-hidden  p-8">
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


                                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                                        <TabsTrigger className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow" value="mobile">
                                            Mobile OTP
                                        </TabsTrigger>
                                        <TabsTrigger className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow" value="email">
                                            Email Login
                                        </TabsTrigger>
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
                                                    className="pl-10 h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                                                    className="pl-10 h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full h-11 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700"
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
                                                    className="pl-10 h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full h-11 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700"
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
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5" />
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
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="space-y-6"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setStep("login")}
                                        className="rounded-full hover:bg-gray-100"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </Button>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Verify OTP
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Code sent to <span className="font-medium">{mobileNumber}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* OTP Input */}
                                <div className="space-y-4">
                                    <Label className="text-sm text-gray-700">Enter 6-digit OTP</Label>

                                    <div className="flex justify-between gap-2">
                                        {[...Array(6)].map((_, index) => (
                                            <Input
                                                key={index}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={otp[index] || ""}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={handlePaste}

                                                className="
            h-12 w-12 text-center text-lg font-semibold
            rounded-xl border-gray-300
            focus:ring-2 focus:ring-green-500
          "
                                                ref={(el) => (otpRefs.current[index] = el)}
                                            />
                                        ))}
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <motion.p
                                            className="text-red-500 text-sm"
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    {/* Verify Button */}
                                    <Button
                                        onClick={handleVerifyOTP}
                                        disabled={isLoading}
                                        className="
        w-full h-12 rounded-xl text-base font-semibold
        bg-green-600 hover:bg-green-700
        shadow-md
      "
                                    >
                                        {isLoading ? "Verifying..." : "Verify OTP"}
                                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                    </Button>

                                    {/* Resend */}
                                    <div className="text-center">
                                        <Button
                                            variant="ghost"
                                            onClick={handleResendOTP}
                                            disabled={resendDisabled}
                                            className="text-sm font-medium text-gray-600 hover:text-green-600"
                                        >
                                            {resendDisabled
                                                ? `Resend OTP in ${timer}s`
                                                : "Didn’t receive? Resend OTP"}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                        )}


                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}