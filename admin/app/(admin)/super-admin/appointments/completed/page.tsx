import AppointmentAdminTable from "@/components/admin/AppointmentAdminTable";

export default function Page() {
  return <AppointmentAdminTable title="Completed Appointments" filterType="COMPLETED" />;
}