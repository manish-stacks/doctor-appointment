"use client";

import { useEffect, useState } from "react";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

interface Props {
  appointmentId: number;
  prescription?: { medicines: Medicine[]; advice: string; followUpDate: string }; // existing prescription for edit
  onClose: () => void;
  onSuccess: () => void;
}

export default function PrescriptionModal({
  appointmentId,
  prescription,
  onClose,
  onSuccess,
}: Props) {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "", dosage: "", duration: "", instructions: "" },
  ]);
  const [advice, setAdvice] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!prescription;

  // 🔥 Autofill in edit mode
  useEffect(() => {
    if (prescription) {
      setMedicines(prescription.medicines || []);
      setAdvice(prescription.advice || "");
      setFollowUpDate(prescription.followUpDate || "");
    }
  }, [prescription]);

  const handleChange = (
    index: number,
    field: keyof Medicine,
    value: string
  ) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedicine = (index: number) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (medicines.some((m) => !m.name)) {
        toast.error("Medicine name required");
        return;
      }

      const payload = {
        medicines,
        advice,
        followUpDate,
      };

      if (isEdit) {
        await AxiosInstance.put(
          `/prescription/${prescription.id}`,
          payload
        );
        toast.success("Prescription updated");
      } else {
        await AxiosInstance.post(
          `/prescription/${appointmentId}`,
          payload
        );
        toast.success("Prescription added");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Prescription" : "Add Prescription"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Medicines */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Medicines</h3>
              <button
                onClick={addMedicine}
                className="flex items-center gap-2 text-blue-600"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {medicines.map((med, index) => (
              <div
                key={index}
                className="border rounded-md p-4 mb-4 space-y-3 relative"
              >
                {medicines.length > 1 && (
                  <button
                    onClick={() => removeMedicine(index)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Dosage (e.g. 500mg)"
                    value={med.dosage}
                    onChange={(e) =>
                      handleChange(index, "dosage", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Duration (e.g. 5 days)"
                    value={med.duration}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Instructions"
                    value={med.instructions}
                    onChange={(e) =>
                      handleChange(index, "instructions", e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Doctor Notes
            </label>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
            />
          </div>

          {/* Follow Up */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Follow Up Date
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Saving...
              </>
            ) : isEdit ? (
              "Update Prescription"
            ) : (
              "Save Prescription"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
