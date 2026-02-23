'use client'

import { useEffect, useState } from "react"
import Breadcrumb from "@/components/ui/custom/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, CheckCircle, Clock, IndianRupee } from "lucide-react"
import { AxiosInstance } from "@/helpers/Axios.instance"
import confetti from 'canvas-confetti';
import { encryptId } from "@/helpers/Helper";
import { userDetails } from "@/types/store";
import { useUserStore } from "@/store/useUserStore"
import { useRouter } from "next/navigation"
import { AppointmentDetails } from "@/types/appointment"
import Loader from "@/components/ui/loader"

interface DoctorStats {
    total: number;
    today: number;
    pending: number;
    completed: number;
    revenue: number;
 }
export default function DoctorDashboard() {

    const [stats, setStats] = useState<DoctorStats>({
        total: 0,
        today: 0,
        pending: 0,
        completed: 0,
        revenue: 0
    })

    const [recentAppointments, setRecentAppointments] = useState<AppointmentDetails[]>([])
    const userDetails = useUserStore((state) => state.getUserDetails);
    const [userdata, setUserData] = useState<userDetails | null>(null);
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const router = useRouter();

    const fetchDashboard = async () => {
        try {
            const res = await AxiosInstance.get("/doctor/dashboard")

            setStats(res.data.stats)
            setRecentAppointments(res.data.recentAppointments)

        } catch (error) {
            console.error("Dashboard fetch error:", error)
        }
    }
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const details = userDetails();

                if (!details || !details.doctor_id) {
                    router.push("/doctor/profile");
                    return;
                }
                setUserData(details);
                setDoctorId(details.doctor_id);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        getUserDetails();
    }, [userDetails, router, doctorId]);

    useEffect(() => {
        fetchDashboard()
    }, [])


    function copyProfileLink() {

        if (!doctorId) {
            console.error('Doctor ID is not available');
            return;
        }

        const encryptedDoctorId = encryptId(String(doctorId));
        const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
        const link = `${window.location.origin}/profile/${encodedEncryptedDoctorId}`;


        navigator.clipboard.writeText(link).then(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: 0.5, y: 0.5 },
            });
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    }

    if (!userdata) {
        return (
            <Loader />
        );
    }

    if (!userdata?.doctor_id) {
        router.push('/doctor/profile');
        return;
    }

    return (
        <div className="p-4 space-y-6">

            <Breadcrumb title="Dashboard" />
            <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
                <div className="mb-6">  {/* Left aligned section */}
                    <h2 className="text-2xl font-semibold mb-2">Welcome back, {userdata?.username || 'Doctor'}</h2>
                    <p className="text-gray-600">Your dashboard content goes here.</p>
                </div>

                <div className="mt-6">  {/* Right aligned section */}
                    <button
                        onClick={copyProfileLink}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Send Link
                    </button>
                </div>
            </div>
            {/* ================= STATS CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Appointments</p>
                            <h2 className="text-2xl font-bold">{stats.total}</h2>
                        </div>
                        <Users className="text-blue-500" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Today&apos;s Appointments</p>
                            <h2 className="text-2xl font-bold">{stats.today}</h2>
                        </div>
                        <Calendar className="text-green-500" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <h2 className="text-2xl font-bold">{stats.pending}</h2>
                        </div>
                        <Clock className="text-yellow-500" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <h2 className="text-2xl font-bold">{stats.completed}</h2>
                        </div>
                        <CheckCircle className="text-purple-500" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h2 className="text-2xl font-bold">₹{stats.revenue}</h2>
                        </div>
                        <IndianRupee className="text-red-500" />
                    </CardContent>
                </Card>

            </div>

            {/* ================= RECENT APPOINTMENTS ================= */}
            <div className="rounded-2xl border bg-white shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>#</TableHead>
                            <TableHead>Appointment ID</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {recentAppointments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6">
                                    No recent appointments
                                </TableCell>
                            </TableRow>
                        )}

                        {recentAppointments.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>#{item.appointmentId}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>
                                    <div>{item.date}</div>
                                    <div className="text-xs text-gray-500">{item.time}</div>
                                </TableCell>
                                <TableCell>₹{item.finalAmount}</TableCell>
                                <TableCell>
                                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                                        {item.appointmentStatus}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>

        </div>
    )
}
