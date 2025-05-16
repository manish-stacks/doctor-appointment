"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PersonalInfo } from '@/app/doctor/profile/page';


interface otherPops {
  formData: PersonalInfo;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function OtherInformation({ formData, setFormData, handleUpdate }: otherPops) {

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-lg font-normal text-blue-500 mb-10">Other Information</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Experience (In Years)</p>
          <Input
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Appointment Fees</p>
          <Input
            name="appointmentFees"
            value={formData.appointmentFees}
            onChange={handleInputChange}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-6">

        <div>
          <p className="text-sm text-gray-600 mb-2">Categories</p>
          <Select
            value={formData.categories}
            onValueChange={(value) => handleChange('categories', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Orthopedic Surgery">Orthopedic Surgery</SelectItem>
              <SelectItem value="Sports Medicine">Sports Medicine</SelectItem>
              <SelectItem value="Joint Replacement">Joint Replacement</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Treatments</p>
          <Select
            value={formData.treatments}
            onValueChange={(value) => handleChange('treatments', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="Neurology">Neurology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Expertise</p>
          <Select
            value={formData.expertise}
            onValueChange={(value) => handleChange('expertise', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Orthopedic Surgical Procedures">Orthopedic Surgical Procedures</SelectItem>
              <SelectItem value="Knee Surgery">Knee Surgery</SelectItem>
              <SelectItem value="Hip Replacement">Hip Replacement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Timeslots(In Minutes)</p>
          <Select
            value={formData.timeslots}
            onValueChange={(value) => handleChange('timeslots', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="45">45</SelectItem>
              <SelectItem value="60">60</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Start Time</p>
          <Input
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            className="w-full bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">End Time</p>
          <Input
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            className="w-full bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={(e) => handleUpdate(e)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
          Update
        </Button>
      </div>
    </div>
  );
}