'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  X,
  Bell
} from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { ...toastData, id };
    
    setToasts(prev => [...prev, toast]);

    // Auto-remove toast after duration
    const duration = toastData.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((title: string, message?: string, duration?: number) => {
    addToast({ type: 'success', title, message, duration });
  }, [addToast]);

  const showError = useCallback((title: string, message?: string, duration?: number) => {
    addToast({ type: 'error', title, message, duration });
  }, [addToast]);

  const showWarning = useCallback((title: string, message?: string, duration?: number) => {
    addToast({ type: 'warning', title, message, duration });
  }, [addToast]);

  const showInfo = useCallback((title: string, message?: string, duration?: number) => {
    addToast({ type: 'info', title, message, duration });
  }, [addToast]);

  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={20} className="text-green-500" />;
      case 'error': return <XCircle size={20} className="text-red-500" />;
      case 'warning': return <AlertCircle size={20} className="text-yellow-500" />;
      case 'info': return <Info size={20} className="text-blue-500" />;
    }
  };

  const getToastColors = (type: ToastType) => {
    switch (type) {
      case 'success': return {
        bg: 'bg-white border border-green-100',
        shadow: 'shadow-lg shadow-green-500/10',
        title: 'text-green-800',
        message: 'text-green-600'
      };
      case 'error': return {
        bg: 'bg-white border border-red-100',
        shadow: 'shadow-lg shadow-red-500/10',
        title: 'text-red-800',
        message: 'text-red-600'
      };
      case 'warning': return {
        bg: 'bg-white border border-yellow-100',
        shadow: 'shadow-lg shadow-yellow-500/10',
        title: 'text-yellow-800',
        message: 'text-yellow-600'
      };
      case 'info': return {
        bg: 'bg-white border border-blue-100',
        shadow: 'shadow-lg shadow-blue-500/10',
        title: 'text-blue-800',
        message: 'text-blue-600'
      };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const colors = getToastColors(toast.type);
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`${colors.bg} ${colors.shadow} rounded-2xl p-4 border backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getToastIcon(toast.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm ${colors.title}`}>
                    {toast.title}
                  </h3>
                  {toast.message && (
                    <p className={`text-sm mt-1 ${colors.message} leading-relaxed`}>
                      {toast.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close notification"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Simple hook for quick toast usage without provider
export const useSimpleToast = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  
  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
  };
};