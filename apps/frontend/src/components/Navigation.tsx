"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Tag,
  HelpCircle,
  Shield,
  Settings,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

const navigationItems = [
  { name: 'Features', href: '/features', icon: GraduationCap },
  { name: 'Pricing', href: '/pricing', icon: Tag },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Support', href: '/support', icon: Settings },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">D</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-900 dark:text-white">DeepRubric</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Professional Grading</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    active
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
            >
              Request Demo
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
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
        <div id="mobile-menu" className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    active
                      ? 'text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-900'
                      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
            <div className="px-4 pt-3">
              <Link
                href="/#contact"
                className="block w-full text-center bg-indigo-600 text-white px-4 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
