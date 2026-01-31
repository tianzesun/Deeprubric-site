'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, FileCheck, UserCheck, CalendarCheck, DollarSign, AlertCircle } from 'lucide-react';

const TermsCard = ({ 
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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full mb-8">
            <Scale size={20} />
            <span className="text-sm font-semibold uppercase tracking-wide">Legal Framework</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
            Terms of Service
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to transparency and your rights as a user. DeepRubric operates with integrity and respect for all users.
          </p>
        </div>
      </section>

      {/* Document Grid */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <TermsCard
            title="Acceptance of Terms"
            description="By accessing or using the DeepRubric platform, you agree to be bound by these Terms of Service and all applicable laws."
            href="#acceptance-terms"
            readTime="2 MIN READ"
            icon={<Gavel size={24} className="text-indigo-600" />}
            index={0}
          />
          
          <TermsCard
            title="Description of Service"
            description="DeepRubric provides an Intelligent Grading Platform designed for academic institutions and educators worldwide."
            href="#description-service"
            readTime="3 MIN READ"
            icon={<FileCheck size={24} className="text-indigo-600" />}
            index={1}
          />
          
          <TermsCard
            title="Account Registration"
            description="To access certain features, you must register for an account with accurate and complete information."
            href="#account-registration"
            readTime="1 MIN READ"
            icon={<UserCheck size={24} className="text-indigo-600" />}
            index={2}
          />
        </div>

        {/* Terms Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <Scale size={24} className="text-indigo-600" />
              User Rights
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <UserCheck size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Account Security</h3>
                  <p className="text-slate-600">You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <UserCheck size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Academic Integrity</h3>
                  <p className="text-slate-600">Users must uphold the academic integrity policies of their respective institutions when using our platform.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Institutional Use</h3>
                  <p className="text-slate-600">We support institutional deployments with enterprise-grade security and compliance features.</p>
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
              Legal Protections
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Service Modifications</h3>
                  <p className="text-slate-600">We reserve the right to modify or discontinue any feature of the service at any time with advance notice.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <DollarSign size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fee Structure</h3>
                  <p className="text-slate-600">Certain features may require payment. All fees are non-refundable unless otherwise stated in writing.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <AlertCircle size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Limitation of Liability</h3>
                  <p className="text-slate-600">We provide the service "as is" and are not liable for indirect, incidental, or consequential damages.</p>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need Legal Assistance?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Our legal team is available to answer questions about our terms of service, 
            institutional agreements, and compliance requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Contact Legal Team
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
