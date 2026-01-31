'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LockKeyhole, Eye, Fingerprint, DatabaseBackup, Globe2, Users2, CalendarCheck, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyCard = ({ 
  title, 
  description, 
  href, 
  readTime, 
  icon,
  index = 0
}: { 
  title: string; 
  description: string; 
  href: string; 
  readTime: string; 
  icon: React.ReactNode; 
  index?: number;
}) => {
  return (
    <motion.a 
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {readTime}
        </span>
      </div>
      <p className="text-slate-600 leading-relaxed mb-6">
        {description}
      </p>
      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
        View Document →
      </span>
    </motion.a>
  );
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full mb-8">
            <Shield size={20} />
            <span className="text-sm font-semibold uppercase tracking-wide">Data Protection</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is our highest priority. We implement military-grade encryption and zero-knowledge architecture to protect your educational data.
          </p>
        </div>
      </section>

      {/* Document Grid */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PrivacyCard
            title="Information We Collect"
            description="We collect information to provide better services while maintaining strict privacy standards and FERPA compliance."
            href="#information-collect"
            readTime="3 MIN READ"
            icon={<LockKeyhole size={24} className="text-indigo-600" />}
            index={0}
          />
          
          <PrivacyCard
            title="How We Use Your Information"
            description="Your data is used exclusively to improve our services and ensure platform security and compliance."
            href="#how-use"
            readTime="2 MIN READ"
            icon={<Eye size={24} className="text-indigo-600" />}
            index={1}
          />
          
          <PrivacyCard
            title="Data Security Measures"
            description="Military-grade encryption and zero-knowledge architecture ensure your data remains completely secure."
            href="#data-security"
            readTime="4 MIN READ"
            icon={<Fingerprint size={24} className="text-indigo-600" />}
            index={2}
          />
        </div>

        {/* Privacy Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <Shield size={24} className="text-indigo-600" />
              Data Protection
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <DatabaseBackup size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Zero-Knowledge Architecture</h3>
                  <p className="text-slate-600">We cannot access your data without your explicit permission. Your educational records remain completely private.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Globe2 size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Global Compliance</h3>
                  <p className="text-slate-600">Full compliance with FERPA, GDPR, and other international data protection regulations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users2 size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">User Rights</h3>
                  <p className="text-slate-600">Complete control over your data with rights to access, rectify, delete, and port your information.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <AlertCircle size={24} className="text-amber-500" />
              Security Standards
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Data Retention</h3>
                  <p className="text-slate-600">We retain data only as long as necessary and comply with all legal and regulatory requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <UserCheck size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cookie Management</h3>
                  <p className="text-slate-600">Full control over tracking technologies with transparent cookie policies and opt-out options.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <AlertCircle size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Third-Party Services</h3>
                  <p className="text-slate-600">Strict vetting of all third-party services with comprehensive data protection agreements.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Privacy Questions?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Our privacy team is available to answer questions about data protection, 
            compliance requirements, and your privacy rights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Contact Privacy Team
            </a>
            <span className="text-slate-500 text-sm font-medium self-center">
              Available for enterprise and institutional partners
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
