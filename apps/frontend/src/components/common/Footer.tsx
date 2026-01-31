import React from 'react';
import Button from '@/components/ui/Button';
import { 
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: '首页', href: '/' },
    { title: '关于我们', href: '/about' },
    { title: '帮助中心', href: '/help' },
    { title: '隐私政策', href: '/privacy' },
    { title: '服务条款', href: '/terms' }
  ];

  const supportLinks = [
    { title: '技术支持', href: '/support' },
    { title: '用户指南', href: '/guide' },
    { title: '常见问题', href: '/faq' },
    { title: '反馈建议', href: '/feedback' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">DeepRubric</h3>
                <p className="text-gray-400 text-sm">智能评分系统</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              为教育机构提供智能化的作业评分和成绩管理解决方案，提升教学效率和学习体验。
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>北京市海淀区中关村</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+86 10 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@deeprubric.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">支持服务</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">订阅我们</h4>
            <p className="text-gray-400 text-sm mb-4">
              获取最新的产品更新和教育技术资讯。
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="您的邮箱地址"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                订阅
              </Button>
            </div>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} DeepRubric. 保留所有权利。
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>京ICP备12345678号</span>
              <span>•</span>
              <span>京公网安备11010802012345号</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}