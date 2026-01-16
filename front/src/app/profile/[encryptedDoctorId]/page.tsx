"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { decryptId, encryptId } from '@/helpers/Helper';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { Mail, Phone, MapPin, Award, GraduationCap, Calendar, Clock, Stethoscope, Building2, CheckCircle, Video, User, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { BookedSlot, Certificate, DaySchedule, DoctorDetails, Education } from '@/types/doctor';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/useUserStore';
import { userDetails } from '@/types/store';
import toast from 'react-hot-toast';


const DoctorProfilePage = () => {
  const params = useParams();
  const encryptedDoctorId = params?.encryptedDoctorId as string;
  const [doctorData, setDoctorData] = useState<DoctorDetails | null>(null);
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  // const [showBookingSection, setShowBookingSection] = useState(false);
  const { openLoginModal } = useUIStore();
  // const userDetails = useUserStore((state) => state.userDetails);
  const userDetails = useUserStore((state) => state.getUserDetails);
  // const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [userdata, setUserData] = useState<userDetails>();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const details = userDetails();
        if (!details) {
          openLoginModal();
          console.warn('No user details available');
          return;
        }
        try {
          setUserData(details);
        } catch (error) {
          console.error('Error setting user data:', error);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    getUserDetails();
  }, [userDetails]);



  useEffect(() => {
    const decodedEncryptedId = decodeURIComponent(encryptedDoctorId);
    const doctorId = decryptId(decodedEncryptedId);

    const getDoctorDetails = async () => {
      try {
        const details = await AxiosInstance.get("/doctor/" + doctorId) as { data: DoctorDetails };

        if (!details) {
          console.error('Doctor details not found');
          return;
        }

        setDoctorData(details.data);

        // Fetch schedule data
        try {
          const scheduleResponse = await AxiosInstance.get("/doctor/" + doctorId + "/schedule");
          if (scheduleResponse?.data) {
            setSchedules(scheduleResponse.data);
          }
        } catch (scheduleError) {
          console.error('Error fetching schedule:', scheduleError);
        }

        // Fetch booked appointments
        try {
          const bookingsResponse = await AxiosInstance.get("/doctor/" + doctorId + "/booked-slots");
          if (bookingsResponse?.data) {
            setBookedSlots(bookingsResponse.data);
          }
        } catch (bookingError) {
          console.error('Error fetching bookings:', bookingError);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    }

    getDoctorDetails();
  }, [encryptedDoctorId]);

  const getDayName = (date: Date): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date.toDateString() === dayAfterTomorrow.toDateString()) {
      return 'Day After Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
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

  const generateTimeSlots = (start: string, end: string, slotDuration: number): string[] => {
    const slots: string[] = [];
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    const endTotalMin = endHour * 60 + endMin;

    while (currentHour * 60 + currentMin < endTotalMin) {
      const timeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
      slots.push(timeStr);

      currentMin += slotDuration;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }

    return slots;
  };

  const isSlotBooked = (date: Date, time: string): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedSlots.some(booking =>
      booking.date === dateStr && booking.time === time
    );
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    // setShowBookingSection(true);

    // Scroll to booking section
    setTimeout(() => {
      const bookingElement = document.getElementById('booking-confirmation');
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleBookAppointment = async () => {
    console.log('selectedTime', selectedTime)
    const BookingData = {
      // date: selectedDate.toISOString().split('T')[0],
      // time: selectedTime,
      doctorId: Number(doctorData?.id),
      hospitalId: Number(doctorData?.hospitalId),
      userId: Number(userdata?.id)
    };
    try {
      const response = await AxiosInstance.post("/appointment", BookingData);
      const appointmentId = response.data.appointmentId;
      const encryptedDoctorId = encryptId(String(appointmentId));
      const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
      const link = `${window.location.origin}/booking/${encodedEncryptedDoctorId}`;
      window.location.href = link;
    } catch (error) {
      toast.error('Failed to book appointment.');
      console.error('Error booking appointment:', error);
    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Doctor not found</p>
        </div>
      </div>
    );
  }

  const educationData: Education[] = doctorData.education ? JSON.parse(doctorData.education) : [];
  const certificateData: Certificate[] = doctorData.certificate ? JSON.parse(doctorData.certificate) : [];
  const slotDuration = parseInt(doctorData.timeSlot);

  const next7Days = getNext7Days();
  const selectedDayName = getDayName(selectedDate);
  const selectedSchedule = schedules.find(s => s.day === selectedDayName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Image
              src={doctorData.image || "https://ui-avatars.com/api/?name=" + doctorData.name + "&background=3B82F6&color=fff&size=150"}
              alt={doctorData.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              width={150}
              height={150}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Dr. {doctorData.name}</h1>
                {doctorData.isVerified && (
                  <CheckCircle className="w-6 h-6 text-blue-600 fill-blue-600" />
                )}
              </div>
              <p className="text-lg text-gray-600 mb-3">{doctorData.expertise}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Stethoscope className="w-4 h-4" />
                  {doctorData.experience} years experience
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {doctorData.appointmentFees}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {doctorData.timeSlot} min consultation
                </span>
              </div>
            </div>
            <button onClick={handleBookAppointment} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{doctorData.desc}</p>
            </div>

            {/* Book Appointment Section */}
            <div className="bg-white rounded-lg p-6 border" id="booking">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Book Appointment</h2>

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
                            // setShowBookingSection(false);
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
                              return (
                                <button
                                  key={time}
                                  disabled={booked}
                                  onClick={() => handleTimeSlotClick(time)}
                                  className={`p-3 rounded-lg text-sm font-medium transition-all ${booked ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white border-2 border-blue-600'}`}>
                                  {time}
                                  <div className={`text-xs ${booked ? 'text-gray-400' : 'text-white'}  mt-1`}>
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
            </div>

            {/* Booking Confirmation Section */}
            {/* {showBookingSection && selectedTime && (
              <div id="booking-confirmation" className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Appointment</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(selectedDate)} ({selectedDayName})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-semibold text-gray-900">Dr. {doctorData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="font-semibold text-gray-900">₹{doctorData.appointmentFees}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleBookAppointment}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTime('');
                      setShowBookingSection(false);
                    }}
                    className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

            )} */}



            {/* Certifications */}
            {certificateData.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certificateData.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-sm text-gray-500">Year: {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900 capitalize">{doctorData.gender}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-900">{new Date(doctorData.dob).toLocaleDateString()}</p>
                  </div>
                </div>
                {doctorData.patientVideoCall && (
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Video Consultation</p>
                      <p className="font-medium text-green-600">Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {doctorData.user?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900 text-sm break-all">{doctorData.user.email.substring(0, 5)}...@***.com</p>
                    </div>
                  </div>
                )}
                {doctorData.user?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{doctorData.user.phone.substring(0, 4)}-***-***</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hospital */}
            {doctorData.hospital && (
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Hospital/Clinic
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{doctorData.hospital.name}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{doctorData.hospital.address}</p>
                  </div>
                  {doctorData.hospital.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <p className="text-sm text-gray-600">{doctorData.hospital.phone.substring(0, 4)}-***-***</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Education */}
            {educationData.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h2>
                <div className="space-y-4">
                  {educationData.map((edu) => (
                    <div key={edu.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution} - {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;