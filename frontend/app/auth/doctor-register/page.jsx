"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, Loader2, Moon, RefreshCw, Sun } from "lucide-react"
import { toast } from "react-hot-toast"
import useStore from "@/store/registerStore"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useTheme } from "@/context/ThemeProvider"

export default function RegisterPage() {
    const router = useRouter()
    const { register, VerifyOtp, resendOtp } = useStore()
    const { theme, toggleTheme } = useTheme();
    // Form state
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [otp, setOtp] = useState("")

    // UI state
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Validation functions
    const validateName = (name) => {
        if (!name.trim()) return "Name is required"
        if (/[^a-zA-Z\s]/.test(name)) return "Name cannot contain special characters or numbers"
        return null
    }

    const validatePhone = (phone) => {
        if (!phone.trim()) return "Phone number is required"
        if (!/^\d+$/.test(phone)) return "Phone number must contain only digits"
        if (phone.length !== 10) return "Phone number must be 10 digits"
        return null
    }

    const validateGender = (gender) => {
        if (!gender) return "Please select a gender"
        return null
    }

    const validateOtp = (otp) => {
        if (!otp.trim()) return "OTP is required"
        if (!/^\d+$/.test(otp)) return "OTP must contain only digits"
        return null
    }

    // Form submission handlers
    const handleRegister = async (e) => {
        e.preventDefault()

        // Validate all fields
        const nameError = validateName(username)
        const phoneError = validatePhone(phone)
        const genderError = validateGender(gender)

        const newErrors = {
            username: nameError,
            phone: phoneError,
            gender: genderError,
        }

        setErrors(newErrors)


        if (nameError || phoneError || genderError) {
            return
        }

        setLoading(true)

        try {
          const data =  await register(username, phone, gender, "doctor")
          console.log("Data from Register", data)
            toast.success("Registration successful! Please verify OTP")
            setStep(2)
        } catch (error) {
            if (error.message === "Phone number already exists but not verified. OTP has been sent again.") {
                toast.success("Please verify the phone number first.")
                setStep(2)
            } else {

                toast.error(error.message || "Registration failed")
                console.error("Registration Error by me:", error)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()

        const otpError = validateOtp(otp)
        setErrors({ ...errors, otp: otpError })

        if (otpError) return

        setLoading(true)

        try {
            await VerifyOtp(phone, otp)
            toast.success("OTP verified successfully!")
            router.push("/dashboard") // Redirect to dashboard after successful verification
        } catch (error) {
            toast.error(error.message || "OTP verification failed")
            console.error("OTP Verification Error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async () => {
        setResendLoading(true)

        try {
            const data = await resendOtp(phone)
            console.log("OTP Resend", data)
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message || "Failed to resend OTP")
            // console.error("Resend OTP Error:", error)
        } finally {
            setResendLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex">
            {/* Image Section (40% width) */}
            <div className="hidden md:flex w-[40%] relative">
                <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                    alt="Registration background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Join Our Medical Network
                    </h2>
                    <p className="text-sm opacity-90">Connect with patients and grow your practice with our platform

</p>
                </div>
            </div>

            {/* Form Section (60% width) */}
            <div className="flex-1 flex flex-col min-h-screen bg-background">
                {/* Theme Toggle */}
                <div className="absolute top-4 right-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTheme()}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                <div className="flex-1 flex items-center justify-center p-6">
                    <Card className="w-full max-w-md shadow-lg border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">
                            {step === 1 ? "Get started as a doctor 🩺" : "Confirm your phone number"}

                            </CardTitle>
                            <CardDescription>
                                {step === 1
                                    ? "Enter your details to create your account"
                                    : "We've sent a verification code to your phone"}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {step === 1 ? (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Title</Label>
                                        <RadioGroup
                                            id="gender"
                                            value={gender}
                                            onValueChange={setGender}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex  items-center space-x-2">
                                                <RadioGroupItem className={'border-gray-400'} value="MR" id="mr" />
                                                <Label htmlFor="mr">Mr.</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem  className={'border-gray-400'} value="MRS" id="mrs" />
                                                <Label htmlFor="mrs">Mrs.</Label>
                                            </div>
                                        </RadioGroup>
                                        {errors.gender && (
                                            <p className="text-sm text-destructive">{errors.gender}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username">Full Name</Label>
                                        <Input
                                            id="username"
                                            placeholder="John Doe"
                                            value={username}
                                            className={'border-gray-400'}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        {errors.username && (
                                            <p className="text-sm text-destructive">{errors.username}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            placeholder="10-digit phone number"
                                            value={phone}
                                            className={'border-gray-400'}
                                            onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                                            maxLength={10}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-destructive">{errors.phone}</p>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing
                                            </>
                                        ) : (
                                            <>
                                                Continue
                                                <ChevronRight className="ml-2 h-4 w-4" />
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
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        {errors.otp && (
                                            <p className="text-sm text-destructive">{errors.otp}</p>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Verifying
                                            </>
                                        ) : (
                                            <>
                                                Verify OTP
                                                <Check className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <Button
                                            variant="link"
                                            onClick={handleResendOtp}
                                            disabled={resendLoading}
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

                        <Separator />

                        <CardFooter className="flex justify-center p-4">
                            <div className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Button
                                    variant="link"
                                    className="p-0"
                                    onClick={() => router.push("/login")}
                                >
                                    Login
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

