# Nexus - Interactive Job Board Platform

A modern Progressive Web Application (PWA) for job seekers to explore, filter, and apply for job opportunities.

## Project Overview

Nexus is an interactive job board platform built as part of the ProDev Frontend Engineering program. This project demonstrates advanced frontend development skills including API integration, responsive design, and accessibility best practices.

## Features

- **Dynamic Job Listings** - Fetch and display jobs from API
- **Advanced Filtering** - Filter by category, location, and experience level
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Progressive Web App** - Installable with offline capabilities
- **Accessible Forms** - ARIA compliant job application forms
- **User Authentication** - Secure login and registration

## Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **PWA**: Service Workers, Web App Manifest
- **Package Manager**: pnpm
- **Version Control**: Git

## Design

The application features a clean, modern interface with:
- Blue gradient branding (#2563eb to #1d4ed8)
- Intuitive navigation and user flows
- Mobile-first responsive design
- Accessibility-focused form design

## Project Structure

```
nexus/
├── public/          # Static assets and PWA manifest
├── src/
│   ├── components/  # Reusable UI components
│   ├── contexts/    # React Context providers
│   ├── pages/       # Application pages
│   └── assets/      # Images and icons
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm

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

## Deployment

The application will be deployed on Vercel/Netlify for public access.

## Contributing

This is a capstone project for the ProDev Frontend Engineering program.

## License

This project is part of the ALX ProDev program.

---

**Built with ❤️ by Sarah Wanjiru**