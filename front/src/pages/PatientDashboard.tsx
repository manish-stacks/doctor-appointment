'use client'
import { userDetails, useUserStore } from '@/store/useUserStore';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const PatientDashboard = () => {
  const userDetails = useUserStore((state) => state.userDetails);
  const [userdata, setUserData] = useState<userDetails>();
  // console.log(userdata)
  useEffect(() => {
    if (!userDetails) return;
    setUserData(userDetails)
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2 lg:p-4">

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome back, {userdata?.username || 'User'}</h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-3">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Next Appointment</h3>
            <p className="text-gray-600 mt-2">March 15, 2024</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Clock className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Upcoming</h3>
            <p className="text-gray-600 mt-2">2 appointments</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <FileText className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Medical Records</h3>
            <button className="text-indigo-600 mt-2">View</button>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <User className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Profile</h3>
            <button className="text-indigo-600 mt-2">Edit</button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 lg:p-6">
              <h2 className="text-xl lg:text-2xl font-bold mb-4">Find a Doctor</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search by name or specialty"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 lg:p-6">
              <h2 className="text-xl lg:text-2xl font-bold mb-4">Recent Appointments</h2>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-semibold">Dr. John Smith</p>
                      <p className="text-gray-600">General Checkup</p>
                    </div>
                    <p className="text-gray-600">March 1, 2024</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientDashboard