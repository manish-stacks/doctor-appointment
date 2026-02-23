import { useAuth } from '@/lib/hooks/useAuth';
import { roleMenus } from '@/lib/routes/roleRoutes';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

export function Sidebar() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  if (!currentUser) return <div>Loading...</div>;

  const menuGroups = roleMenus[currentUser.role];

  // Toggle logic to ensure only one group is open at a time
  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label)
        ? [] // If the group is already open, close it (clear the openGroups state)
        : [label] // If it's not open, open the new group (set it as the only group)
    );
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  return (
    <aside className="w-72 bg-gray-900 text-white h-screen overflow-y-auto flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b">
        <h1 className="text-xl font-bold text-gray-50">
          MediCare+
        </h1>
        <p className="text-xs text-gray-50 mt-1">
          Smart Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase text-gray-300 hover:text-white"
            >
              {group.label}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${openGroups.includes(group.label) ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Group Items */}
            {openGroups.includes(group.label) && (
              <ul className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                          isActive
                            ? 'bg-blue-600 text-white' // Active menu item color
                            : 'text-gray-300 hover:bg-gray-800'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}


