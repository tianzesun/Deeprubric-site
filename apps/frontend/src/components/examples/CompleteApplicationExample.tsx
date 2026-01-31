'use client';

import React, { useState } from 'react';
import { DashboardLayout, Breadcrumb } from '../DashboardLayout';
import { LoginForm, SignupForm, PasswordResetForm } from '../auth';
import { 
  useToast, 
  Alert, 
  SuccessAlert, 
  ErrorAlert, 
  WarningAlert, 
  InfoAlert 
} from '../ToastProvider';
import { 
  StatusBadge, 
  SuccessBadge, 
  ErrorBadge, 
  WarningBadge, 
  InfoBadge, 
  ProcessingBadge 
} from '../StatusBadge';
import { 
  NotificationBell, 
  mockNotifications 
} from '../NotificationBell';
import { 
  FeatureCard 
} from '../FeatureCard';
import { 
  Mail, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  UserPlus, 
  FileText, 
  GraduationCap, 
  Building2 
} from 'lucide-react';

type AuthState = 'login' | 'signup' | 'password-reset' | 'authenticated';

export const CompleteApplicationExample: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  // Mock data for dashboard
  const mockCourses = [
    { id: 1, name: 'CS101 - Introduction to Programming', students: 45, assignments: 8, status: 'active' },
    { id: 2, name: 'MATH201 - Calculus II', students: 32, assignments: 6, status: 'active' },
    { id: 3, name: 'ENG105 - Technical Writing', students: 28, assignments: 4, status: 'pending' },
  ];

  const mockStudents = [
    { id: 1, name: 'John Smith', email: 'john@university.edu', course: 'CS101', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@university.edu', course: 'MATH201', status: 'active' },
    { id: 3, name: 'Mike Davis', email: 'mike@university.edu', course: 'ENG105', status: 'inactive' },
  ];

  const mockAnalytics = {
    totalCourses: 15,
    totalStudents: 342,
    assignmentsSubmitted: 1247,
    averageGrade: 87.5,
    completionRate: 92.3
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    showSuccess('Welcome!', 'You have successfully logged in.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthState('login');
    showSuccess('Logged out', 'You have been logged out successfully.');
  };

  const addNotification = () => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'info' as const,
      title: 'New Assignment Available',
      message: 'A new assignment has been posted for CS101.',
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    showInfo('New notification', 'Check the notification bell for details.');
  };

  if (!isAuthenticated) {
    switch (authState) {
      case 'login':
        return (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onForgotPassword={() => setAuthState('password-reset')}
            onSignup={() => setAuthState('signup')}
          />
        );
      case 'signup':
        return (
          <SignupForm
            onSuccess={handleAuthSuccess}
            onLogin={() => setAuthState('login')}
          />
        );
      case 'password-reset':
        return (
          <PasswordResetForm
            onSuccess={() => setAuthState('login')}
            onLogin={() => setAuthState('login')}
          />
        );
    }
  }

  return (
    <DashboardLayout
      breadcrumbs={['Dashboard']}
      title="Instructor Dashboard"
      actions={
        <div className="flex items-center gap-3">
          <button
            onClick={addNotification}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={16} className="mr-2" />
            Add Notification
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      }
    >
      {/* Welcome Alert */}
      <SuccessAlert
        title="Welcome back, Dr. Johnson!"
        message="Here's what's happening with your courses today."
        onDismiss={() => {}}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FeatureCard
          title="Total Courses"
          description={mockAnalytics.totalCourses.toString()}
          iconType="clipboard"
          index={0}
        />
        <FeatureCard
          title="Total Students"
          description={mockAnalytics.totalStudents.toString()}
          iconType="users"
          index={1}
        />
        <FeatureCard
          title="Assignments Submitted"
          description={mockAnalytics.assignmentsSubmitted.toString()}
          iconType="file"
          index={2}
        />
        <FeatureCard
          title="Average Grade"
          description={`${mockAnalytics.averageGrade}%`}
          iconType="chart"
          index={3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Courses</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                  <Search size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                  <Filter size={20} />
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <Plus size={14} className="mr-1" />
                  New Course
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ClipboardList size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{course.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {course.students} students • {course.assignments} assignments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge type={course.status === 'active' ? 'success' : 'warning'} label={course.status} />
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                      <Edit size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Assignment graded</p>
                  <p className="text-sm text-green-600 dark:text-green-400">CS101 - Assignment 3</p>
                </div>
                <span className="ml-auto text-xs text-green-600 dark:text-green-400">2 min ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <UserPlus size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300">New student enrolled</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">MATH201 - Sarah Wilson</p>
                </div>
                <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">15 min ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">Assignment due soon</p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">ENG105 - Assignment 2</p>
                </div>
                <span className="ml-auto text-xs text-yellow-600 dark:text-yellow-400">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Students Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Students</h2>
            <div className="space-y-3">
              {mockStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <GraduationCap size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.course}</p>
                    </div>
                  </div>
                  <StatusBadge type={student.status === 'active' ? 'success' : 'error'} label={student.status} />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
              View All Students
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Upload size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Upload Assignment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bulk upload assignments</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Download size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Export Grades</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Download grade reports</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Schedule Reminder</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Set assignment deadlines</p>
                </div>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Server Status</span>
                <SuccessBadge label="Online" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Database</span>
                <SuccessBadge label="Connected" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Storage</span>
                <WarningBadge label="75% Full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">API Rate Limit</span>
                <SuccessBadge label="Normal" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Bell for testing */}
      <div className="fixed bottom-6 right-6">
        <NotificationBell
          notifications={notifications}
          onNotificationClick={(n) => console.log('Clicked:', n)}
          onMarkAsRead={(id) => setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
          )}
          onClearAll={() => setNotifications([])}
        />
      </div>
    </DashboardLayout>
  );
};

// Export individual components for easier testing
export const DashboardExample = () => (
  <DashboardLayout
    breadcrumbs={['Dashboard', 'Analytics']}
    title="Analytics Dashboard"
    actions={
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          <Download size={16} className="mr-2" />
          Export Report
        </button>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus size={16} className="mr-2" />
          New Report
        </button>
      </div>
    }
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Students</h3>
        <p className="text-3xl font-bold text-indigo-600">1,234</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+12% from last month</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Completion Rate</h3>
        <p className="text-3xl font-bold text-green-600">94.2%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Above target</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Average Grade</h3>
        <p className="text-3xl font-bold text-purple-600">87.5%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+3.2% from last semester</p>
      </div>
    </div>
  </DashboardLayout>
);

export const AuthExample = () => {
  const [authState, setAuthState] = useState<'login' | 'signup' | 'reset'>('login');

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setAuthState('login')}
          className={`px-4 py-2 rounded-md ${authState === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Login
        </button>
        <button
          onClick={() => setAuthState('signup')}
          className={`px-4 py-2 rounded-md ${authState === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Signup
        </button>
        <button
          onClick={() => setAuthState('reset')}
          className={`px-4 py-2 rounded-md ${authState === 'reset' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Reset Password
        </button>
      </div>

      {authState === 'login' && (
        <LoginForm
          onSuccess={() => console.log('Login successful')}
          onForgotPassword={() => setAuthState('reset')}
          onSignup={() => setAuthState('signup')}
        />
      )}
      {authState === 'signup' && (
        <SignupForm
          onSuccess={() => console.log('Signup successful')}
          onLogin={() => setAuthState('login')}
        />
      )}
      {authState === 'reset' && (
        <PasswordResetForm
          onSuccess={() => console.log('Password reset successful')}
          onLogin={() => setAuthState('login')}
        />
      )}
    </div>
  );
};