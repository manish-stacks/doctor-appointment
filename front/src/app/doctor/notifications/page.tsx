'use client';

import Breadcrumb from "@/components/ui/custom/breadcrumb";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      user: 'Raj Kumar',
      action: 'Replied',
      group: 'Project Bharat • October',
      message: 'Shoutout to @neha for her amazing work on the new feature. Your efforts will make a huge difference!',
      time: '1hr',
      avatar: 'https://i.pravatar.cc/50?img=4',
      unread: true,
    },
    {
      id: 2,
      user: 'Priya Desai',
      action: 'Commented',
      group: 'Project Bharat • October',
      message: 'Great work @neha! Excited to see how the new changes will improve the app experience.',
      time: '1hr',
      avatar: 'https://i.pravatar.cc/50?img=5',
      unread: true,
    },
  ];


  return (
    <div className="p-4">
      <Breadcrumb title="Notifications" />
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-gray-500 text-sm mb-4">Today</h2>
        <div className="space-y-4">
          {notifications.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 space-y-4 relative">
              <img
                src={item.avatar}
                alt={item.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{item.user}</p>
                  <span className="text-gray-500 text-sm">{item.action}</span>
                  <span className="text-gray-400 text-xs">· {item.group}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{item.message}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="text-gray-400 text-xs">{item.time}</span>
                {item.unread && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
