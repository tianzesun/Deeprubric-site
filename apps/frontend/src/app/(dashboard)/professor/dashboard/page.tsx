'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useAssignments } from '../../../features/assignment/hooks/useAssignments';
import { useCourses } from '../../../features/course/hooks/useCourses';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { CourseCard } from '../../../components/dashboard/CourseCard';
import { AssignmentList } from '../../../components/assignment/AssignmentList';
import Button from '../../../components/ui/Button';
import { Plus, Calendar, Users, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfessorDashboard() {
  const { user, isAuthenticated, isAdmin, isProfessor } = useAuth();
  const { courses, loading: coursesLoading, error: coursesError } = useCourses();
  const { assignments, loading: assignmentsLoading, error: assignmentsError } = useAssignments();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'assignments' | 'grading'>('overview');

  useEffect(() => {
    if (!isAuthenticated || (!isProfessor && !isAdmin)) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isProfessor, isAdmin]);

  if (!isAuthenticated || (!isProfessor && !isAdmin)) {
    return null;
  }

  const upcomingAssignments = assignments
    ?.filter(assignment => new Date(assignment.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const recentCourses = courses?.slice(0, 3);

  const stats = {
    totalCourses: courses?.length || 0,
    totalAssignments: assignments?.length || 0,
    pendingGrades: assignments?.filter(a => 
      a.submissions.some(s => s.status === 'pending')
    ).length || 0,
    totalStudents: courses?.reduce((acc, course) => acc + course.students.length, 0) || 0,
  };

  if (coursesError || assignmentsError) {
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
              Professor Dashboard
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="primary"
              onClick={() => setActiveTab('courses')}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Course</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setActiveTab('assignments')}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Assignment</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingGrades}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Calendar },
              { id: 'courses', name: 'Courses', icon: Users },
              { id: 'assignments', name: 'Assignments', icon: FileText },
              { id: 'grading', name: 'Grading', icon: Calendar },
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
              {/* Recent Courses */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h2>
                <div className="space-y-4">
                  {recentCourses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                  {recentCourses?.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No courses yet. Create your first course!</p>
                  )}
                </div>
              </div>

              {/* Upcoming Assignments */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
                <div className="space-y-4">
                  {upcomingAssignments?.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{assignment.course.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{assignment.totalPoints} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {upcomingAssignments?.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No upcoming assignments.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('courses')}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Course</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
                {courses?.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No courses yet. Create your first course!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Assignments</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('assignments')}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Assignment</span>
                </Button>
              </div>
              <AssignmentList assignments={assignments || []} loading={assignmentsLoading} />
            </div>
          )}

          {activeTab === 'grading' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Grading Tasks</h2>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('grading')}
                  className="flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>View Calendar</span>
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500">Grading interface coming soon. For now, you can grade assignments from the assignments tab.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}