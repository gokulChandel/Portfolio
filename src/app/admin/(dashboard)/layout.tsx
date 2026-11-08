import React from 'react';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const isAuth = await verifyAdminSession();

  if (!isAuth) {
    redirect('/admin/login');
  }

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
