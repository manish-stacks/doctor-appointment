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

interface OtherProps {
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

export default function OtherInformation({ formData, setFormData, handleUpdate }: OtherProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingTreatments, setIsLoadingTreatments] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch treatments when categoryId changes
  useEffect(() => {
    if (formData.categoryId) {
      console.log('Category changed, fetching treatments for:', formData.categoryId);
      fetchTreatments(formData.categoryId);
    } else {
      setTreatments([]);
    }
  }, [formData.categoryId]);

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await AxiosInstance.get('/categories');

      // Handle different response structures
      const categoriesData = response.data;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchTreatments = async (categoryId: string) => {
    try {
      setIsLoadingTreatments(true);
      console.log('Fetching treatments for category:', categoryId);

      const response = await AxiosInstance.get(`/treatments/category/${categoryId}`);
    
      const treatmentsData = response.data;
      const treatmentArray = Array.isArray(treatmentsData) ? treatmentsData : [];
      setTreatments(treatmentArray);

      // If current treatmentId is not in the new treatments list, clear it
      if (formData.treatmentId && !treatmentArray.some(t => t.id === formData.treatmentId)) {
        console.log('Current treatmentId not found in new treatments, clearing it');
        setFormData(prev => ({ ...prev, treatmentId: "" }));
      }

    } catch (error) {
      console.error('Error fetching treatments:', error);
      setTreatments([]);
    } finally {
      setIsLoadingTreatments(false);
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    console.log(`Changing ${field} to:`, value);

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // If category changes, clear treatment selection
    if (field === 'categoryId') {
      setFormData(prev => ({
        ...prev,
        categoryId: value,
        treatmentId: "" // Clear treatment when category changes
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            onValueChange={(value) => handleSelectChange('categoryId', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder={isLoadingCategories ? "Loading..." : "Select category"} />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCategories ? (
                <SelectItem value="loading" disabled>Loading categories...</SelectItem>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name.toUpperCase()}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-categories" disabled>No categories found</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Treatments</p>
          <Select
            value={formData.treatmentId}
            onValueChange={(value) => handleSelectChange('treatmentId', value)}
            disabled={!formData.categoryId || isLoadingTreatments}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue
                placeholder={
                  !formData.categoryId
                    ? "Select category first"
                    : isLoadingTreatments
                      ? "Loading treatments..."
                      : "Select treatment"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {!formData.categoryId ? (
                <SelectItem value="no-category" disabled>Please select a category first</SelectItem>
              ) : isLoadingTreatments ? (
                <SelectItem value="loading" disabled>Loading treatments...</SelectItem>
              ) : treatments.length > 0 ? (
                treatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name.toUpperCase()}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-treatments" disabled>No treatments found for this category</SelectItem>
              )}
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
          <p className="text-sm text-gray-600 mb-2">Timeslots (In Minutes)</p>
          <Select
            value={formData.timeSlot}
            onValueChange={(value) => handleSelectChange('timeSlot', value)}
          >
            <SelectTrigger className="w-full border border-gray-200 focus:border-blue-500 focus:ring-0 rounded h-10">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          disabled={isLoadingCategories || isLoadingTreatments}
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
}