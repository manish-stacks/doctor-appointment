'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import { Users, Briefcase, Calendar, CheckCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const totalCompanies = 0;
  const totalJobs = 0;
  const totalCandidates = 0;
  const totalInterviews = 0;
  const scheduledInterviews = 0;
  const totalOffers = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Super Admin Dashboard"
        description="System overview and management tools"
      />

      <div className="px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Companies"
            value={totalCompanies}
            icon={Users}
          />
          <StatCard
            title="Open Jobs"
            value={totalJobs}
            icon={Briefcase}
            change={`${totalJobs} active`}
          />
          <StatCard
            title="Candidates"
            value={totalCandidates}
            icon={Users}
          />
          <StatCard
            title="Scheduled Interviews"
            value={scheduledInterviews}
            icon={Calendar}
            change={`${totalInterviews} total`}
          />
        </div>

        {/* Second Row of Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Offers"
            value={totalOffers}
            icon={CheckCircle}
          />
          <StatCard
            title="Staff Members"
            value="1"
            icon={Users}
          />
          <StatCard
            title="Conversion Rate"
            value="45%"
            icon={CheckCircle}
            changeType="positive"
            change="↑ 12% from last month"
          />
          <StatCard
            title="Avg Time to Hire"
            value="18 days"
            icon={Calendar}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-sm text-gray-500">No recent activity found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



/*

Overview stats

Total Users

Total Doctors

Total Appointments

Revenue

Active Subscriptions

Today’s bookings graph

*/