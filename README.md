# DeepRubric - AI-Powered Grading System

A comprehensive, role-based grading system built with Next.js, TypeScript, and a modular architecture. DeepRubric provides an intuitive platform for professors, teaching assistants, students, and administrators to manage courses, assignments, and grading workflows.

## 🚀 Features

### Role-Based Access Control
- **Professors**: Create courses, manage assignments, grade submissions, view analytics
- **Teaching Assistants**: Assist with grading, review submissions, manage course sections
- **Students**: View courses, submit assignments, track progress, view grades
- **Administrators**: System management, user management, system health monitoring

### Core Functionality
- **Course Management**: Create and manage courses with enrollment capabilities
- **Assignment Management**: Create assignments with due dates, rubrics, and submission tracking
- **Grading System**: Comprehensive grading with review workflows and dispute resolution
- **Real-time Analytics**: Dashboard with system statistics and performance metrics
- **Responsive Design**: Mobile-first design that works across all devices

### Technical Highlights
- **Modular Architecture**: Feature-based organization with clear separation of concerns
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **Modern Stack**: Next.js 14+ with App Router, React 18, and Tailwind CSS
- **Performance Optimized**: Efficient state management and API integration
- **Developer Experience**: Hot reloading, linting, formatting, and comprehensive tooling

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context + Custom Hooks
- **Icons**: Lucide React
- **UI Components**: Custom component library

### Development Tools
- **Package Manager**: pnpm with workspace support
- **Linting**: ESLint with TypeScript and React rules
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Turbo for monorepo management

## 📁 Project Structure

```
DeepRubric/
├── apps/
│   ├── frontend/           # Next.js frontend application
│   └── backend/           # Python backend (existing)
├── packages/
│   └── ui/               # Shared UI component library
├── features/              # Feature-based modules
│   ├── auth/             # Authentication and authorization
│   ├── assignment/       # Assignment management
│   ├── course/           # Course management
│   ├── grading/          # Grading system
│   └── shared/           # Shared utilities and types
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── services/             # API service layer
├── types/               # TypeScript type definitions
└── docs/               # Documentation
```

## 🏗️ Architecture

### Feature-Based Organization
Each feature is self-contained with its own:
- **Types**: TypeScript interfaces and types
- **API**: API endpoints and request/response types
- **Services**: Business logic and API integration
- **Hooks**: React hooks for state management
- **Components**: Feature-specific UI components

### Role-Based Permissions
- **Auth Hooks**: `useAuth` provides user context and role checking
- **Permission Policies**: Centralized permission logic
- **Route Protection**: Automatic role-based route protection
- **UI Guards**: Component-level permission checks

### API Integration
- **Service Layer**: Clean abstraction over API calls
- **Error Handling**: Consistent error handling across the application
- **Loading States**: Comprehensive loading and error states
- **Caching**: Optimized data fetching and caching strategies

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+
- Python 3.10+ (for backend)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd DeepRubric
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create `.env.local` in the frontend directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

4. **Start the development server**
```bash
pnpm dev
```

5. **Access the application**
Open your browser and navigate to `http://localhost:3000`

### Backend Setup
The frontend connects to the existing Python backend. Ensure the backend is running:
```bash
# In the backend directory
cd apps/backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📖 Usage

### Authentication
The system uses JWT-based authentication. Users can:
- Sign up with email and password
- Log in with existing credentials
- Reset passwords via email
- Access role-specific dashboards

### Course Management
**Professors can:**
- Create new courses with details and descriptions
- Enroll students and teaching assistants
- Manage course settings and permissions
- View course analytics and statistics

**Students can:**
- View enrolled courses
- Access course materials and assignments
- Track progress and deadlines
- View grades and feedback

### Assignment Management
**Professors can:**
- Create assignments with due dates and instructions
- Set up rubrics and grading criteria
- View submission statistics
- Download and review submissions

**Students can:**
- View assignment details and requirements
- Submit assignments with file uploads
- Track submission status
- View grades and feedback

### Grading System
**Professors and TAs can:**
- Grade assignments using rubrics
- Provide detailed feedback
- Handle grade disputes and reviews
- Export grade reports
- View grading analytics

## 🔧 Development

### Adding New Features
1. Create a new feature directory under `apps/frontend/features/`
2. Follow the established pattern:
   - `types/` - TypeScript interfaces
   - `api/` - API endpoints
   - `services/` - Business logic
   - `hooks/` - React hooks
   - `components/` - UI components

3. Update the main navigation and routing as needed
4. Add appropriate permissions and role checks

### Component Development
Components are organized by feature and shared functionality:
- Feature-specific components in `features/[feature]/components/`
- Shared components in `components/`
- UI library components in `packages/ui/src/components/`

### API Integration
Use the service layer pattern for API calls:
```typescript
// Example service usage
import { useAssignments } from '../../../features/assignment/hooks/useAssignments';

const { assignments, loading, error, createAssignment } = useAssignments();
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API integration testing
- **E2E Tests**: Full user workflow testing

## 📦 Deployment

### Build Process
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Configuration
Set up environment variables for production:
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_WS_URL` - WebSocket endpoint for real-time features
- `NODE_ENV` - Set to 'production'

### Docker Deployment
```bash
# Build Docker image
docker build -t deep-rubric-frontend .

# Run container
docker run -p 3000:3000 deep-rubric-frontend
```

## 🔍 Code Quality

### Linting and Formatting
```bash
# Run ESLint
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code with Prettier
pnpm format
```

### Type Checking
```bash
# Run TypeScript type checking
pnpm typecheck
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Icons by Lucide React
- Architecture inspired by modern React patterns

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in the `docs/` directory
- Review the implementation examples in the codebase

---

**DeepRubric** - Making grading easier, one assignment at a time. 🎓