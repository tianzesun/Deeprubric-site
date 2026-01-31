'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X,
  ArrowRight,
  Zap,
  Users,
  Brain
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Products', href: '#', dropdown: [
      { name: 'For Professors', href: '/professor/dashboard', icon: Brain },
      { name: 'For Graders', href: '/grader/dashboard', icon: Users },
      { name: 'For Students', href: '/student/dashboard', icon: Zap }
    ]},
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Support', href: '/support' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <Link href="/">
              <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
                DeepRubric
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {item.dropdown ? (
                  <>
                    <button className="text-sm font-black text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all relative group">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <subItem.icon size={16} className="text-indigo-500" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-black text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/login"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-700"
        >
          <div className="py-4 space-y-2">
            {navigation.map((item, index) => (
              <div key={item.name} className="space-y-1">
                {item.dropdown ? (
                  <>
                    <button className="w-full text-left px-4 py-3 text-sm font-black text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                      {item.name}
                    </button>
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <subItem.icon size={16} className="text-indigo-500" />
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-black text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
              <Link
                href="/login"
                className="block mx-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-black text-sm text-center hover:from-indigo-700 hover:to-purple-700 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};