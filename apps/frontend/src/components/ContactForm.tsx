'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Send, Loader2, CheckCircle2, Building2, User, Mail } from 'lucide-react';
import { submitContactForm, type ContactFormState } from '../app/actions/contact';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Sending...
        </>
      ) : (
        <>
          Request Demo <Send size={18} />
        </>
      )}
    </button>
  );
}

export const ContactForm: React.FC = () => {
  const [state, formAction] = useActionState(submitContactForm, null);

  if (state?.success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-6">
          We've received your request and will be in touch within 24 hours.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 border border-slate-200 rounded-lg text-indigo-600 font-medium text-sm hover:bg-slate-50 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const fieldErrors = state?.fieldErrors ?? {};
  const inputClass = (field: keyof NonNullable<ContactFormState['fieldErrors']>) =>
    `w-full bg-slate-50 border ${
      fieldErrors[field] ? 'border-red-400' : 'border-slate-200'
    } rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400`;
  const fieldError = (field: keyof NonNullable<ContactFormState['fieldErrors']>) =>
    fieldErrors[field] && (
      <p id={`contact-${field}-error`} className="text-xs text-red-600">
        {fieldErrors[field]}
      </p>
    );
  const errorProps = (field: keyof NonNullable<ContactFormState['fieldErrors']>) => ({
    'aria-invalid': fieldErrors[field] ? true : undefined,
    'aria-describedby': fieldErrors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      )}

      {/* Honeypot field: hidden from people and assistive tech, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="contact-fullName" className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <User size={14} aria-hidden="true" /> Full Name
        </label>
        <input 
          id="contact-fullName"
          required 
          type="text" 
          name="fullName"
          autoComplete="name"
          maxLength={120}
          defaultValue={state?.values?.fullName}
          placeholder="Enter your name" 
          className={inputClass('fullName')}
          {...errorProps('fullName')}
        />
        {fieldError('fullName')}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-institution" className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Building2 size={14} aria-hidden="true" /> Institution
        </label>
        <input 
          id="contact-institution"
          required 
          type="text" 
          name="institution"
          autoComplete="organization"
          maxLength={200}
          defaultValue={state?.values?.institution}
          placeholder="University or organization name" 
          className={inputClass('institution')}
          {...errorProps('institution')}
        />
        {fieldError('institution')}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Mail size={14} aria-hidden="true" /> Email Address
        </label>
        <input 
          id="contact-email"
          required 
          type="email" 
          name="email"
          autoComplete="email"
          maxLength={254}
          defaultValue={state?.values?.email}
          placeholder="your.email@institution.edu" 
          className={inputClass('email')}
          {...errorProps('email')}
        />
        {fieldError('email')}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
          How can we help?
        </label>
        <textarea 
          id="contact-message"
          required 
          name="message"
          rows={4} 
          maxLength={5000}
          defaultValue={state?.values?.message}
          placeholder="Tell us about your assessment needs, the size of your institution, or any questions you have..." 
          className={`${inputClass('message')} resize-none`}
          {...errorProps('message')}
        />
        {fieldError('message')}
      </div>

      <SubmitButton />
      
      <p className="text-xs text-slate-500 text-center">
        By submitting, you agree to our{' '}
        <Link href="/privacy" className="underline hover:text-indigo-600">privacy policy</Link>.
        {' '}We'll never share your information.
      </p>
    </form>
  );
};