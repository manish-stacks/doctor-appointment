"use client";
import Breadcrumb from "@/components/ui/custom/breadcrumb";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { encryptId } from "@/helpers/Helper";
import { BookmarkIcon, IndianRupee, MapPin, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DoctorList() {

    const [doctorsList, setDoctorsList] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await AxiosInstance.get('/favorite/doctors');
            setDoctorsList(response.data);
            console.log(response.data)
        };
        fetchDoctors();
    }, []);


    const handleBookAppointment = async (doctorData: { id: number; hospitalId: number; }) => {

        const BookingData = {
            doctorId: Number(doctorData?.id),
            hospitalId: Number(doctorData?.hospitalId),
        };
        try {
            const response = await AxiosInstance.post("/appointment", BookingData);
            const appointmentId = response.data.appointmentId;
            const encryptedDoctorId = encryptId(String(appointmentId));
            const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
            const link = `${window.location.origin}/booking/${encodedEncryptedDoctorId}`;
            window.open(link, '_blank');
        } catch (error) {
            toast.error('Failed to book appointment.');
            console.error('Error booking appointment:', error);
        }
    };

    const handleViewProfile = (doctorId: number) => {
        const encryptedDoctorId = encryptId(String(doctorId));
        const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
        const link = `${window.location.origin}/profile/${encodedEncryptedDoctorId}`;
        window.open(link, '_blank');
    }

    const handleRemoveFromWishlist = async (doctorId: number) => {
        try {
            await AxiosInstance.delete(`/favorite/doctors/${doctorId}`);
            setDoctorsList((prevDoctorsList) => prevDoctorsList.filter(doctor => doctor.id !== doctorId));
            toast.success('Doctor removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove doctor from wishlist');
            console.error('Error removing doctor from wishlist:', error);
        }
    };


    if (doctorsList.length === 0) {
        return (
            <div className="p-4">
                <Breadcrumb title="Favorite" />
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <p className="text-lg text-gray-600">No favorite doctors found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Breadcrumb title="Favorite" />
            <div className="min-h-screen bg-gray-100">
                {doctorsList && doctorsList.map((doctorData) => {
                    const doctor = doctorData.doctor;
                    return (
                        <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
                            {/* Left Side */}
                            <div className="flex flex-col items-center md:w-1/3">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-blue-400"
                                />
                                <h2 className="text-xl font-semibold">Dr. {doctor.name}</h2>
                                <p className="text-blue-500">{doctor.specialization}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Star className="text-yellow-400 mr-1" /> 4.1 (100 reviews)
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-32 bg-gray-200 mx-6"></div>

                            {/* Right Side */}
                            <div className="relative flex flex-col justify-between md:w-2/3 w-full">
                                <p className="text-gray-500 mb-2">{doctor.expertise}</p>

                                {/* Safe map over hospitals */}

                                <div className="mb-2">
                                    <p className="font-semibold">{doctor.hospital.name}</p>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="mr-1" size={16} />
                                        {doctor.hospital.address}
                                    </div>
                                </div>


                                <p className="text-blue-600 text-lg font-bold mt-2 flex items-center"><IndianRupee size={20} />{doctor.appointmentFees}</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => handleBookAppointment(doctor)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Make Appointment
                                    </button>
                                    <button
                                        onClick={() => handleViewProfile(doctor.id)}
                                        className="text-blue-600 hover:underline">
                                        View Profile
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className=" focus:outline-none">
                                        <BookmarkIcon fill="blue" color="blue" className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="absolute -top-8 -right-7">
                                    <button onClick={() => handleRemoveFromWishlist(doctor.id)} className="focus:outline-none bg-rose-500 p-1 rounded-full">
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    );
}
