'use client';

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  CircleDot,
  Circle,
  Dot,
  Loader2
} from 'lucide-react';

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'pending' | 'processing' | 'default';

interface StatusBadgeProps {
  type: StatusType;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  label,
  size = 'md',
  showIcon = true,
  className = '',
  pulse = false
}) => {
  const getBadgeColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: <CheckCircle2 size={14} className="text-green-600" />,
          dot: <Dot size={8} className="text-green-600" />
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: <XCircle size={14} className="text-red-600" />,
          dot: <Dot size={8} className="text-red-600" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: <AlertCircle size={14} className="text-yellow-600" />,
          dot: <Dot size={8} className="text-yellow-600" />
        };
      case 'info':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: <CircleDot size={14} className="text-blue-600" />,
          dot: <Dot size={8} className="text-blue-600" />
        };
      case 'pending':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: <Clock size={14} className="text-gray-600" />,
          dot: <Dot size={8} className="text-gray-600" />
        };
      case 'processing':
        return {
          bg: 'bg-indigo-100',
          text: 'text-indigo-800',
          border: 'border-indigo-200',
          icon: <Loader2 size={14} className="text-indigo-600 animate-spin" />,
          dot: <Dot size={8} className="text-indigo-600" />
        };
      case 'default':
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-800',
          border: 'border-slate-200',
          icon: <Circle size={14} className="text-slate-600" />,
          dot: <Dot size={8} className="text-slate-600" />
        };
    }
  };

  const colors = getBadgeColors();

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={`
      ${colors.bg} 
      ${colors.border} 
      ${colors.text} 
      ${sizeClasses[size]}
      rounded-full 
      flex 
      items-center 
      gap-2 
      border
      ${pulse ? 'animate-pulse' : ''}
      ${className}
    `}>
      {showIcon && (
        <span className="flex-shrink-0">
          {colors.icon}
        </span>
      )}
      <span className="font-medium">{label}</span>
      {pulse && (
        <span className="flex-shrink-0">
          {colors.dot}
        </span>
      )}
    </div>
  );
};

// Simple status badge variants for quick usage
export const SuccessBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="success" />
);

export const ErrorBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="error" />
);

export const WarningBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="warning" />
);

export const InfoBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="info" />
);

export const PendingBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="pending" />
);

export const ProcessingBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="processing" />
);

export const DefaultBadge: React.FC<Omit<StatusBadgeProps, 'type'>> = (props) => (
  <StatusBadge {...props} type="default" />
);