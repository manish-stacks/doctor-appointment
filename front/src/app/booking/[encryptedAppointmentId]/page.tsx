"use client";

import { AxiosInstance } from "@/helpers/Axios.instance";
import { decryptId } from "@/helpers/Helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload, X, Loader2, ChevronLeft, ChevronRight, MapPin, Building2, Phone, Star, IndianRupee, Calendar, GalleryHorizontal } from "lucide-react";
import Image from "next/image";

interface AppointmentDetails {
  id: string;
  appointmentId: string;
  userId: string;
  doctorId: string;
  date: string;
  time: string;
  hospitalId: string;
  user?: {
    id: string;
    username: string;
    phone: string;
    image: string;
  };
  hospital?: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
  doctor?: {
    id: string;
    name: string;
    expertise: string;
    image: string;
    appointmentFees: string;
    timeSlot: string;
  };
}

interface Schedule {
  day: string;
  active: boolean;
  slots: Array<{ start: string; end: string }>;
}

export default function Booking() {
  const params = useParams();
  const router = useRouter();
  const encryptedAppointmentId = params?.encryptedAppointmentId as string;

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Form states
  const [appointmentFor, setAppointmentFor] = useState("For me");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [illnessInfo, setIllnessInfo] = useState("");
  const [address, setAddress] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [isInsured, setIsInsured] = useState("No");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Step 2 Date/Time states
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Array<{ date: string; time: string }>>([]);

  // Step 3 Payment states
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Offline");

  useEffect(() => {
    const decodedEncryptedId = decodeURIComponent(encryptedAppointmentId);
    const appointmentId = decryptId(decodedEncryptedId) || decodedEncryptedId;

    const getDetails = async () => {
      try {
        const details = await AxiosInstance.get(`/appointment/${appointmentId}/booking`);

        if (!details || !details.data) {
          console.error('Appointment details not found');
          return;
        }

        setAppointmentDetails(details.data);

        // Pre-fill user data if available
        if (details.data.user) {
          setPatientName(details.data.user.username);
          setPhoneNumber(details.data.user.phone);
        }

        // Fetch doctor's schedule
        if (details.data.doctorId) {
          await fetchDoctorSchedule(details.data.doctorId);
          await fetchBookedSlots(details.data.doctorId);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
        setLoading(false);
      }
    };

    getDetails();
  }, [encryptedAppointmentId]);

  const fetchDoctorSchedule = async (doctorId: string) => {
    try {
      const response = await AxiosInstance.get(`/doctor/${doctorId}/schedule`);
      if (response.data) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const fetchBookedSlots = async (doctorId: string) => {
    try {
      const response = await AxiosInstance.get(`/doctor/${doctorId}/booked-slots`);
      if (response.data) {
        setBookedSlots(response.data);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const newImages = [...images];
      const newPreviews = [...imagePreviews];

      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);

      setImages(newImages);
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const applyCoupon = async () => {
    try {
      const response = await AxiosInstance.post('/coupon/validate', { code: couponCode });
      if (response.data?.discount) {
        setDiscountAmount(response.data.discount);
        alert('Coupon applied successfully!');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Invalid coupon code');
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!patientName || !patientAge || !phoneNumber) {
        alert('Please fill all required fields (Name, Age, Phone)');
        return;
      }
      await updateStep1();
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedTime) {
        alert('Please select a time slot');
        return;
      }
      setCurrentStep(3);
    }
  };

  const updateStep1 = async () => {
    try {
      const response = await AxiosInstance.post(`/appointment/${appointmentDetails?.id}/step1`, {
        appointmentFor,
        patientName,
        patientAge,
        phoneNumber,
        illnessInfo,
        address,
        sideEffects,
        doctorNotes,
        isInsured,
      });

      if (response.data) {
        setAppointmentDetails(response.data);
      }
    } catch (error) {
      console.error('Error updating step 1:', error);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const getNext7Days = (): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateTimeSlots = (start: string, end: string, slotDuration: number): string[] => {
    const slots: string[] = [];
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    let currentTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    while (currentTime < endTime) {
      const hour = Math.floor(currentTime / 60);
      const min = currentTime % 60;
      slots.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
      currentTime += slotDuration;
    }

    return slots;
  };

  const isSlotBooked = (date: Date, time: string): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedSlots.some(slot => slot.date === dateStr && slot.time === time);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('appointmentFor', appointmentFor);
      formData.append('patientName', patientName);
      formData.append('patientAge', patientAge);
      formData.append('phoneNumber', phoneNumber);
      formData.append('illnessInfo', illnessInfo);
      formData.append('address', address);
      formData.append('sideEffects', sideEffects);
      formData.append('doctorNotes', doctorNotes);
      formData.append('isInsured', isInsured);
      formData.append('paymentType', paymentMethod);
      formData.append('couponCode', couponCode);
      formData.append('date', selectedDate.toISOString().split('T')[0]);
      formData.append('time', selectedTime);
      formData.append('amount', String(appointmentFees - discountAmount));

      images.forEach((image) => {
        formData.append('reportImage', image);
      });

      const response = await AxiosInstance.post(
        `/appointment/${appointmentDetails?.id}/complete-booking`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data) {
        alert('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const next7Days = getNext7Days();
  const selectedDayName = getDayName(selectedDate);
  const selectedSchedule = schedules.find(s => s.day === selectedDayName);
  const slotDuration = parseInt(appointmentDetails?.doctor?.timeSlot || '30');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  const appointmentFees = parseFloat(appointmentDetails?.doctor?.appointmentFees || '0');
  const finalAmount = appointmentFees - discountAmount;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Appointment Booking</h1>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <div className={`w-20 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <div className={`w-20 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2 space-x-16 text-sm">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Patient Details</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Date & Time</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Payment</span>
          </div>
        </div>

        {/* STEP 1: Patient Details */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg border p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Details</h2>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Appointment For */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment For <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={appointmentFor}
                    onChange={(e) => setAppointmentFor(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>For me</option>
                    <option>For someone else</option>
                  </select>
                </div>

                {/* Illness Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Illness Information
                  </label>
                  <input
                    type="text"
                    value={illnessInfo}
                    onChange={(e) => setIllnessInfo(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your illness"
                  />
                </div>

                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                {/* Patient Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter age"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Side Effects */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any Side Effects Of The Drug?
                  </label>
                  <input
                    type="text"
                    value={sideEffects}
                    onChange={(e) => setSideEffects(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe any side effects"
                  />
                </div>

                {/* Doctor Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any Note For Doctor?
                  </label>
                  <input
                    type="text"
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special notes"
                  />
                </div>
              </div>

              {/* Patient Insured */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Insured?
                </label>
                <select
                  value={isInsured}
                  onChange={(e) => setIsInsured(e.target.value)}
                  className="w-full md:w-1/3 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              {/* Upload Patient Image & Report */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Upload Patient Image & Report
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="relative">
                      {imagePreviews[index] ? (
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                          <Image
                            src={imagePreviews[index]}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-48 object-cover"
                            width={300}
                            height={300}
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-1">
                            Drop your image or{" "}
                            <span className="text-blue-600">Browse</span>
                          </p>
                          <p className="text-xs text-gray-400">Support: JPEG, PNG</p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => handleImageUpload(e, index)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handlePrevious}
                className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Time Selection */}
        {currentStep === 2 && (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>

                {/* Date Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Select Date</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {next7Days.map((date, idx) => {
                      const dayName = getDayName(date);
                      const schedule = schedules.find(s => s.day === dayName);
                      const isActive = schedule?.active;
                      const isSelected = selectedDate.toDateString() === date.toDateString();

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isActive) {
                              setSelectedDate(date);
                              setSelectedTime('');
                            }
                          }}
                          disabled={!isActive}
                          className={`px-3 py-2 rounded-lg text-center transition-all ${isSelected
                            ? 'bg-blue-600 text-white shadow-md'
                            : isActive
                              ? 'bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-900'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          <div className="text-xs font-medium mb-1">{dayName.slice(0, 3)}</div>
                          <div className="text-xs">
                            {idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : date.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Selected: {formatDate(selectedDate)} ({selectedDayName})
                  </p>
                </div>

                {/* Time Slots */}
                {selectedSchedule && selectedSchedule.active && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Time Slots</h3>
                    <div className="space-y-4">
                      {selectedSchedule.slots.map((slot, idx) => {
                        if (!slot.start || !slot.end) return null;

                        const timeSlots = generateTimeSlots(slot.start, slot.end, slotDuration);

                        return (
                          <div key={idx}>
                            <p className="text-sm text-gray-500 mb-2">{slot.start} - {slot.end}</p>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                              {timeSlots.map((time) => {
                                const booked = isSlotBooked(selectedDate, time);
                                const isSelected = selectedTime === time;

                                return (
                                  <button
                                    key={time}
                                    disabled={booked}
                                    onClick={() => handleTimeSlotClick(time)}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all ${isSelected
                                      ? 'bg-blue-600 text-white border-2 border-blue-600'
                                      : booked
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                                      }`}
                                  >
                                    {time}
                                    <div className={`text-xs mt-1`}>
                                      {booked ? 'Booked' : 'Available'}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {(!selectedSchedule || !selectedSchedule.active) && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No available slots for this day</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={handlePrevious}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedTime}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hospital/Clinic */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Hospital/Clinic
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{appointmentDetails?.hospital?.name}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{appointmentDetails?.hospital?.address}</p>
                  </div>
                  {appointmentDetails?.hospital?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <p className="text-sm text-gray-600">{appointmentDetails?.hospital?.phone}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GalleryHorizontal className="w-5 h-5" />
                  Hospital Gallery
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 space-y-3 gap-2">
                  <img src="https://i.pinimg.com/736x/29/95/50/299550146f8718b167570f53472cce51.jpg" alt="g-1" className="border shadow rounded-md" />
                  <img src="https://i.pinimg.com/736x/29/95/50/299550146f8718b167570f53472cce51.jpg" alt="g-1" className="border shadow rounded-md" />
                  <img src="https://i.pinimg.com/736x/29/95/50/299550146f8718b167570f53472cce51.jpg" alt="g-1" className="border shadow rounded-md" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Payment */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Offer Code */}
              <div className="bg-white rounded-lg border p-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Offer code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-2.5 text-blue-600 font-medium hover:text-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="flex gap-4">
                  <div
                    onClick={() => setPaymentMethod('Offline')}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all w-full ${paymentMethod === 'Offline' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded">
                      <span className="text-2xl">💵</span>
                    </div>
                    <span className="font-medium text-gray-900">Cash Payment</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('Online')}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all w-full ${paymentMethod === 'Online' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded">
                      <span className="text-2xl">💳</span>
                    </div>
                    <span className="font-medium text-gray-900">Online Payment</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm Booking - ₹${finalAmount}`
                  )}
                </button>
              </div>
              <button
                onClick={handlePrevious}
                className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            </div>

            {/* Right Section - Doctor & Appointment Details */}
            <div className="space-y-6">
              {/* Doctor Card */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Image
                    src={appointmentDetails?.doctor?.image || "https://ui-avatars.com/api/?name=DR&background=3B82F6&color=fff&size=150"}
                    alt={appointmentDetails?.doctor?.name || "Doctor"}
                    width={120}
                    height={120}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 mb-3"
                  />
                  <h3 className="text-xl font-bold text-gray-900">
                    Dr. {appointmentDetails?.doctor?.name}
                  </h3>
                  <p className="text-blue-600 text-sm mb-2">
                    {appointmentDetails?.doctor?.expertise}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8 (120 reviews)</span>
                  </div>
                </div>

                {/* Hospital Info */}
                {appointmentDetails?.hospital && (
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {appointmentDetails.hospital.name}
                    </h4>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{appointmentDetails.hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{appointmentDetails.hospital.phone}</span>
                    </div>
                  </div>
                )}

                {/* Appointment Details */}
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Appointment Date:</span>
                    <span className="text-gray-900 font-medium">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Appointment Time:</span>
                    <span className="text-gray-900 font-medium">{selectedTime}</span>
                  </div>
                </div>

                {/* Price Details */}
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Appointment Fees:</span>
                    <span className="text-blue-600 font-semibold flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {appointmentFees}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Discount Amount:</span>
                      <span className="text-green-600 font-semibold flex items-center">
                        - <IndianRupee className="w-4 h-4" />
                        {discountAmount}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-base font-semibold pt-2 border-t">
                    <span className="text-gray-900">Final Amount:</span>
                    <span className="text-blue-600 flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {finalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}