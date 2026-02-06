"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { AppointmentDetails } from "@/types/appointment";
import { Calendar, Clock, Phone, MapPin, IndianRupee, Video, Download, Check } from "lucide-react";
import Receipt from "@/components/Receipt";
import RescheduleModal from "@/components/RescheduleModal";


export default function AppointmentDetail() {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
    const [showReschedule, setShowReschedule] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            const { data } = await AxiosInstance.get(`/appointment/${appointmentId}/booking`);
            setAppointment(data);
        };
        fetchDetail();
    }, [appointmentId]);

    if (!appointment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            Available: 'bg-green-100 text-green-600',
            Booked: 'bg-blue-100 text-blue-600',
            Hold: 'bg-yellow-100 text-yellow-600',
            Approved: 'bg-purple-100 text-purple-600',
            Rescheduled: 'bg-orange-100 text-orange-600',
            Completed: 'bg-gray-100 text-gray-800',
            CancelledByUser: 'bg-red-100 text-red-600',
            Cancelled: 'bg-red-100 text-red-600',
            CancelledByDoctor: 'bg-red-100 text-red-600',
            Remaining: 'bg-red-100 text-red-600',
            Paid: 'bg-green-100 text-green-600',
        };
        return styles[status] || styles.Pending;
    };

    const handleDownload = () => {

        const printArea = document.getElementById("print-area");
        if (!printArea) return;

        const original = document.body.innerHTML;
        document.body.innerHTML = printArea.innerHTML;
        window.print();
        document.body.innerHTML = original;
        window.location.reload();

    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div>
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Appointment Details</h1>
                            <p className="text-sm text-gray-500">Appointment ID: {appointment.appointmentId}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-md border font-medium text-sm ${getStatusBadge(appointment.appointmentStatus)}`}>
                            {appointment.appointmentStatus}
                        </span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Doctor Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Doctor Information</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-4 items-start">
                                    <img
                                        src={appointment.doctor?.image}
                                        alt={appointment.doctor?.name}
                                        className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                            Dr. {appointment.doctor?.name}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-3">{appointment.doctor?.expertise}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                                                {appointment.doctor?.experience} Years Experience
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-1">
                                                <IndianRupee className="w-3 h-3" />
                                                {appointment.appointmentFees}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Schedule */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Appointment Schedule</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Date</p>
                                            <p className="text-gray-900 font-semibold">
                                                {new Date(appointment.date).toLocaleDateString('en-IN', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
                                            <p className="text-gray-900 font-semibold">{appointment.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hospital Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Hospital Information</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">{appointment?.doctor?.hospital?.name}</h3>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">{appointment?.doctor?.hospital?.address}</p>
                                </div>
                                {appointment?.doctor?.hospital?.phone && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <p className="text-sm">{appointment?.doctor?.hospital.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowReschedule(true)}
                                    className="flex-1 min-w-[180px] px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Reschedule
                                </button>

                                {appointment?.zoomUrl && (
                                    <button className="flex-1 min-w-[180px] px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2">
                                        <Video className="w-4 h-4" />
                                        Join Video Call
                                    </button>
                                )}

                                <button
                                    onClick={handleDownload} className="flex-1 min-w-[180px] px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Receipt
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Patient Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Patient Name</p>
                                    <p className="text-gray-900 font-medium">{appointment.patientName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Age</p>
                                    <p className="text-gray-900 font-medium">{appointment.patientAge} years</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Phone Number</p>
                                    <p className="text-gray-900 font-medium">{appointment.phoneNumber}</p>
                                </div>
                                {appointment.patientEmail && (
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                                        <p className="text-gray-900 font-medium text-sm break-all">{appointment.patientEmail}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Appointment For</p>
                                    <p className="text-gray-900 font-medium">{appointment.appointmentFor}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600 text-sm">Consultation Fee</span>
                                    <span className="font-semibold text-gray-900 flex items-center">
                                        <IndianRupee className="w-4 h-4" />{appointment.appointmentFees}
                                    </span>
                                </div>
                                {appointment.discountAmount > 0 && (
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-green-600 text-sm">Discount</span>
                                        <span className="font-semibold text-green-600 flex items-center">
                                            - <IndianRupee className="w-4 h-4" />{appointment.discountAmount}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-900 font-semibold">Total Paid</span>
                                    <span className="text-lg font-bold text-blue-600 flex items-center">
                                        <IndianRupee className="w-5 h-5" />{appointment.finalAmount}
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Payment Method</span>
                                        <span className="font-medium text-gray-900">{appointment.paymentType}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Payment Status</span>
                                        <span className="font-medium text-green-600 flex items-center gap-1">
                                            <Check className="w-4 h-4" /> {appointment.paymentStatus}
                                        </span>
                                    </div>
                                    {appointment.transactionId && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Transaction ID</span>
                                            <span className="font-mono text-xs text-gray-600">
                                                {appointment.transactionId.slice(0, 15)}...
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        {(appointment.illnessInfo || appointment.sideEffects !== 'no') && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Medical Information</h2>
                                </div>
                                <div className="p-6 space-y-3">
                                    {appointment.illnessInfo && (
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Illness Information</p>
                                            <p className="text-gray-700 text-sm">{appointment.illnessInfo}</p>
                                        </div>
                                    )}
                                    {appointment.sideEffects !== 'no' && (
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Side Effects</p>
                                            <p className="text-gray-700 text-sm">{appointment.sideEffects}</p>
                                        </div>
                                    )}
                                    {/* <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Insurance Status</p>
                                        <p className="text-gray-900 font-medium">{appointment.isInsured}</p>
                                    </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>

            {/* Reschedule Modal */}
            {showReschedule && (
                <RescheduleModal
                    appointmentId={appointment.appointmentId}
                    onClose={() => setShowReschedule(false)}
                />
            )}

            <div className="hidden">
                {appointment && <Receipt booking={appointment} />}
            </div>
        </div>
    );
}