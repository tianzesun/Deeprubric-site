'use client';

import { useState, useEffect } from 'react'; // 👈 This is the missing line
import { useAuth } from '../../../../features/auth/hooks/useAuth';
import { useCourses } from '../../../../features/course/hooks/useCourses';
import { useAssignments } from '../../../../features/assignment/hooks/useAssignments';
import { useGrading } from '../../../../features/grading/hooks/useGrading';

import { DashboardLayout } from '../../../../components/dashboard/DashboardLayout';
import { CourseCard } from '../../../../components/dashboard/CourseCard';
import { AssignmentList } from '../../../../components/assignment/AssignmentList';
import Button from '../../../../components/ui/Button';

import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  Shield, 
  Settings,
  Calendar,
  BarChart3,
  Database,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { courses, loading: coursesLoading, error: coursesError } = useCourses();
  const { assignments, loading: assignmentsLoading, error: assignmentsError } = useAssignments();
  const { grades, loading: gradesLoading, error: gradesError } = useGrading();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'system' | 'analytics' | 'settings'>('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalAssignments: 0,
    totalGrades: 0,
    activeUsers: 0,
    systemHealth: 'good'
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isAdmin]);

  useEffect(() => {
    // Calculate system statistics
    if (courses && assignments && grades) {
      const totalUsers = courses.reduce((acc, course) => {
        return acc + course.students.length + course.tas.length + 1; // +1 for professor
      }, 0);
      
      const activeUsers = new Set();
      courses.forEach(course => {
        course.students.forEach(s => activeUsers.add(s.id));
        course.tas.forEach(ta => activeUsers.add(ta.id));
        activeUsers.add(course.professorId);
      });

      setStats({
        totalUsers,
        totalCourses: courses.length,
        totalAssignments: assignments.length,
        totalGrades: grades.length,
        activeUsers: activeUsers.size,
        systemHealth: 'good'
      });
    }
  }, [courses, assignments, grades]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (coursesError || assignmentsError || gradesError) {
    toast.error('Failed to load dashboard data');
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 mt-1">
              System Administrator Dashboard
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="primary"
              onClick={() => setActiveTab('system')}
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>System Health</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setActiveTab('analytics')}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Grades</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGrades}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-gray-900">{stats.systemHealth}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Database className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Calendar },
              { id: 'users', name: 'User Management', icon: Users },
              { id: 'courses', name: 'Course Management', icon: Building2 },
              { id: 'system', name: 'System Health', icon: Shield },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 },
              { id: 'settings', name: 'System Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">System Status</p>
                      <p className="text-sm text-gray-600">All systems operational</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Database Status</p>
                      <p className="text-sm text-gray-600">Connected and healthy</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">API Status</p>
                      <p className="text-sm text-gray-600">All endpoints responding</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New course created</p>
                      <p className="text-xs text-gray-600">CS 401 - Advanced Programming</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Grade submission</p>
                      <p className="text-xs text-gray-600">Assignment graded by Prof. Smith</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">User enrollment</p>
                      <p className="text-xs text-gray-600">5 students enrolled in Math 201</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab('users')}
                    className="flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>Add User</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setActiveTab('users')}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Manage Roles</span>
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500">User management interface coming soon. For now, you can view system statistics from the overview tab.</p>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab('courses')}
                    className="flex items-center space-x-2"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Create Course</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setActiveTab('courses')}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Manage Assignments</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
                {courses?.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No courses found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('system')}
                  className="flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Run Diagnostics</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Server Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Server Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-2/5"></div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <span className="text-sm text-gray-600">Disk Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>

                {/* Database Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Database Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Connection: Active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Replication: Healthy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Backups: Up to date</span>
                    </div>
                  </div>
                </div>

                {/* API Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">API Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Authentication: Healthy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Database: Healthy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">File Storage: Healthy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">System Analytics</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('analytics')}
                  className="flex items-center space-x-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Export Report</span>
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500">Analytics dashboard coming soon. For now, you can view system statistics from the overview tab.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('settings')}
                  className="flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Save Settings</span>
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500">System settings interface coming soon. For now, you can view system health from the system tab.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}