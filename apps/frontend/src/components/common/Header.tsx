import React from 'react';
import Button from '@/components/ui/Button';
import { 
  GraduationCap, 
  Settings, 
  Menu
} from 'lucide-react';

interface HeaderProps {
  onSidebarToggle?: () => void;
  showSidebarToggle?: boolean;
}

export default function Header({ onSidebarToggle, showSidebarToggle = false }: HeaderProps) {

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
            <a href="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Features
            </a>
            <a href="/security" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Security
            </a>
            <a href="/compliance" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Compliance
            </a>
            <a href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Support
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}