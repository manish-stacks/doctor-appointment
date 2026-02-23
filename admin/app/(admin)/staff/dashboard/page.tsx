'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import { useAuth } from '@/lib/hooks/useAuth';

import { Briefcase, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StaffDashboard() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;


  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Recruiter Dashboard"
        description={`Welcome back, ${currentUser.name}!`}
      />

      <div className="px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Assigned Jobs"
            value={0}
            icon={Briefcase}
          />
          <StatCard
            title="My Suggestions"
            value={0}
            icon={FileText}
            change={`${0} pending`}
          />
          <StatCard
            title="Scheduled Interviews"
            value={0}
            icon={Calendar}
          />
          <StatCard
            title="Suggestion Rate"
            value="92%"
            icon={TrendingUp}
            changeType="positive"
            change="↑ Excellent"
          />
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Suggestions */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Suggestions</h2>
            </div>
            <div className="divide-y divide-gray-200">
             
            </div>
          </Card>

          {/* Scheduled Interviews */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
            </div>
            <div className="divide-y divide-gray-200">
              
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
