import UserTable from '@/components/admin/UserTable';

export default function AllUsersPage() {
  return <UserTable title="All Users" roleFilter="ALL" />;
}