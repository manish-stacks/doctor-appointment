export interface AppointmentDetails {
  appointmentFor: string;
  appointmentStatus: string;
  id: number;
  phoneNumber: string;
  discountAmount: number;
  transactionId: string;
  appointmentId: string;
  patientName: string;
  patientAge: number;
  patientNumber: string;
  patientEmail: string;
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
  doctor?: {
    id: string;
    name: string;
    expertise: string;
    image: string;
    appointmentFees: string;
    timeSlot: string;
    experience?: string;
    hospital?: {
      id: string;
      name: string;
      address: string;
      phone: string;
    };
  };
  hospital?: { 
    id: number;
    name: string;
    address: string;
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