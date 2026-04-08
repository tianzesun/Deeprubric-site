'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Markham standard dynamic header scroll thresholds
  const headerOpacity = useTransform(scrollY, [0, 80], [0.7, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 80], [8, 20]);
  const headerShadow = useTransform(scrollY, [0, 80], [0, 1]);
  const headerBorder = useTransform(scrollY, [0, 80], [0, 1]);

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Security', href: '/security' },
    { name: 'Support', href: '/support' }
  ];

  return (
    <motion.header 
      style={{
        backgroundColor: `rgba(var(--background-rgb), ${headerOpacity})`,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300"
      animate={{
        boxShadow: headerShadow.get() > 0.5 ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 0 0 0 rgb(0 0 0 / 0)',
        borderColor: headerBorder.get() > 0.5 ? 'rgba(148, 163, 184, 0.2)' : 'transparent'
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                DeepRubric
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-all shadow-sm"
            >
              Request Demo
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
          className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/#contact"
                className="block mx-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
