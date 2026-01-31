'use client';

import React, { useState } from 'react';
import { useToast, useSimpleToast } from './ToastProvider';
import { Alert, SuccessAlert, ErrorAlert, WarningAlert, InfoAlert } from './Alert';
import { StatusBadge, SuccessBadge, ErrorBadge, WarningBadge, InfoBadge, ProcessingBadge } from './StatusBadge';
import { NotificationBell, mockNotifications } from './NotificationBell';
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  CircleDot,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';

export const NotificationExample: React.FC = () => {
  const { addToast, showSuccess, showError, showWarning, showInfo } = useToast();
  const simpleToast = useSimpleToast();
  const [notifications, setNotifications] = useState(mockNotifications);

  const addRandomNotification = () => {
    const types: any = ['success', 'error', 'warning', 'info'];
    const type = types[Math.floor(Math.random() * types.length)];
    const titles = [
      'Assignment Graded',
      'New Message',
      'System Update',
      'Deadline Reminder',
      'File Uploaded'
    ];
    const messages = [
      'Your submission has been graded successfully.',
      'You have received a new message from your instructor.',
      'System maintenance scheduled for tonight.',
      'Assignment is due in 2 hours.',
      'File uploaded successfully to your course.'
    ];

    const newNotification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: titles[Math.floor(Math.random() * titles.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    showInfo('New notification added', 'Check the notification bell for details.');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showSuccess('All notifications cleared');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showSuccess('All notifications marked as read');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notification System Demo</h1>
        <p className="text-gray-600 dark:text-gray-300">Explore DeepRubric's comprehensive notification system</p>
      </div>

      {/* Header with Notification Bell */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Header Example</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">With notification bell</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell
              notifications={notifications}
              onNotificationClick={(n) => console.log('Clicked:', n)}
              onMarkAsRead={(id) => setNotifications(prev => 
                prev.map(n => n.id === id ? { ...n, read: true } : n)
              )}
              onClearAll={clearAllNotifications}
            />
            <button
              onClick={addRandomNotification}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={16} />
              Add Notification
            </button>
          </div>
        </div>
      </div>

      {/* Toast Examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Toast Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => showSuccess('Success!', 'Your action was completed successfully.', 3000)}
            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <CheckCircle2 className="text-green-600" />
            <div>
              <div className="font-medium text-green-800">Success Toast</div>
              <div className="text-sm text-green-600">3 second duration</div>
            </div>
          </button>
          
          <button
            onClick={() => showError('Error!', 'Something went wrong. Please try again.', 5000)}
            className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <AlertCircle className="text-red-600" />
            <div>
              <div className="font-medium text-red-800">Error Toast</div>
              <div className="text-sm text-red-600">5 second duration</div>
            </div>
          </button>
          
          <button
            onClick={() => showWarning('Warning!', 'Please review your submission before submitting.', 4000)}
            className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <AlertCircle className="text-yellow-600" />
            <div>
              <div className="font-medium text-yellow-800">Warning Toast</div>
              <div className="text-sm text-yellow-600">4 second duration</div>
            </div>
          </button>
          
          <button
            onClick={() => showInfo('Info!', 'New features are available in your dashboard.', 6000)}
            className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CircleDot className="text-blue-600" />
            <div>
              <div className="font-medium text-blue-800">Info Toast</div>
              <div className="text-sm text-blue-600">6 second duration</div>
            </div>
          </button>
        </div>
      </div>

      {/* Alert Examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inline Alerts</h2>
        <div className="space-y-4">
          <SuccessAlert 
            title="Assignment Submitted Successfully" 
            message="Your assignment has been submitted and is now being processed by your instructor."
            onDismiss={() => console.log('Success alert dismissed')}
          />
          
          <ErrorAlert 
            title="Submission Failed" 
            message="There was an error submitting your assignment. Please check your internet connection and try again."
            onDismiss={() => console.log('Error alert dismissed')}
          />
          
          <WarningAlert 
            title="Deadline Approaching" 
            message="Your assignment is due in 2 hours. Please submit soon to avoid late penalties."
            onDismiss={() => console.log('Warning alert dismissed')}
          />
          
          <InfoAlert 
            title="New Feature Available" 
            message="A new rubric has been created for your course. Check your dashboard for details."
            onDismiss={() => console.log('Info alert dismissed')}
          />
          
          <Alert 
            type="loading" 
            title="Processing..." 
            message="Your file is being uploaded and processed. This may take a few moments."
          />
        </div>
      </div>

      {/* Status Badge Examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Simple Badges</h3>
            <div className="space-y-2">
              <SuccessBadge label="Completed" />
              <ErrorBadge label="Failed" />
              <WarningBadge label="Pending Review" />
              <InfoBadge label="In Progress" />
              <ProcessingBadge label="Processing" />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Large Badges</h3>
            <div className="space-y-2">
              <SuccessBadge label="Assignment Graded" size="lg" />
              <ErrorBadge label="Upload Failed" size="lg" />
              <WarningBadge label="Deadline Soon" size="lg" />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pulsing Badges</h3>
            <div className="space-y-2">
              <ProcessingBadge label="Syncing..." pulse />
              <WarningBadge label="System Update" pulse />
              <InfoBadge label="New Messages" pulse />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Action Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={addRandomNotification}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add Random Notification
          </button>
          
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle2 size={20} />
            Mark All Read
          </button>
          
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={20} />
            Clear All
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={20} />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Usage Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-90">
          <div>
            <h3 className="font-medium mb-2">Toast Provider</h3>
            <pre className="bg-black/20 p-3 rounded text-xs">
{`<ToastProvider>
  <YourApp />
</ToastProvider>`}
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">Toast Usage</h3>
            <pre className="bg-black/20 p-3 rounded text-xs">
{`const { showSuccess, showError } = useToast();
showSuccess('Title', 'Message', 5000);`}
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">Alert Usage</h3>
            <pre className="bg-black/20 p-3 rounded text-xs">
{`<Alert 
  type="success" 
  title="Success!" 
  message="Operation completed" 
/>`}
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">Badge Usage</h3>
            <pre className="bg-black/20 p-3 rounded text-xs">
{`<StatusBadge 
  type="success" 
  label="Completed" 
  size="md" 
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};