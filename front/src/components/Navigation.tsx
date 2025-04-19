import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import React from 'react'

interface NavigationProps {
    setIsAuthModalOpen: (value: boolean) => void,
    setIsRegisterModalOpen: (value: boolean) => void
}

const Navigation = ({ setIsAuthModalOpen, setIsRegisterModalOpen }: NavigationProps) => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const userData = useUserStore((state) => state.userDetails);
    const router = useRouter();

    const goToDashboard = () => {
        if (!userData) return;
        return router.push(userData.role === 'user' ? '/patient/dashboard' : '/doctor/dashboard');
    }
    return (
        <>
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-[#045d59]">MediCare</div>
                        <div className="flex items-center space-x-4">
                            {
                                isLoggedIn ? (
                                    <button
                                        onClick={() => goToDashboard()}
                                        className="bg-[#045d59] text-white px-4 py-2 rounded-full hover:bg-indigo-900 transition-colors"
                                    >
                                        Dashboard
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsAuthModalOpen(true)}
                                            className="text-[#045d59] hover:text-indigo-800"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => setIsRegisterModalOpen(true)}
                                            className="bg-[#045d59] text-white px-4 py-2 rounded-full hover:bg-indigo-900 transition-colors"
                                        >
                                            Register
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navigation