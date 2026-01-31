"use client";

import React from 'react';
import { 
  Home, 
  GraduationCap, 
  Users, 
  Shield, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: GraduationCap },
    { name: 'Compliance', href: '/compliance', icon: Shield },
    { name: 'Support', href: '/support', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">D</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">DeepRubric</h1>
                <p className="text-xs text-slate-500">Professional Grading</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors duration-200"
                >
                  <Icon size={18} className="mr-2" />
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="/features"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white border-t border-slate-200">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};