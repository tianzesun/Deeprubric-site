'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Header } from '../Header';
import { NotificationBell } from '../NotificationBell';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Only render after mounting to prevent SSR/client mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or a loading skeleton if you prefer

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header>
        <NotificationBell />
      </Header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
