"use client";
import { useTheme } from "@/context/ThemeProvider";
import useStore from "@/store/registerStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Loader2, ArrowRight, RefreshCw, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Page = () => {
  const { login, VerifyOtp, resendOtp } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [phone, setPhone] = useState("");
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    const user = JSON.parse(localStorage.getItem("user_Data"));

    if (role && user) {
      if (role === "user") {
        router.push("/user-dashboard/dashboard");
      } else if (role === "doctor") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    if (!/^\d+$/.test(phone)) return "Phone number must contain only digits";
    if (phone.length !== 10) return "Phone number must be 10 digits";
    return null;
  };
  const validateOtp = (otp) => {
    if (!otp.trim()) return "OTP is required";
    if (!/^\d+$/.test(otp)) return "OTP must contain only digits";
    if (otp.length !== 6) return "OTP must be 6 digits";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const phoneError = validatePhone(phone);
    const newErrors = { phone: phoneError };

    setErrors(newErrors);

    if (phoneError) {
      return;
    }

    setLoading(true);

    try {
      const data = await login(Number(phone));

      if (data.success) {
        toast.success(data.message);
        setStep(2);
        setTimer(120);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
      console.error("Registration Error by me:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpError = validateOtp(otp);
    setErrors({ ...errors, otp: otpError });

    if (otpError) return;
    setLoading(true);

    try {
      const response = await VerifyOtp(phone, otp, "login");
      if (response?.success) {
        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      setErrors({ ...errors, otp: error.message });
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
      setOtp(""); // Clear OTP input on error
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);

    try {
      const data = await resendOtp(phone, "login");
      console.log("OTP Resend", data);
      if (data.success) {
        toast.success(data.message);
        setTimer(120);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
      // console.error("Resend OTP Error:", error)
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section - Welcome Message */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-gray-900">
        <div className="absolute inset-0">
          <div className="h-full w-full flex flex-col justify-center px-12">
            <h1 className="text-6xl font-bold text-white mb-6">
              Welcome to{" "}
              <span>
                <i>HBSDOCS</i>
              </span>
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Your trusted platform for online medical consultations. Connect
              with experienced <br /> doctors from the comfort of your home.
            </p>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-white/90" />
                <p className="text-xl text-slate-100">
                  24/7 Access to Medical Professionals
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-white/90" />
                <p className="text-xl text-slate-100">
                  Secure & Confidential Consultations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-white/90" />
                <p className="text-xl text-slate-100">
                  Quick & Easy Appointment Booking
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-12 text-white/60 text-sm">
          © {new Date().getFullYear()} DocConnect. All rights reserved.
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md shadow-lg border-0 p-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {step === 1 ? "Login to Your Account" : "Verify Your Phone"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Enter your phone number to get started"
                  : `We've sent a verification code to ${phone}`}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === 1 ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="Enter your 10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                        maxLength={10}
                        className="pl-10"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                    {errors.otp && (
                      <p className="text-sm text-destructive">{errors.otp}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {timer > 0
                        ? `Resend OTP in ${Math.floor(timer / 60)}:${(
                            timer % 60
                          )
                            .toString()
                            .padStart(2, "0")}`
                        : "Didn't receive the code?"}
                    </p>
                    <Button
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={timer > 0 || resendLoading}
                      className="text-sm"
                    >
                      {resendLoading ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Resend OTP
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>

            <CardFooter className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Button variant="link" className="p-0 h-auto">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto">
                  Privacy Policy
                </Button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
