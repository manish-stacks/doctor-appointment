'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import Breadcrumb from '../global/breadcrumb';
import Pagination from '../global/pagination';

interface Props {
  roleFilter?: string;
  title: string;
}

export default function UserTable({ roleFilter = 'ALL', title }: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const res = await AxiosInstance.post('/user', {
      page,
      limit: 10,
      search,
      role: roleFilter,
    });

    setUsers(res.data.data);
    setTotalPages(res.data.lastPage);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  return (
    <div className="p-4">
      <Breadcrumb title={title} />

      <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="flex justify-end">
          <input
            placeholder="Search by Name / Email"
            className="border rounded px-3 py-1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, idx) => (
              <TableRow key={user.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Blocked</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
}