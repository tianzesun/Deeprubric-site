'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Plus,
  Search,
  Bell,
  User as UserIcon
} from 'lucide-react';
import { useToast } from './ToastProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: string[];
  title?: string;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  breadcrumbs = [], 
  title,
  actions 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { showSuccess } = useToast();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
    { name: 'Courses', href: '/courses', icon: ClipboardList, current: false },
    { name: 'Students', href: '/students', icon: Users, current: false },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ];

  const handleLogout = () => {
    showSuccess('Logged out successfully', 'You have been logged out of your account.');
    // Add actual logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 z-50 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ClipboardList size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">DeepRubric</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                item.current
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  item.current
                    ? 'text-indigo-500 dark:text-indigo-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <UserIcon size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Sarah Johnson</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Professor</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                {sidebarOpen ? (
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu size={20} className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
              
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Home size={16} />
                <ChevronRight size={14} />
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <span>{crumb}</span>
                    {index < breadcrumbs.length - 1 && <ChevronRight size={14} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Actions */}
              {actions && (
                <div className="flex items-center gap-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Header */}
        {title && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Welcome back! Here's what's happening with your courses today.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus size={16} className="mr-2" />
                  New Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Breadcrumb component for more complex breadcrumb scenarios
export const Breadcrumb: React.FC<{
  items: { label: string; href?: string }[];
  className?: string;
}> = ({ items, className = '' }) => {
  return (
    <nav className={`flex text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index < items.length - 1 ? (
              <a
                href={item.href}
                className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <span className="inline-flex items-center text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <svg
                className="w-4 h-4 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};