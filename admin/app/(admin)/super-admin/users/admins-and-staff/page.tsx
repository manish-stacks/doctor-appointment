import UserTable from '@/components/admin/UserTable';

export default function AdminStaffPage() {
  return <UserTable title="Admins & Staff" roleFilter="STAFF" />;
}