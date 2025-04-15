import React from 'react';
import { Calendar, Users, Clock, Settings } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';


export function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="doctor" />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Today's Appointments</h3>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">8</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Users className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Total Patients</h3>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">145</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Clock className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Upcoming</h3>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-600 mt-2">3</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <Settings className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-lg lg:text-xl font-semibold">Settings</h3>
            <button className="text-indigo-600 mt-2">Manage</button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm">
          <div className="p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold">Patient #{i + 1}</p>
                    <p className="text-gray-600">General Checkup</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold">2:00 PM</p>
                    <p className="text-gray-600">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}