'use client'
import { useUserStore } from '@/store/useUserStore';
import { AppointmentDetails } from '@/types/appointment';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '@/helpers/Axios.instance';
import { encryptId } from '@/helpers/Helper';

const PatientDashboard = () => {
  const getUserDetails = useUserStore((state) => state.getUserDetails);
  const [user, setUser] = useState<any>();
  const [appointments, setAppointments] = useState<AppointmentDetails[]>([]);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);



  useEffect(() => {
    setUser(getUserDetails());

    const fetchAppointments = async () => {
      const res = await AxiosInstance.post('/appointment/patient/appointments', {
        page: 1,
        limit: 3,
        search: ''
      });
      setAppointments(res.data.data);
    };

    fetchAppointments();
  }, []);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    const res = await AxiosInstance.get(`/doctor/search?q=${text}`);
    setResults(res.data);
  };

  const handelGoToDoctorProfile = (doctorId: number) => {
    const encryptedDoctorId = encryptId(String(doctorId));
    const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
    const link = `${window.location.origin}/profile/${encodedEncryptedDoctorId}`;
    window.open(link, '_blank');
  }
  
  const upcoming = appointments.filter(a => a.appointmentStatus === 'BOOKED');
  const nextAppointment = upcoming[0];

  return (
    <div className="flex-1 overflow-y-auto p-2 lg:p-4">

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome back, {user?.username || 'Patient'}
        </h2>
        <p className="text-gray-500">Here is your health activity summary</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div onClick={() => router.push("/patient/appointments")} className="bg-white p-6 rounded-xl shadow cursor-pointer">
          <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
          <h3 className="font-semibold">Next Appointment</h3>
          <p className="text-gray-600 mt-1">
            {nextAppointment ? `${nextAppointment.date} ${nextAppointment.time}` : 'No upcoming'}
          </p>
        </div>

        <div onClick={() => router.push("/patient/appointments")} className="bg-white p-6 rounded-xl shadow cursor-pointer">
          <Clock className="w-8 h-8 text-indigo-600 mb-2" />
          <h3 className="font-semibold">Upcoming</h3>
          <p className="text-gray-600 mt-1">{upcoming.length} appointments</p>
        </div>

        <div onClick={() => router.push("/patient/favorite")} className="bg-white p-6 rounded-xl shadow cursor-pointer">
          <FileText className="w-8 h-8 text-indigo-600 mb-2" />
          <h3 className="font-semibold">Prescriptions</h3>
          <p className="text-indigo-600 mt-1">View Reports</p>
        </div>

        <div onClick={() => router.push("/patient/profile")} className="bg-white p-6 rounded-xl shadow cursor-pointer">
          <User className="w-8 h-8 text-indigo-600 mb-2" />
          <h3 className="font-semibold">Profile</h3>
          <p className="text-indigo-600 mt-1">Edit Profile</p>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow">
          <div className="p-6 relative">
            <h2 className="text-xl font-bold mb-4">Find a Doctor</h2>
            <input
              type="text"
              placeholder="Search by doctor name or ID"
              className="w-full p-3 border rounded-lg"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {results.length > 0 && (
              <div className="absolute z-50 w-[90%] bg-white border rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto">
                {results.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handelGoToDoctorProfile(doc.id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={doc.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Dr. {doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>

            {appointments.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between p-3 border rounded mb-2">
                <div>
                  <p className="font-semibold">Dr. {item.doctor?.name}</p>
                  <p className="text-sm text-gray-500">{item.doctor?.expertise}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {item.date} <br /> {item.time}
                </div>
              </div>
            ))}

            {appointments.length === 0 && (
              <p className="text-gray-500">No appointments yet</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PatientDashboard;
