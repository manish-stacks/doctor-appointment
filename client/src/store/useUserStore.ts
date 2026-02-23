import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encryptData, decryptData } from '../utils/encryption';
import { userDetails, UserState } from "@/types/store";


export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            userDetails: null,
            logout: async () => {
                set({ isLoggedIn: false, userDetails: null });
                Cookies.remove("token");
                localStorage.clear();
                window.location.href = "/";
            },
            fetchUserDetails: (response) => {
                const encryptedDetails = encryptData(response.user);
                set({
                    isLoggedIn: true,
                    userDetails: encryptedDetails
                });
                Cookies.set("token", response.token, { expires: 7 });
            },
            getUserDetails: () => {
                const encryptedDetails = get().userDetails;
                if (!encryptedDetails) return null;  // If null, no user is logged in
                const decryptedDetails = decryptData(encryptedDetails);
                return decryptedDetails as userDetails;  // Return decrypted details
            },
        }),
        {
            name: 'user_store',
        }
    )
)
