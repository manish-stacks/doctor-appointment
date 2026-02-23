"use client";

import { useEffect, useState } from "react";
import { AxiosInstance } from "@/helpers/Axios.instance";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { AppointmentDetails } from "@/types/appointment";

interface Props {
  appointment: AppointmentDetails;
  onSuccess: (data: AppointmentDetails) => void;
}

export default function StepOnePatient({ appointment, onSuccess }: Props) {
  const [form, setForm] = useState({
    appointmentFor: "For me",
    patientName: "",
    patientAge: "",
    phoneNumber: "",
    email: "",
    illnessInfo: "",
    patientAddress: "",
    sideEffects: "",
    doctorNotes: "",
    isInsured: "No",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      appointmentFor: appointment.appointmentFor || "For me",
      patientName: appointment.patientName || "",
      patientAge: appointment.patientAge?.toString() || "",
      phoneNumber: appointment.phoneNumber || "",
      email: appointment.patientEmail || "",
      illnessInfo: appointment.illnessInfo || "",
      patientAddress: appointment.patientAddress || "",
      sideEffects: appointment.sideEffects || "",
      doctorNotes: appointment.doctorNotes || "",
      isInsured: appointment.isInsured || "No",
    });
  }, [appointment]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: any, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImages = [...images];
    const newPreviews = [...previews];

    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const submitStepOne = async () => {
    if (!form.patientName || !form.patientAge || !form.phoneNumber) {
      alert("Name, Age, Phone required");
      return;
    }

    try {
      setLoading(true);

      const res = await AxiosInstance.post(`/appointment/${appointment.id}/step1`, {
        ...form,
        patientAge: Number(form.patientAge),
      });

      onSuccess(res.data);
    } catch (err) {
      console.error("Step1 Error", err);
      alert("Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Patient Name" className="input" />
        <input name="patientAge" type="number" value={form.patientAge} onChange={handleChange} placeholder="Age" className="input" />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone" className="input" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
        <input name="illnessInfo" value={form.illnessInfo} onChange={handleChange} placeholder="Illness Info" className="input" />
        <input name="patientAddress" value={form.patientAddress} onChange={handleChange} placeholder="Address" className="input" />
        <input name="sideEffects" value={form.sideEffects} onChange={handleChange} placeholder="Side Effects" className="input" />
        <input name="doctorNotes" value={form.doctorNotes} onChange={handleChange} placeholder="Note for Doctor" className="input" />
      </div>

      {/* Upload Images */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Upload Reports</label>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative border-2 border-dashed rounded-lg h-32 flex items-center justify-center">
              {previews[i] ? (
                <>
                  <Image src={previews[i]} alt="preview" fill className="object-cover rounded" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center text-gray-500">
                  <Upload />
                  <span className="text-xs">Upload</span>
                  <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={submitStepOne}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
}
