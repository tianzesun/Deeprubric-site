import React from 'react';
import { useAuth } from '@/features/auth/services/auth.service';
import Button from '@/components/ui/Button';
import { 
  GraduationCap, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  onSidebarToggle?: () => void;
  showSidebarToggle?: boolean;
}

export default function Header({ onSidebarToggle, showSidebarToggle = false }: HeaderProps) {
  const { user, logout, isAdmin, isProfessor, isTA, isStudent } = useAuth();

  const getRoleLabel = () => {
    if (isAdmin()) return '管理员';
    if (isProfessor()) return '教授';
    if (isTA()) return '助教';
    if (isStudent()) return '学生';
    return '用户';
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={onSidebarToggle}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DeepRubric</h1>
                <p className="text-xs text-gray-500">智能评分系统</p>
              </div>
            </div>
          </div>

          {/* Middle - Navigation (hidden on mobile) */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              首页
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              课程
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              作业
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              成绩
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{getRoleLabel()}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}