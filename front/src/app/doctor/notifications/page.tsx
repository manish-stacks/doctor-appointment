'use client';

import Breadcrumb from "@/components/Breadcrumb";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      user: 'Rob Bye',
      action: 'Replied',
      group: 'Native All-Hands & Demos • October',
      message:
        'Shoutout to @tammy for hitting the ground running and already creating things that will be super impactful for all our teams!',
      time: '1hr',
      avatar: 'https://i.pravatar.cc/50?img=3',
      unread: true,
    },
    {
      id: 2,
      user: 'Rob Bye',
      action: 'Commented',
      group: 'Native All-Hands & Demos • October',
      message:
        'Shoutout to @tammy for hitting the ground running and already creating things that will be super impactful for all our teams!',
      time: '1hr',
      avatar: 'https://i.pravatar.cc/50?img=3',
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
