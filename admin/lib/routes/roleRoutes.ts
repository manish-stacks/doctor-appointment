import React from 'react';
import { UserRole } from '@/lib/types/types';
import {
  BarChart3,
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  ShieldCheck,
  MessageSquare,
  Layers,
  Bell,
  Building2,
  User,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/* ======================================================
   TYPES
====================================================== */

export interface MenuItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  requiredPermission?: string;
}

export interface MenuGroupConfig {
  label: string;
  items: MenuItemConfig[];
}

/* ======================================================
   SUPER ADMIN MENU (Healthcare SaaS)
====================================================== */

const superAdminMenu: MenuGroupConfig[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/super-admin/dashboard',
        icon: BarChart3,
      },
    ],
  },
  {
    label: 'User Management',
    items: [
      { label: 'All Users', href: '/super-admin/users', icon: Users },
      { label: 'Patients', href: '/super-admin/users/patients', icon: Users },
      { label: 'Doctors', href: '/super-admin/users/doctors', icon: Stethoscope },
      { label: 'Admins/Staff', href: '/super-admin/users/admins-and-staff', icon: ShieldCheck },
    ],
  },
  {
    label: 'Hospital Management',
    items: [
      { label: 'All Hospitals', href: '/super-admin/hospitals', icon: Building2 },
      { label: 'Pending Approvals', href: '/super-admin/hospitals/pending', icon: Building2 },
      { label: 'Active / Inactive', href: '/super-admin/hospitals/active-inactive', icon: Building2 },
    ],
  },
  {
    label: 'Doctor Management',
    items: [
      { label: 'All Doctors', href: '/super-admin/doctors', icon: Stethoscope },
      { label: 'Pending Approval', href: '/super-admin/doctors/pending', icon: Stethoscope },
      { label: 'Active / Inactive', href: '/super-admin/doctors/active-inactive', icon: Stethoscope },
      { label: 'Popular Doctors', href: '/super-admin/doctors/popular', icon: Stethoscope },
      { label: 'Doctor Subscriptions', href: '/super-admin/doctors/subscriptions', icon: CreditCard },
      { label: 'Earnings', href: '/super-admin/doctors/earnings', icon: CreditCard },
      { label: 'Doctor Reviews', href: '/super-admin/doctors/reviews', icon: MessageSquare },
      { label: 'Doctor Slots', href: '/super-admin/doctors/slots', icon: Calendar },
      { label: 'KYC / Documents Approval', href: '/super-admin/doctors/kyc-approval', icon: FileText },
    ],
  },
  {
    label: 'Appointment Management',
    items: [
      { label: 'All Appointments', href: '/super-admin/appointments', icon: Calendar },
      { label: 'Today’s Appointments', href: '/super-admin/appointments/today', icon: Calendar },
      { label: 'Cancelled', href: '/super-admin/appointments/cancelled', icon: Calendar },
      { label: 'Completed', href: '/super-admin/appointments/completed', icon: Calendar },
      { label: 'Refund Requests', href: '/super-admin/appointments/refund-requests', icon: CreditCard },
      { label: 'Reschedule Requests', href: '/super-admin/appointments/reschedule-requests', icon: Calendar },
    ],
  },
  {
    label: 'Payments & Revenue',
    items: [
      { label: 'All Transactions', href: '/super-admin/payments/all-transactions', icon: CreditCard },
      { label: 'Doctor Earnings', href: '/super-admin/payments/doctor-earnings', icon: CreditCard },
      { label: 'Platform Commission', href: '/super-admin/payments/platform-commission', icon: CreditCard },
      { label: 'Refunds', href: '/super-admin/payments/refunds', icon: CreditCard },
      { label: 'Payout Management', href: '/super-admin/payments/payout-management', icon: CreditCard },
      { label: 'Subscription Payments', href: '/super-admin/payments/subscription-payments', icon: CreditCard },
    ],
  },
  {
    label: 'Subscription Plans',
    items: [
      { label: 'All Plans', href: '/super-admin/plans', icon: CreditCard },
      { label: 'Create Plan', href: '/super-admin/plans/create', icon: CreditCard },
    ],
  },
   {
    label: 'Categories & Treatments',
    items: [
      { label: 'Categories', href: '/super-admin/categories', icon: CreditCard },
      { label: 'Treatments', href: '/super-admin/treatments', icon: Bell },
      { label: 'Add Treatments', href: '/super-admin/add-treatments', icon: Bell },
      { label: 'Add Categories', href: '/super-admin/add-categories', icon: Bell },
    ],
  },
  {
    label: "All Testimonials",
    items: [
      { label: 'All Testimonials', href: '/super-admin/all-testimonials', icon: Bell },
      { label: 'Add Testimonials', href: '/super-admin/add-testimonials', icon: Bell },
    ],
  },
  {
    label: "CMS Management",
    items: [
      { label: 'Homepage Content', href: '/super-admin/all-faqs', icon: Bell },
      { label: 'About Page', href: '/super-admin/add-faqs', icon: Bell },
      { label: 'FAQs', href: '/super-admin/edit-faqs', icon: Bell },
      { label: 'Privacy Policy', href: '/super-admin/delete-faqs', icon: Bell },
      { label: 'Terms & Conditions', href: '/super-admin/delete-faqs', icon: Bell },
      { label: 'Blog Categories', href: '/super-admin/delete-faqs', icon: Bell },
      { label: 'Blog Management', href: '/super-admin/delete-faqs', icon: Bell },
      { label: 'Contact Info', href: '/super-admin/delete-faqs', icon: Bell },
    ],
  },
  {
    label: "Reports & Analytics",
    items: [
      { label: 'Revenue Graph', href: '/super-admin/reports', icon: Bell },
      { label: 'Appointment Trends', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Top Doctors', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Top Categories', href: '/super-admin/support-settings', icon: Bell },
      { label: 'User Growth', href: '/super-admin/support-settings', icon: Bell },
      { label: 'State-wise analytics', href: '/super-admin/support-settings', icon: Bell },

    ],
  },
  {
    label: "Reviews & Feedback",
    items: [
      { label: 'Doctor Reviews', href: '/super-admin/doctor-reviews', icon: Bell },
      { label: 'Hospital Reviews', href: '/super-admin/hospital-reviews', icon: Bell },
      { label: 'Platform Feedback', href: '/super-admin/platform-feedback', icon: Bell },
    ],
  },
  {
    label: "Marketing & Promotions",
    items: [
      { label: 'Discount Codes', href: '/super-admin/discount-codes', icon: Bell },
      { label: 'Referral Program', href: '/super-admin/referral-program', icon: Bell },
      { label: 'Affiliate Management', href: '/super-admin/affiliate-management', icon: Bell },
    ],
  },
  {
    label: "Notifications",
    items: [
      { label: 'Push Notifications', href: '/super-admin/support-tickets', icon: Bell },
      { label: 'Email Broadcast', href: '/super-admin/support-settings', icon: Bell },
      { label: 'SMS Campaign', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Announcement Banner', href: '/super-admin/support-settings', icon: Bell },
    ],
  },
  {
    label: "Roles & Permissions",
    items: [
      { label: 'Create Admin', href: '/super-admin/support-tickets', icon: Bell },
      { label: 'Assign Roles', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Permission Control', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Activity Logs', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Login History', href: '/super-admin/support-settings', icon: Bell },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: 'Platform Settings', href: '/super-admin/support-tickets', icon: Bell },
      { label: 'Commission %', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Payment Gateway Config', href: '/super-admin/support-settings', icon: Bell },
      { label: 'SMTP Config', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Logo Upload', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Maintenance Mode', href: '/super-admin/support-settings', icon: Bell },
    ],
  },
  {
    label: "Support & Disputes",
    items: [
      { label: 'Support Tickets', href: '/super-admin/support-tickets', icon: Bell },
      { label: 'Chat Logs', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Refund Cases', href: '/super-admin/support-settings', icon: Bell },
      { label: 'Abuse Reports', href: '/super-admin/support-settings', icon: Bell },
    ],
  }

];

/* ======== STAFF MENU ====== */

const staffMenu: MenuGroupConfig[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/staff/dashboard', icon: BarChart3 },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Doctors', href: '/staff/doctors', icon: Stethoscope },
      { label: 'Appointments', href: '/staff/appointments', icon: Calendar },
      { label: 'Patients', href: '/staff/patients', icon: Users },
    ],
  },
];

/* ====== EXPORT ROLE MENUS ================= */

export const roleMenus: Record<UserRole, MenuGroupConfig[]> = {
  SUPER_ADMIN: superAdminMenu,
  STAFF: staffMenu,
};

/* ====== ROLE COLORS =============== */

export const roleColors: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-red-600',
  STAFF: 'bg-blue-600',
};

/* ========= ROLE NAMES =============== */
export const roleNames: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  STAFF: 'Staff',
};
