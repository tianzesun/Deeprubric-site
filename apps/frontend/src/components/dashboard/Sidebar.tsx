'use client';

import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  Shield, 
  GraduationCap,
  BarChart3,
  MessageCircle,
  FileCheck,
  Bot
} from 'lucide-react';
import Button from '../ui/Button';

interface SidebarProps {
  role?: 'professor' | 'ta' | 'student' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { user, isAdmin, isProfessor, isTA, isStudent } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: isProfessor || isAdmin ? '/professor/dashboard' : isTA ? '/ta/dashboard' : '/student/dashboard',
      icon: Home,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Courses',
      href: isProfessor || isAdmin ? '/professor/courses' : isTA ? '/ta/courses' : '/student/courses',
      icon: GraduationCap,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Assignments',
      href: isProfessor || isAdmin ? '/professor/assignments' : isTA ? '/ta/assignments' : '/student/assignments',
      icon: FileText,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Gradebook',
      href: isProfessor || isAdmin ? '/professor/gradebook' : isTA ? '/ta/gradebook' : '/student/gradebook',
      icon: FileCheck,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Collaboration',
      href: '/collaboration',
      icon: MessageCircle,
      roles: ['professor', 'ta', 'student', 'admin']
    },
    {
      name: 'Reports',
      href: isProfessor || isAdmin ? '/professor/reports' : '/student/reports',
      icon: BarChart3,
      roles: ['professor', 'student', 'admin']
    },
    {
      name: 'AI Tools',
      href: isProfessor || isAdmin ? '/professor/ai' : '/student/ai',
      icon: Bot,
      roles: ['professor', 'student', 'admin']
    },
  ];

  const adminNavigation = [
    {
      name: 'User Management',
      href: '/admin/user-management',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'System Security',
      href: '/admin/security',
      icon: Shield,
      roles: ['admin']
    },
    {
      name: 'AI Models',
      href: '/admin/ai-models',
      icon: Bot,
      roles: ['admin']
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      roles: ['admin']
    },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const filteredAdminNavigation = adminNavigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">DeepRubric</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {filteredAdminNavigation.length > 0 && (
          <>
            <div className="border-t border-gray-200 my-4"></div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Administration
            </h3>
            <nav className="space-y-1">
              {filteredAdminNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </>
        )}

        <div className="border-t border-gray-200 my-4"></div>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              // Logout logic would go here
              window.location.href = '/auth/login';
            }}
          >
            <span className="h-4 w-4 mr-2">🚪</span>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;