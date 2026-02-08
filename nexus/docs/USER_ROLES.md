# User Roles & Permissions

## Role Types

### 1. User (Job Seeker)
**Role**: `user`

**Permissions**:
- Browse and search job listings
- View job details
- Apply to jobs with resume and cover letter
- View and manage own applications
- Update profile information
- Track application status

**Pages Access**:
- `/dashboard` - User dashboard
- `/find-jobs` - Job search and filtering
- `/applications` - View own applications
- `/profile` - Manage profile

### 2. Recruiter
**Role**: `recruiter`

**Permissions**:
- All User permissions
- Create and manage companies
- Post job listings
- View all applications for their jobs
- Update application status (accept/reject)
- Filter and search candidates
- Schedule interviews
- View analytics and reports
- Send messages to candidates

**Pages Access**:
- `/recruiter/dashboard` - Recruiter overview
- `/recruiter/jobs` - Manage job posts
- `/recruiter/candidates` - View applicants
- `/recruiter/interviews` - Schedule interviews
- `/recruiter/messages` - Candidate communication
- `/recruiter/reports` - Analytics

### 3. Admin
**Role**: `admin`

**Permissions**:
- All Recruiter permissions
- Manage all users
- Manage all companies
- Manage all jobs
- Manage categories
- View all applications
- System-wide analytics

## Role-Based Route Protection

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Registration page

### Protected Routes (User)
```javascript
<ProtectedRoute allowedRoles={['user']}>
  <Dashboard />
</ProtectedRoute>
```

### Protected Routes (Recruiter/Admin)
```javascript
<ProtectedRoute allowedRoles={['recruiter', 'admin']}>
  <RecruiterDashboard />
</ProtectedRoute>
```

## Authentication Flow

1. **Registration**
   - User selects role during signup
   - Backend creates user with specified role
   - JWT tokens generated

2. **Login**
   - User provides credentials
   - Backend validates and returns JWT tokens
   - Frontend stores tokens in localStorage
   - AuthContext updates with user data

3. **Route Access**
   - ProtectedRoute checks authentication
   - Validates user role against allowed roles
   - Redirects unauthorized users to login

4. **Token Refresh**
   - Access token expires after set time
   - Refresh token used to get new access token
   - Automatic refresh on API calls

## Permission Checks

### Frontend
```javascript
const { user } = useAuth();

// Check if user is recruiter or admin
if (user?.role === 'recruiter' || user?.role === 'admin') {
  // Show recruiter features
}

// Check if user is regular user
if (user?.role === 'user') {
  // Show user features
}
```

### Backend
- Django REST Framework permissions
- Custom permission classes
- Role-based view access control

## Security Considerations

- JWT tokens stored in localStorage
- Tokens include expiration time
- Refresh tokens can be blacklisted
- Role validation on both frontend and backend
- Protected API endpoints require authentication
- CORS configured for frontend domain
