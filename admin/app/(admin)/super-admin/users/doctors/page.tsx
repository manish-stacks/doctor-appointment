import UserTable from '@/components/admin/UserTable';

export default function DoctorsPage() {
  return <UserTable title="Doctors" roleFilter="DOCTOR" />;
}