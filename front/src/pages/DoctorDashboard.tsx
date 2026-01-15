"use client"

import { userDetails, useUserStore } from "@/store/useUserStore";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { encryptDoctorId } from "@/helpers/Helper";

export function DoctorDashboard() {
  const userDetails = useUserStore((state) => state.getUserDetails);
  const [userdata, setUserData] = useState<userDetails | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const details = userDetails();

        if (!details || !details.doctor_id) {
          router.push("/doctor/profile");
          return;
        }
        setUserData(details);
        setDoctorId(details.doctor_id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    getUserDetails();
  }, [userDetails, router, doctorId]);



  function copyProfileLink() {

    if (!doctorId) {
      console.error('Doctor ID is not available');
      return;
    }
    // const encryptedDoctorId = encryptDoctorId(String(doctorId));
    // const link = `${window.location.origin}/doctor-profile/${encryptedDoctorId}`;

    const encryptedDoctorId = encryptDoctorId(String(doctorId));
    const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
    const link = `${window.location.origin}/profile/${encodedEncryptedDoctorId}`;


    navigator.clipboard.writeText(link).then(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  }



  if (!userdata) {
    return <div>Loading...</div>;
  }

  if (!userdata?.doctor_id) {
    router.push('/doctor/profile');
    return;
  }

  return (
    <>

      <div className="flex-1 overflow-y-auto p-2 lg:p-4">

        <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
          <div className="mb-6">  {/* Left aligned section */}
            <h2 className="text-2xl font-semibold mb-2">Welcome back, {userdata?.username || 'Doctor'}</h2>
            <p className="text-gray-600">Your dashboard content goes here.</p>
          </div>

          <div className="mt-6">  {/* Right aligned section */}
            <button
              onClick={copyProfileLink}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Send Link
            </button>
          </div>
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
              <h2 className="text-xl lg:text-2xl font-bold mb-4">Find a Patient</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search by name or ID"
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


  );
}

