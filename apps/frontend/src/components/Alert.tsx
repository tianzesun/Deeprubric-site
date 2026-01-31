'use client';

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  X,
  Loader2
} from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  className?: string;
  onDismiss?: () => void;
  showIcon?: boolean;
  variant?: 'default' | 'subtle';
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  className = '',
  onDismiss,
  showIcon = true,
  variant = 'default'
}) => {
  const getAlertColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: variant === 'default' ? 'bg-green-50' : 'bg-green-50/50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <CheckCircle2 size={20} className="text-green-600" />,
          iconBg: 'bg-green-100'
        };
      case 'error':
        return {
          bg: variant === 'default' ? 'bg-red-50' : 'bg-red-50/50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <XCircle size={20} className="text-red-600" />,
          iconBg: 'bg-red-100'
        };
      case 'warning':
        return {
          bg: variant === 'default' ? 'bg-yellow-50' : 'bg-yellow-50/50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: <AlertCircle size={20} className="text-yellow-600" />,
          iconBg: 'bg-yellow-100'
        };
      case 'info':
        return {
          bg: variant === 'default' ? 'bg-blue-50' : 'bg-blue-50/50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <Info size={20} className="text-blue-600" />,
          iconBg: 'bg-blue-100'
        };
      case 'loading':
        return {
          bg: variant === 'default' ? 'bg-indigo-50' : 'bg-indigo-50/50',
          border: 'border-indigo-200',
          text: 'text-indigo-800',
          icon: <Loader2 size={20} className="text-indigo-600 animate-spin" />,
          iconBg: 'bg-indigo-100'
        };
    }
  };

  const colors = getAlertColors();

  return (
    <div className={`
      ${colors.bg} 
      ${colors.border} 
      ${colors.text} 
      rounded-xl 
      p-4 
      border
      ${className}
    `}>
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className={`
            flex-shrink-0 
            w-8 h-8 
            rounded-full 
            flex 
            items-center 
            justify-center
            ${colors.iconBg}
          `}>
            {colors.icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          {message && (
            <p className="text-sm mt-1 opacity-80">{message}</p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Dismiss alert"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

// Simple alert variants for quick usage
export const SuccessAlert: React.FC<Omit<AlertProps, 'type'>> = (props) => (
  <Alert {...props} type="success" />
);

export const ErrorAlert: React.FC<Omit<AlertProps, 'type'>> = (props) => (
  <Alert {...props} type="error" />
);

export const WarningAlert: React.FC<Omit<AlertProps, 'type'>> = (props) => (
  <Alert {...props} type="warning" />
);

export const InfoAlert: React.FC<Omit<AlertProps, 'type'>> = (props) => (
  <Alert {...props} type="info" />
);

export const LoadingAlert: React.FC<Omit<AlertProps, 'type'>> = (props) => (
  <Alert {...props} type="loading" />
);