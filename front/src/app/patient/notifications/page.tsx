'use client';

import Breadcrumb from "@/components/ui/custom/breadcrumb";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await AxiosInstance.get('/notification');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await AxiosInstance.post(`/notification/${id}/read`);

      setNotifications(prev =>
        prev.map(item =>
          item.id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await AxiosInstance.delete(`/notification/${id}`);

      setNotifications(prev =>
        prev.filter(item => item.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <Breadcrumb title="Notifications" />

      <div className="max-w-8xl mx-auto mt-6 bg-white rounded-xl shadow-sm border">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No Notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`relative p-4 border-b hover:bg-gray-50 transition 
              ${!item.isRead ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  {!item.isRead && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="p-1 rounded hover:bg-green-100 text-green-600"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(item.id)}
                    className="p-1 rounded hover:bg-red-100 text-red-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {!item.isRead && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
