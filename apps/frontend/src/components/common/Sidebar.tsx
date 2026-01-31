import React from 'react';
import { useAuth } from '@/features/auth/services/auth.service';
import Button from '@/components/ui/Button';
import { 
  GraduationCap,
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Calendar,
  Settings,
  Shield,
  Bot,
  FileCheck,
  MessageCircle,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, isAdmin, isProfessor, isTA, isStudent } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: '仪表板',
        icon: GraduationCap,
        href: '/dashboard',
        roles: ['admin', 'professor', 'ta', 'student']
      }
    ];

    if (isProfessor() || isAdmin()) {
      return [
        ...baseItems,
        {
          title: '课程管理',
          icon: GraduationCap,
          href: '/dashboard/professor/courses',
          roles: ['admin', 'professor']
        },
        {
          title: '作业管理',
          icon: FileText,
          href: '/dashboard/professor/assignments',
          roles: ['admin', 'professor']
        },
        {
          title: '学生管理',
          icon: Users,
          href: '/dashboard/professor/students',
          roles: ['admin', 'professor']
        },
        {
          title: '助教管理',
          icon: Users,
          href: '/dashboard/professor/ta',
          roles: ['admin', 'professor']
        },
        {
          title: 'Rubric 管理',
          icon: ClipboardList,
          href: '/dashboard/professor/rubrics',
          roles: ['admin', 'professor']
        },
        {
          title: '批改管理',
          icon: ClipboardList,
          href: '/dashboard/professor/grading',
          roles: ['admin', 'professor']
        },
        {
          title: '成绩管理',
          icon: BarChart3,
          href: '/dashboard/professor/gradebook',
          roles: ['admin', 'professor']
        },
        {
          title: '考试管理',
          icon: FileCheck,
          href: '/dashboard/professor/exams',
          roles: ['admin', 'professor']
        },
        {
          title: 'AI 辅助',
          icon: Bot,
          href: '/dashboard/professor/ai',
          roles: ['admin', 'professor']
        },
        {
          title: '报表分析',
          icon: BarChart3,
          href: '/dashboard/professor/reporting',
          roles: ['admin', 'professor']
        },
        {
          title: '查重管理',
          icon: FileCheck,
          href: '/dashboard/professor/plagiarism',
          roles: ['admin', 'professor']
        },
        {
          title: '日程管理',
          icon: Calendar,
          href: '/dashboard/professor/calendar',
          roles: ['admin', 'professor']
        },
        {
          title: '教学协作',
          icon: MessageCircle,
          href: '/dashboard/professor/collaboration',
          roles: ['admin', 'professor']
        }
      ];
    }

    if (isTA()) {
      return [
        ...baseItems,
        {
          title: '批改任务',
          icon: ClipboardList,
          href: '/dashboard/ta/grading',
          roles: ['ta']
        },
        {
          title: '协作管理',
          icon: MessageCircle,
          href: '/dashboard/ta/collaboration',
          roles: ['ta']
        }
      ];
    }

    if (isStudent()) {
      return [
        ...baseItems,
        {
          title: '我的课程',
          icon: GraduationCap,
          href: '/dashboard/student/courses',
          roles: ['student']
        },
        {
          title: '我的作业',
          icon: FileText,
          href: '/dashboard/student/assignments',
          roles: ['student']
        },
        {
          title: '我的成绩',
          icon: BarChart3,
          href: '/dashboard/student/gradebook',
          roles: ['student']
        },
        {
          title: '重评申请',
          icon: FileText,
          href: '/dashboard/student/regrade',
          roles: ['student']
        },
        {
          title: '我的考试',
          icon: FileCheck,
          href: '/dashboard/student/exams',
          roles: ['student']
        },
        {
          title: 'AI 助手',
          icon: Bot,
          href: '/dashboard/student/chatbot',
          roles: ['student']
        }
      ];
    }

    if (isAdmin()) {
      return [
        ...baseItems,
        {
          title: '用户管理',
          icon: Users,
          href: '/dashboard/admin/users',
          roles: ['admin']
        },
        {
          title: '课程管理',
          icon: GraduationCap,
          href: '/dashboard/admin/courses',
          roles: ['admin']
        },
        {
          title: '安全设置',
          icon: Shield,
          href: '/dashboard/admin/security',
          roles: ['admin']
        },
        {
          title: 'AI 配置',
          icon: Bot,
          href: '/dashboard/admin/ai',
          roles: ['admin']
        },
        {
          title: '系统设置',
          icon: Settings,
          href: '/dashboard/admin/settings',
          roles: ['admin']
        }
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">DeepRubric</h2>
              <p className="text-xs text-gray-500">智能评分系统</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {isAdmin() ? '管理员' : isProfessor() ? '教授' : isTA() ? '助教' : isStudent() ? '学生' : '用户'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <a
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">设置</span>
            </a>
            <button
              onClick={() => window.location.href = '/auth/logout'}
              className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">退出登录</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}