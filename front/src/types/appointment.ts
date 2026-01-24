export interface AppointmentDetails {
  appointmentFor: string;
  id: number;
  appointmentId: string;
  patientName: string;
  patientAge: number;
  phoneNumber: string;
  email: string;
  illnessInfo: string;
  patientAddress: string;
  sideEffects: string;
  doctorNotes: string;
  isInsured: string;
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
    experience?: string;
  };
  discountAmount?: string;
  totalAmount?: string;
  finalAmount?: string;
  paymentType?: string;
  appointmentFees?: string;
  paymentStatus?: string;
  status?: string;
  images?: string[];
  zoomUrl?: string;
  appointmentStatus?: string;
}


export interface Schedule {
  day: string;
  active: boolean;
  slots: Array<{ start: string; end: string }>;
}