'use client';
import Breadcrumb from "@/components/Breadcrumb";
import { Bookmark, BookmarkIcon, MapPin, Star } from "lucide-react";

const doctors = [
    {
        id: 1,
        name: 'Dr. John Smith',
        specialization: 'Cardiology',
        rating: 4.9,
        reviews: 13,
        price: 2000,
        hospitals: [
            {
                name: 'Newcastle General Hospital',
                address: 'Westgate Rd, Newcastle upon Tyne NE4 6BE, UK',
            },
            {
                name: 'Royal Adelaide Hospital',
                address: 'Port Rd, Adelaide SA 5000, Australia',
            },
        ],
        imageUrl: 'https://doctro.saasmonks.in/images/upload/65e04f21dc103.jpg', // Update image path
    },
    {
        id: 2,
        name: 'Dr. Maria García',
        specialization: 'Gynecology',
        rating: 0,
        reviews: 0,
        price: 1500,
        hospitals: [
            {
                name: 'Boston Medical Center',
                address: '1 Boston Medical Center Pl, Boston, MA 02118, USA',
            },
        ],
        imageUrl: 'https://doctro.saasmonks.in/images/upload/65e04f21dc103.jpg', // Update image path
    },
];

export default function DoctorList() {
    return (
        <div className="p-4">
            <Breadcrumb title="Favorite" />
            <div className="min-h-screen bg-gray-100">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
                        {/* Left Side */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <img
                                src={doctor.imageUrl}
                                alt={doctor.name}
                                className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-blue-400"
                            />
                            <h2 className="text-xl font-semibold">{doctor.name}</h2>
                            <p className="text-blue-500">{doctor.specialization}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Star className="text-yellow-400 mr-1" />
                                {doctor.rating} ({doctor.reviews} reviews)
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-32 bg-gray-200 mx-6"></div>

                        {/* Right Side */}
                        <div className="relative flex flex-col justify-between md:w-2/3 w-full">
                            <p className="text-gray-500 mb-2">{doctor.specialization}</p>
                            {doctor.hospitals.map((hospital, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-semibold">{hospital.name}</p>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="mr-1" size={16} />
                                        {hospital.address}
                                    </div>
                                </div>
                            ))}
                            <p className="text-blue-600 text-lg font-bold mt-2">${doctor.price}</p>
                            <div className="flex gap-4 mt-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Make Appointment
                                </button>
                                <button className="text-blue-600 hover:underline">
                                    View Profile
                                </button>
                            </div>
                            <div className="absolute top-4 right-4">
                                <button className=" focus:outline-none">
                                    <BookmarkIcon className="w-6 h-6 text-blue-500" />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
