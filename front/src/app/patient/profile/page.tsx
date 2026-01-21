"use client";

import Breadcrumb from "@/components/ui/custom/breadcrumb";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Patient {
  id: string;
  username: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: string | null;
  image: string;
}

export default function PatientProfile() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await AxiosInstance.get("/user/profile");
        setPatient(response.data);
      } catch (error) {
        console.log("Failed to get data", error);
      }
    };
    fetchPatientData();
  }, []);

  const handleUpdate = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", patient.username);
      formData.append("email", patient.email);
      formData.append("phone", patient.phone);
      formData.append("dob", patient.dob || "");
      formData.append("gender", patient.gender || "");
      if (imageFile) formData.append("image", imageFile);

      await AxiosInstance.post("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Update failed", error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!patient) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-4">
      <Breadcrumb title="Patient Profile" />

      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : patient.image}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer">
              ✏️
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <h2 className="text-lg font-semibold mt-2">{patient.username}</h2>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div>
            <label>Name</label>
            <input
              className="w-full p-2 border rounded"
              value={patient.username}
              onChange={(e) => setPatient({ ...patient, username: e.target.value })}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              className="w-full p-2 border rounded"
              value={patient.email}
              onChange={(e) => setPatient({ ...patient, email: e.target.value })}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              className="w-full p-2 border rounded"
              value={patient.phone}
              onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={patient.dob || ""}
              onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
            />
          </div>

          <div>
            <label>Gender</label>
            <select
              className="w-full p-2 border rounded"
              value={patient.gender || ""}
              onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button className="bg-red-600 text-white py-2 px-4 rounded">
            DELETE ACCOUNT
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  );
}
