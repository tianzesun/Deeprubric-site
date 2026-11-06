'use client';

import React, { useState } from 'react';
import { CalendarClock, Loader2 } from 'lucide-react';

// Booking page for the 30-minute meeting; NEXT_PUBLIC_CALENDLY_URL can override it per deployment
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/aydenait/30min';

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_STYLES = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

let widgetPromise: Promise<void> | null = null;

// Calendly's widget is only fetched on the first click, so it never affects page load
function loadCalendlyWidget(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (widgetPromise) return widgetPromise;

  widgetPromise = new Promise<void>((resolve, reject) => {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = WIDGET_STYLES;
    document.head.appendChild(styles);

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      widgetPromise = null;
      script.remove();
      reject(new Error('Calendly widget failed to load'));
    };
    document.body.appendChild(script);
  });

  return widgetPromise;
}

interface CalendlyButtonProps {
  label?: string;
  className?: string;
}

export const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  label = 'Book a 30-min Call',
  className = 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const openScheduler = async () => {
    setIsLoading(true);
    try {
      await loadCalendlyWidget();
      window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
    } catch {
      // Widget blocked (e.g. by an ad blocker): fall back to Calendly's own page
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="button" onClick={openScheduler} disabled={isLoading} aria-haspopup="dialog" className={className}>
      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CalendarClock size={18} />}
      {label}
    </button>
  );
};
