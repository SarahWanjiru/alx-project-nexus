# Architecture Overview

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router v7.13
- **Styling**: Tailwind CSS 3.4.19
- **State Management**: Context API (AuthContext, JobContext, ThemeContext)
- **PWA**: Workbox for service workers and offline capabilities
- **Package Manager**: pnpm

## Project Structure

```
nexus/
├── public/              # Static assets, PWA manifest, service worker
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ApplicationModal.js
│   │   ├── JobApplicationForm.js
│   │   ├── MobileFilters.js
│   │   ├── NexusLogo.js
│   │   ├── ProtectedRoute.js
│   │   └── RecruiterSidebar.js
│   ├── contexts/        # React Context providers
│   │   ├── AuthContext.js      # JWT authentication
│   │   ├── JobContext.js       # Job listings management
│   │   └── ThemeContext.js     # Theme management
│   ├── pages/           # Application pages
│   │   ├── Landing.js          # Public landing page
│   │   ├── Login.js            # User login
│   │   ├── SignUp.js           # User registration
│   │   ├── Dashboard.js        # User dashboard
│   │   ├── FindJobs.js         # Job search & filtering
│   │   ├── Applications.js     # User applications
│   │   ├── ProfilePage.js      # User profile
│   │   ├── RecruiterDashboard.js  # Recruiter overview
│   │   ├── MyJobPosts.js       # Recruiter job management
│   │   ├── Candidates.js       # Recruiter candidate view
│   │   ├── Interviews.js       # Interview scheduling
│   │   ├── Messages.js         # Messaging system
│   │   └── Reports.js          # Analytics & reports
│   ├── utils/
│   │   └── api.js              # API integration layer
│   ├── App.js                  # Main routing & app structure
│   └── index.js                # Entry point
└── docs/                # Documentation
```

## Authentication Flow

1. User registers via `/signup` (role: 'user' or 'recruiter')
2. JWT tokens stored in localStorage
3. Protected routes check authentication via AuthContext
4. Role-based access control for user/recruiter pages

## State Management

### AuthContext
- Manages user authentication state
- Handles login, signup, logout
- Stores JWT tokens
- Provides user role information

### JobContext
- Manages job listings
- Handles job filtering and search
- Integrates with backend API

### ThemeContext
- Manages application theme
- Supports light/dark mode

## API Integration

Backend: `https://job-board-platform-fcav.onrender.com/api`

Key endpoints:
- `/api/register/` - User registration
- `/api/token/` - JWT login
- `/api/token/refresh/` - Token refresh
- `/api/logout/` - Logout
- `/api/jobs/` - Job listings
- `/api/jobs/{id}/applications/` - Job applications
- `/api/companies/` - Company listings
- `/api/users/{id}/applications/` - User applications

## Design System

### Colors
- **Primary Blue**: #2563eb to #1d4ed8 (gradient)
- **Secondary Teal**: #0f766e, #14b8a6
- **Success**: Teal shades
- **Warning**: Orange shades
- **Error**: Red shades

### Components
- Mobile-first responsive design
- Consistent spacing and typography
- Accessible forms with ARIA labels
- Gradient backgrounds for branding
