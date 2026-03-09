"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

export default function GoogleSuccess() {
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const router = useRouter();
    const params = useSearchParams()
    useEffect(() => {
        const token = params.get("token")
        const payload = JSON.parse(atob(token.split(".")[1]))
        // console.log(new Date(payload.exp * 1000))
        if (token) {
            const response = {
                token: token,
                user: payload
            }
            toast.success('Login successful');
            fetchUserDetails(response)
            router.push('/patient/dashboard');
        }

    }, [])

    return <div>Logging in...</div>
}