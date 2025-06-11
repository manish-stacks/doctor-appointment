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
import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/helpers/Axios.instance';


interface otherPops {
  formData: PersonalInfo;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface Category {
  id: string;
  name: string;
}
interface Treatment {
  id: string;
  name: string;
}




export default function OtherInformation({ formData, setFormData, handleUpdate }: otherPops) {

  const [categories, setCategories] = useState<Category[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTreatments = async (value: string) => {
    try {
      const response = await AxiosInstance.get(`/treatments/category/${value}`);
      setTreatments(response.data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };


  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });

    if (field === 'categoryId') {
      fetchTreatments(value);
    }

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
            placeholder="Enter years of experience"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Appointment Fees</p>
          <Input
            name="appointmentFees"
            value={formData.appointmentFees}
            onChange={handleInputChange}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
            placeholder="Enter appointment fees"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-6">

        <div>
          <p className="text-sm text-gray-600 mb-2">Categories</p>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => handleChange('categoryId', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Choose" disabled>Choose</SelectItem>
              {
                categories.length > 0 ? categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name.toLocaleUpperCase()}
                  </SelectItem>
                )) : (
                  <SelectItem value="Npt">Not Found</SelectItem>
                )
              }
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Treatments</p>
          <Select
            value={formData.treatmentId}
            onValueChange={(value) => handleChange('treatmentId', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Choose" disabled>Choose</SelectItem>
              {
                treatments.length > 0 ? treatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name.toLocaleUpperCase()}
                  </SelectItem>
                )) : (
                  <SelectItem value="Npt">Not Found</SelectItem>
                )
              }

            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Expertise</p>

          <Input
            name="expertise"
            value={formData.expertise}
            onChange={handleInputChange}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded px-3 py-2"
            placeholder="Enter expertise"
          />

        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Timeslots(In Minutes)</p>
          <Select
            value={formData.timeSlot}
            onValueChange={(value) => handleChange('timeSlot', value)}
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