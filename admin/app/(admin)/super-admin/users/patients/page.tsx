import UserTable from '@/components/admin/UserTable';

export default function PatientsPage() {
  return <UserTable title="Patients" roleFilter="CUSTOMER" />;
}