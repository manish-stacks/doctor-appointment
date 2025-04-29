'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { useState } from 'react';

export default function PatientProfile() {
    const [patient, setPatient] = useState({
        name: 'Demo Patient',
        email: 'demopatient@saasmonks.in',
        phone: '1234 567 890',
        countryCode: '+91',
        language: 'English',
        dob: '1987-12-03',
        gender: 'Male',
        imageUrl: 'https://doctro.saasmonks.in/images/upload/65df2d534121a.jpg', // Replace with actual URL
    });

    return (
        <div className="p-4">
            <Breadcrumb title="Patient Profile" />

            <div className="flex flex-col items-center justify-center  p-6 bg-white rounded-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                            src={patient.imageUrl}
                            alt="Patient"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
                            ✏️
                        </button>
                    </div>
                    <h2 className="text-lg font-semibold mt-2">Doctor Image</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3/4">
                    <div>
                        <label className="text-gray-700">Name</label>
                        <input
                            className="w-full p-2 mt-1 border rounded"
                            type="text"
                            value={patient.name}
                            onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700">Email</label>
                        <input
                            className="w-full p-2 mt-1 border rounded"
                            type="email"
                            value={patient.email}
                            onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700">Phone Number</label>
                        <div className="flex">
                            <select
                                className="p-2 border rounded-l"
                                value={patient.countryCode}
                                onChange={(e) => setPatient({ ...patient, countryCode: e.target.value })}
                            >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">🇺🇸 +1</option>
                            </select>
                            <input
                                className="w-full p-2 border-t border-b border-r rounded-r"
                                type="text"
                                value={patient.phone}
                                onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700">Language</label>
                        <select
                            className="w-full p-2 mt-1 border rounded"
                            value={patient.language}
                            onChange={(e) => setPatient({ ...patient, language: e.target.value })}
                        >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Spanish</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700">Date of Birth</label>
                        <input
                            className="w-full p-2 mt-1 border rounded"
                            type="date"
                            value={patient.dob}
                            onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700">Gender</label>
                        <select
                            className="w-full p-2 mt-1 border rounded"
                            value={patient.gender}
                            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4 mt-8">
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                        DELETE ACCOUNT
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        UPDATE
                    </button>
                </div>
            </div>
        </div>
    );
}
