# Dashboard Navigation System

This implementation provides a role-based dashboard navigation system for the DeepRubric application.

## Files Created

### 1. Navigation Configuration (`apps/frontend/config/dashboard-nav.ts`)
- Centralized configuration for all navigation items
- Role-based menu structure (ADMIN, TEACHER, GRADER, STUDENT)
- Uses Lucide React icons for consistent UI

### 2. Sidebar Component (`apps/frontend/components/dashboard/Sidebar.tsx`)
- Dynamic sidebar that renders based on user role
- Active link highlighting
- Fixed positioning for consistent UX
- Settings link always available

### 3. Dashboard Layout (`apps/frontend/app/dashboard/layout.tsx`)
- Wraps all dashboard pages with consistent sidebar
- Placeholder for user profile dropdown
- Responsive layout with proper spacing

### 4. Dashboard Page (`apps/frontend/app/dashboard/page.tsx`)
- Course card grid layout with role-based navigation
- Interactive course cards with hover effects
- Role badges for clear user identification
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Mock data structure for course enrollments

### 5. Rubric Builder Component (`apps/frontend/components/dashboard/RubricBuilder.tsx`)
- Toggle between Simple Mode and Matrix Mode for different user needs
- Simple Mode: Basic criterion list with title, description, and points
- Matrix Mode: Professional grid-based rubric with level descriptions
- Real-time point total tracking and automatic rebalancing
- AI suggestion integration for criterion generation
- Dynamic criteria management (add/remove/update)
- Professional table layout with hover effects and focus states

### 6. Rubric Matrix Component (`apps/frontend/components/dashboard/RubricMatrix.tsx`)
- Hierarchical grid UI with Header + Criteria Rows + Level Columns
- Dynamic level management (add/remove level columns)
- Per-level descriptions for each performance tier
- AI description generation for level descriptions
- Horizontal scrolling for wide matrices
- Real-time level label and point updates
- Professional table design with rounded corners and shadows

### 6. Rubrics Page (`apps/frontend/app/dashboard/rubrics/page.tsx`)
- Dedicated page for rubric management
- Integration point for the RubricBuilder component
- Ready for backend API integration

## Features

- **Role-Based Navigation**: Different menu items based on user role
- **Active Link Highlighting**: Current page is visually highlighted
- **Consistent UX**: Sidebar remains fixed while content changes
- **Type Safety**: Full TypeScript support
- **Accessibility**: Proper semantic HTML and ARIA attributes

## Usage

The dashboard layout automatically applies to all pages in the `/dashboard` route. To use:

1. Ensure user role is available in your AuthContext
2. Update the `userRole` in `layout.tsx` to fetch from your auth state
3. Create additional dashboard pages as needed

## Extending

To add new roles or menu items:

1. Update `NAV_ITEMS` in `dashboard-nav.ts`
2. Add new routes as needed
3. Create corresponding page components

## Dependencies

- `clsx`: For conditional CSS classes
- `lucide-react`: For icons
- `next/navigation`: For route detection