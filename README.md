# Nexus - Interactive Job Board Platform

A modern Progressive Web Application (PWA) for job seekers to explore, filter, and apply for job opportunities.

## Project Overview

Nexus is an interactive job board platform built as part of the ProDev Frontend Engineering program. This project demonstrates advanced frontend development skills including API integration, responsive design, and accessibility best practices.

## Features

### For Job Seekers (Users)
- **Dynamic Job Listings** - Browse and search jobs from API
- **Advanced Filtering** - Filter by category, location, employment type, and deadline
- **Job Applications** - Apply with resume and cover letter uploads
- **Application Tracking** - Monitor application status in real-time
- **Profile Management** - Manage skills, experience, and portfolio links

### For Recruiters
- **Company Management** - Create and manage company profiles
- **Job Posting** - Post and manage job listings
- **Candidate Review** - View and filter applicants
- **Application Management** - Accept/reject applications
- **Interview Scheduling** - Schedule and track interviews
- **Analytics & Reports** - View recruitment metrics

### Technical Features
- **Progressive Web App** - Installable with offline capabilities
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access** - User, Recruiter, and Admin roles
- **Accessible Forms** - ARIA compliant with keyboard navigation

## Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router v7.13
- **Styling**: Tailwind CSS 3.4.19
- **State Management**: Context API (AuthContext, JobContext, ThemeContext)
- **PWA**: Workbox for service workers
- **Package Manager**: pnpm

### Backend Integration
- **API**: Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Database**: PostgreSQL
- **File Storage**: Media uploads for resumes/cover letters

## Design

The application features a clean, modern interface with:
- Blue gradient branding (#2563eb to #1d4ed8)
- Intuitive navigation and user flows
- Mobile-first responsive design
- Accessibility-focused form design

## Project Structure

```
nexus/
├── public/              # Static assets and PWA manifest
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ApplicationModal.js
│   │   ├── JobApplicationForm.js
│   │   ├── MobileFilters.js
│   │   ├── ProtectedRoute.js
│   │   └── RecruiterSidebar.js
│   ├── contexts/        # React Context providers
│   │   ├── AuthContext.js      # JWT authentication
│   │   ├── JobContext.js       # Job listings
│   │   └── ThemeContext.js     # Theme management
│   ├── pages/           # Application pages
│   │   ├── Landing.js          # Public landing
│   │   ├── Login.js / SignUp.js
│   │   ├── Dashboard.js        # User dashboard
│   │   ├── FindJobs.js         # Job search
│   │   ├── Applications.js     # User applications
│   │   ├── RecruiterDashboard.js
│   │   ├── MyJobPosts.js       # Recruiter jobs
│   │   ├── Candidates.js       # Applicant review
│   │   └── Reports.js          # Analytics
│   ├── utils/
│   │   └── api.js              # API integration
│   └── App.js                  # Main routing
├── docs/                # Documentation
│   ├── ARCHITECTURE.md         # System architecture
│   ├── API.md                  # API documentation
│   ├── USER_ROLES.md           # Roles & permissions
│   └── DEPLOYMENT.md           # Deployment guide
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm package manager
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/SarahWanjiru/alx-project-nexus.git

# Navigate to project
cd alx-project-nexus/nexus

# Install dependencies
pnpm install

# Start development server
pnpm start
```

App runs on `http://localhost:3000`

### Available Scripts
```bash
pnpm start      # Start development server
pnpm build      # Build for production
pnpm test       # Run tests
pnpm eject      # Eject from Create React App (one-way)
```

## Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch
- `feature/*` - Feature development branches
- `fix/*` - Bug fix branches

### Commit Convention
- `feat:` - New features
- `fix:` - Bug fixes
- `style:` - UI/styling changes
- `docs:` - Documentation updates
- `refactor:` - Code refactoring

## Evaluation Criteria

This project is evaluated on:
- **Functionality (15%)** - Working features, completeness
- **Code Quality (20%)** - Clean, maintainable code
- **User Experience (10%)** - Intuitive, responsive design
- **Version Control (15%)** - Professional Git workflow
- **Best Practices (20%)** - Industry standards, security
- **Deployment (10%)** - Live, accessible application
- **Presentation (30%)** - Demo, documentation, journey

## Documentation

Detailed documentation available in `/docs` folder:

- **[Architecture Overview](./nexus/docs/ARCHITECTURE.md)** - System design and tech stack
- **[API Documentation](./nexus/docs/API.md)** - Backend API endpoints and usage
- **[User Roles & Permissions](./nexus/docs/USER_ROLES.md)** - Role-based access control
- **[Deployment Guide](./nexus/docs/DEPLOYMENT.md)** - Production deployment instructions

## User Roles

### User (Job Seeker)
- Browse and search jobs
- Apply to jobs with resume/cover letter
- Track application status
- Manage profile

### Recruiter
- All User permissions
- Create companies and post jobs
- Review candidates and applications
- Schedule interviews
- View analytics

### Admin
- All Recruiter permissions
- Manage all users and companies
- System-wide administration

## API Integration

Backend API: `https://job-board-platform-fcav.onrender.com/api`

Key features:
- JWT authentication with token refresh
- Role-based access control
- File uploads for resumes/cover letters
- Pagination and filtering
- Search functionality

See [API Documentation](./nexus/docs/API.md) for detailed endpoint information.

## Deployment

The application can be deployed on:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

See [Deployment Guide](./nexus/docs/DEPLOYMENT.md) for step-by-step instructions.

## Contributing

This is a capstone project for the ProDev Frontend Engineering program.


## Security Notice

This project currently uses `react-scripts`, which has some known vulnerabilities in its dependency tree (see [npm audit](https://github.com/facebook/create-react-app/issues/11778)). These issues are in packages not directly controlled by this project and do not affect production builds. For long-term security and performance, a migration to Next.js is planned.

## License

This project is part of the ALX ProDev program.

---

**Built with ❤️ by Sarah Wanjiru**