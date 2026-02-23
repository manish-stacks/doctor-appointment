export interface PersonalInfo {
    // Basic Doctor fields
    profileImage: File | string | undefined;
    image: string;
    name: string;
    categoryId: string;
    treatmentId: string;
    expertise: string;
    hospitalId: string;
    userId: string;
    desc: string; // professional bio
    education: string;
    certificate: string;
    appointmentFees: string;
    experience: string;
    timeSlot: string;
    dob: string; // date of birth
    gender: string;
    subscriptionId: string;
    isActive: boolean;
    isVerified: boolean;
    subscriptionStatus: boolean;
    isPopular: boolean;
    patientVideoCall: boolean;

    // User-related fields (from User entity)
    email: string;
    phone: string;
    countryCode: string;
    user?:{
        email: string;
        phone: string;
        countryCode: string;
    }

};