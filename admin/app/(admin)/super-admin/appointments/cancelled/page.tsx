import AppointmentAdminTable from "@/components/admin/AppointmentAdminTable";

export default function Page() {
  return <AppointmentAdminTable title="Cancelled Appointments" filterType="CANCELLED" />;
}