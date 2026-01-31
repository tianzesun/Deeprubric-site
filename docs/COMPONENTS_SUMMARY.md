# DeepRubric Component Library

This document provides a comprehensive overview of all the reusable components created for the DeepRubric application.

## Navigation Components

### Header (`components/Header.tsx`)
A comprehensive navigation header with:
- **Logo**: Gradient "DeepRubric" with Sparkles icon
- **Navigation**: Products dropdown, Security, Compliance, Support links
- **CTA Button**: "Get Started" with gradient styling
- **Mobile Support**: Hamburger menu with collapsible navigation
- **Features**: Smooth animations, responsive design, accessibility

**Usage:**
```tsx
import { Header } from '../components/Header';

function App() {
  return (
    <>
      <Header />
      {/* Main content */}
    </>
  );
}
```

### Footer (`components/Footer.tsx`)
A professional footer component with:
- **Brand Display**: "DeepRubric" with motion animations
- **Navigation Links**: Privacy Policy, Terms of Service, Security
- **Enhanced Styling**: Gradient background and hover effects
- **Responsive Design**: Works on desktop and mobile

**Usage:**
```tsx
import { Footer } from '../components/Footer';

function App() {
  return (
    <>
      {/* Main content */}
      <Footer />
    </>
  );
}
```

## Notification System

### ToastProvider (`components/ToastProvider.tsx`)
A comprehensive toast notification system with:
- **Context API**: Global state management for notifications
- **Auto-dismissal**: Configurable duration for each toast
- **Multiple Types**: Success, Error, Warning, Info
- **Positioning**: Top-right corner with smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

**Usage:**
```tsx
import { ToastProvider, useToast } from '../components/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function YourComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  
  const handleSubmit = () => {
    showSuccess('Success!', 'Your action was completed.', 5000);
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
}
```

### Alert (`components/Alert.tsx`)
Inline alert components for immediate feedback:
- **Multiple Types**: Success, Error, Warning, Info, Loading
- **Variants**: Default and subtle styles
- **Dismissible**: Optional close button
- **Icon Support**: Automatic icon selection based on type
- **Flexible**: Can be used anywhere in your component tree

**Usage:**
```tsx
import { Alert, SuccessAlert, ErrorAlert } from '../components/Alert';

function MyForm() {
  const [error, setError] = useState(null);
  
  return (
    <form>
      {error && (
        <ErrorAlert 
          title="Submission Failed" 
          message={error} 
          onDismiss={() => setError(null)}
        />
      )}
      {/* Form fields */}
    </form>
  );
}
```

### StatusBadge (`components/StatusBadge.tsx`)
Status indicator badges for showing state:
- **Multiple Types**: Success, Error, Warning, Info, Pending, Processing, Default
- **Sizes**: Small, Medium, Large
- **Pulsing Animation**: Optional for active states
- **Icon Support**: Automatic icon selection
- **Flexible Styling**: Can be customized with className

**Usage:**
```tsx
import { StatusBadge, SuccessBadge, ProcessingBadge } from '../components/StatusBadge';

function StatusDisplay() {
  return (
    <div>
      <SuccessBadge label="Completed" />
      <ProcessingBadge label="Syncing..." pulse />
      <StatusBadge type="warning" label="Pending Review" size="lg" />
    </div>
  );
}
```

### NotificationBell (`components/NotificationBell.tsx`)
Interactive notification bell for headers:
- **Dropdown Menu**: Shows list of notifications
- **Unread Count**: Visual indicator for new notifications
- **Time Formatting**: Smart time display (Just now, 5m ago, etc.)
- **Actions**: Mark as read, clear all, dismiss individual
- **Click Outside**: Auto-close when clicking outside

**Usage:**
```tsx
import { NotificationBell } from '../components/NotificationBell';

function Header() {
  const notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Assignment Graded',
      message: 'Your submission has been graded.',
      timestamp: new Date(),
      read: false
    }
  ];
  
  return (
    <header>
      {/* Other header content */}
      <NotificationBell 
        notifications={notifications}
        onNotificationClick={(n) => console.log(n)}
        onMarkAsRead={(id) => markAsRead(id)}
        onClearAll={() => clearAll()}
      />
    </header>
  );
}
```

## Utility Components

### FeatureCard (`components/FeatureCard.tsx`)
Reusable card component for showcasing features:
- **Icon Support**: Accepts icon type for visual enhancement
- **Animation**: Smooth entrance animations
- **Flexible Content**: Title and description
- **Consistent Styling**: Matches DeepRubric design system

**Usage:**
```tsx
import { FeatureCard } from '../components/FeatureCard';

function FeaturesSection() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FeatureCard title="AI Grading" description="Intelligent grading system" iconType="brain" index={0} />
      <FeatureCard title="Rubric Builder" description="Create custom rubrics" iconType="edit" index={1} />
    </div>
  );
}
```

### ScrollHint (`components/ScrollHint.tsx`)
Visual hint for scrolling content:
- **Animated Arrow**: Downward pointing arrow with bounce animation
- **Text Label**: Configurable hint text
- **Accessibility**: Proper ARIA labels

**Usage:**
```tsx
import { ScrollHint } from '../components/ScrollHint';

function HeroSection() {
  return (
    <section>
      {/* Hero content */}
      <ScrollHint text="Explore Features" />
    </section>
  );
}
```

### ContactForm (`components/ContactForm.tsx`)
Professional contact form with:
- **Form Validation**: Client-side validation
- **Loading States**: Visual feedback during submission
- **Error Handling**: Clear error messages
- **Success States**: Confirmation after successful submission
- **Accessibility**: Proper form labels and structure

**Usage:**
```tsx
import { ContactForm } from '../components/ContactForm';

function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

## Example and Demo

### NotificationExample (`components/NotificationExample.tsx`)
Comprehensive demo of the notification system:
- **Interactive Examples**: Live demonstrations of all components
- **Usage Instructions**: Code examples and best practices
- **Action Buttons**: Add, clear, and manage notifications
- **Complete Integration**: Shows how all components work together

**Usage:**
```tsx
import { NotificationExample } from '../components/NotificationExample';

// Use for development and testing
function DevelopmentPage() {
  return <NotificationExample />;
}
```

## Integration Guide

### 1. Wrap Your App with ToastProvider
```tsx
// app/layout.tsx or main App component
import { ToastProvider } from '../components/ToastProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Use Components Throughout Your App
```tsx
// Any component
import { useToast } from '../components/ToastProvider';
import { Header, Footer } from '../components';

export default function Page() {
  const { showSuccess } = useToast();
  
  return (
    <>
      <Header />
      <main>
        {/* Your page content */}
      </main>
      <Footer />
    </>
  );
}
```

### 3. Component Hierarchy
```
App
├── ToastProvider (wraps entire app)
├── Header (navigation)
├── Main Content
│   ├── FeatureCard (feature displays)
│   ├── Alert (inline notifications)
│   ├── StatusBadge (status indicators)
│   └── ContactForm (contact functionality)
├── NotificationBell (in header)
└── Footer (site footer)
```

## Design System Integration

All components follow DeepRubric's design system:
- **Colors**: Consistent color palette (indigo, emerald, purple gradients)
- **Typography**: Inter and Space Grotesk fonts
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and entrance animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Mobile-first responsive design

## Best Practices

1. **Toast Usage**: Use for transient feedback, not critical information
2. **Alert Usage**: Use for important inline messages that require attention
3. **Badge Usage**: Use for status indicators and quick information
4. **Notification Bell**: Use for time-sensitive notifications
5. **Consistent Styling**: Always use the provided components for consistency

## Future Enhancements

Potential components to consider adding:
- **Modal/Dialog System**: For confirmations and forms
- **Loading Spinner**: For async operations
- **Progress Bar**: For uploads and long operations
- **Table Component**: For data display
- **Form Components**: Input, Select, Checkbox, Radio
- **Chart Components**: For analytics and data visualization
- **File Upload**: For assignment submissions
- **User Avatar**: For user profiles and notifications