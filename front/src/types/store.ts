export interface userStoreResponse {
    success: boolean;
    message: string;
    role: string;
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        image: string;
        role: string;
        contact_number_verified: number;
        doctor_id: string | null;
    }
}

export interface userDetails {
    id: string;
    username: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    contact_number_verified: number;
    doctor_id: string | null;
}

export interface UserState {
    isLoggedIn: boolean;
    userDetails: string | null;
    logout: () => void;
    getUserDetails: () => userDetails | null;
    fetchUserDetails: (response: userStoreResponse) => void;
}