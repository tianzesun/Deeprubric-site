'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  CircleDot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationBellProps {
  notifications?: Notification[];
  maxNotifications?: number;
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onClearAll?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications = [],
  maxNotifications = 5,
  onNotificationClick,
  onMarkAsRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const newNotifications = notifications.filter(n => !n.read);
    setHasNewNotifications(newNotifications.length > 0);
  }, [notifications]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'error': return <AlertCircle size={16} className="text-red-600" />;
      case 'warning': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'info': return <CircleDot size={16} className="text-blue-600" />;
    }
  };

  const getNotificationColors = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        {hasNewNotifications ? (
          <BellRing size={20} className="text-indigo-600" />
        ) : (
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        )}
        
        {/* Notification Dot */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">{unreadCount}</span>
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.slice(0, maxNotifications).map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      ${getNotificationColors(notification.type)}
                      ${!notification.read ? 'border-l-4 border-indigo-500' : ''}
                      p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0
                      hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                      cursor-pointer
                    `}
                    onClick={() => {
                      onNotificationClick?.(notification);
                      if (!notification.read && onMarkAsRead) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead?.(notification.id);
                              }}
                              className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead?.(notification.id);
                        }}
                        className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
                        aria-label="Dismiss notification"
                      >
                        <X size={16} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > maxNotifications && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
                <button className="w-full text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Mock notification data for testing
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Assignment Graded',
    message: 'Your submission for CS101 Assignment 3 has been graded.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'New Rubric Available',
    message: 'A new rubric has been created for your course.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'Assignment 4 is due in 2 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Upload Failed',
    message: 'Failed to upload your assignment. Please try again.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true
  }
];