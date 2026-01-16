
export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Certificate {
  id: string;
  name: string;
  year: string;
}

export interface User {
  email: string;
  phone: string;
  username: string;
}

export interface Hospital {
  name: string;
  address: string;
  phone: string;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface DaySchedule {
  id: number;
  day: string;
  active: boolean;
  slots: TimeSlot[];
  doctorId: number;
}

export interface DoctorDetails {
  hospitalId: number;
  id?: number;
  image: string;
  name: string;
  expertise: string;
  desc: string;
  education: string;
  certificate: string;
  appointmentFees: string;
  experience: string;
  timeSlot: string;
  dob: string;
  gender: string;
  isActive: boolean;
  isVerified: boolean;
  isPopular: boolean;
  patientVideoCall: boolean;
  user?: User;
  hospital?: Hospital;
}

export interface BookedSlot {
  date: string;
  time: string;
}