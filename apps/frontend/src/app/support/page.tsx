'use client';

import React, { useState } from 'react';
import { Headphones, Mail, Phone, MessageSquare, Clock, Shield, Users, Video, BookOpen, Globe, Star, Zap, CheckCircle, AlertCircle, HelpCircle, Calendar, ArrowRight, ExternalLink, LifeBuoy, Send } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

// Create a SendIcon component
const SendIcon = () => <Send size={16} />;

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const supportOptions = [
    {
      id: 'quick',
      title: 'Quick Help',
      icon: HelpCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        { title: 'Knowledge Base', desc: 'Self-service articles and guides', link: '/docs', icon: BookOpen },
        { title: 'FAQ', desc: 'Frequently asked questions', link: '/faq', icon: HelpCircle },
        { title: 'Video Tutorials', desc: 'Step-by-step video guides', link: '/videos', icon: Video },
        { title: 'Community Forum', desc: 'Connect with other users', link: '/community', icon: Users }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Support',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        { title: 'Live Chat', desc: 'Instant help from our team', link: '#chat', icon: MessageSquare, badge: '24/7' },
        { title: 'Email Support', desc: 'Detailed assistance via email', link: 'mailto:support@deeprubric.com', icon: Mail },
        { title: 'Phone Support', desc: 'Speak directly with support', link: 'tel:+15551234567', icon: Phone },
        { title: 'Schedule Call', desc: 'Book a consultation', link: '#schedule', icon: Calendar }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: [
        { title: 'Critical Issues', desc: 'System outages and urgent problems', link: 'tel:+15559990000', icon: AlertCircle, badge: '24/7' },
        { title: 'Security Issues', desc: 'Report security vulnerabilities', link: 'mailto:security@deeprubric.com', icon: Shield },
        { title: 'Business Hours', desc: 'Standard support during business hours', link: 'mailto:support@deeprubric.com', icon: Clock }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-white via-blue-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full mb-6 shadow-sm">
              <LifeBuoy size={20} className="animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Expert Support Team</span>
              <div className="flex -space-x-1">
                <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">
              We're Here to Help You Succeed
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our dedicated support team is ready to assist you with any questions or issues you may have.
              Whether you need technical help or guidance on best practices, we're just a message away.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-blue-600 mb-2">2-4 Hours</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-sm text-slate-600">Customer Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Live Chat Support</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-red-600 mb-2">5 Minutes</div>
              <div className="text-sm text-slate-600">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Email Support</h3>
                  <p className="text-slate-600 mb-2">support@deeprubric.com</p>
                  <p className="text-sm text-slate-500">Response time: 2-4 hours during business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Phone Support</h3>
                  <p className="text-slate-600 mb-2">+1 (555) 123-4567</p>
                  <p className="text-sm text-slate-500">Monday - Friday, 9 AM - 6 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Live Chat</h3>
                  <p className="text-slate-600 mb-2">Available in-app</p>
                  <p className="text-sm text-slate-500">24/7 automated support with human escalation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Emergency Support</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={20} className="text-red-600" />
                  <h3 className="font-semibold text-red-900">Critical Issues</h3>
                </div>
                <p className="text-red-700 text-sm mb-3">
                  For system outages or critical issues affecting your institution
                </p>
                <p className="text-red-600 font-mono text-lg">+1 (555) 999-0000</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-red-600" />
                  <h3 className="font-semibold text-red-900">After Hours</h3>
                </div>
                <p className="text-red-700 text-sm mb-3">
                  Emergency support available 24/7 for enterprise customers
                </p>
                <p className="text-red-600 font-mono text-lg">support@deeprubric.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Options Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How Can We Help You?</h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === option.id
                      ? `${option.bgColor} ${option.color} shadow-md`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {option.title}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions
              .find(option => activeTab === 'all' || option.id === activeTab)
              ?.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.link}
                    className="block bg-slate-50 rounded-lg p-6 hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mt-1">
                              <Zap size={12} />
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </a>
                );
              })}
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Quick Start</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Get up and running in minutes with our comprehensive setup guides.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
              Get Started →
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center">
                <Star size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Best Practices</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Learn how to get the most out of DeepRubric with our expert tips.
            </p>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center gap-2">
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Advanced Features</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Discover powerful features that will transform your grading workflow.
            </p>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-2">
              Explore →
            </a>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Support Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-blue-600" />
                <h3 className="font-semibold text-slate-900">Email & Chat</h3>
              </div>
              <p className="text-slate-600">Mon - Fri: 9 AM - 6 PM PST</p>
              <p className="text-slate-600">Weekends: Automated support</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-green-600" />
                <h3 className="font-semibold text-slate-900">Phone</h3>
              </div>
              <p className="text-slate-600">Mon - Fri: 9 AM - 6 PM PST</p>
              <p className="text-slate-600">Weekends: Emergency only</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={20} className="text-red-600" />
                <h3 className="font-semibold text-slate-900">Emergency</h3>
              </div>
              <p className="text-slate-600">24/7 for enterprise</p>
              <p className="text-slate-600">Business hours for all plans</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400 bg-white"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Assistance needed</option>
                  <option value="high">High - Urgent issue</option>
                  <option value="critical">Critical - System outage</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400 resize-vertical"
                placeholder="Please describe your issue in detail. Include any error messages, screenshots, or steps to reproduce the problem."
              ></textarea>
              <p className="text-xs text-slate-500 mt-1">Tip: The more details you provide, the faster we can help you!</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-600">
                <span className="font-medium">Response time:</span> {formData.priority === 'critical' ? '15 minutes' : formData.priority === 'high' ? '1 hour' : formData.priority === 'medium' ? '2-4 hours' : '24 hours'}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-2">
                  <SendIcon />
                  Send Message
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-600">5.0/5</span>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The support team resolved our grading system issue in under 30 minutes. Incredible service!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                <div>
                  <div className="font-semibold text-slate-900">Jessica Davis</div>
                  <div className="text-sm text-slate-600">University Professor</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-600">5.0/5</span>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Outstanding documentation and responsive support. DeepRubric has transformed our grading workflow."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">MR</div>
                <div>
                  <div className="font-semibold text-slate-900">Michael Rodriguez</div>
                  <div className="text-sm text-slate-600">Department Chair</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-600">5.0/5</span>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The 24/7 chat support is a lifesaver during finals week. Always helpful and knowledgeable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">SA</div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah Anderson</div>
                  <div className="text-sm text-slate-600">Teaching Assistant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
