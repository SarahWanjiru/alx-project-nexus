# Job Board Platform API Endpoints

Base URL: `https://job-board-platform-fcav.onrender.com/api`

## Authentication Endpoints

### Register
- **POST** `/register/`
- Body: `{ username, email, first_name, last_name, password, role, phone_number? }`
- Returns: User object with user_id

### Login (Get Token)
- **POST** `/token/`
- Body: `{ username, password }`
- Returns: `{ access, refresh }` tokens

### Refresh Token
- **POST** `/token/refresh/`
- Body: `{ refresh }`
- Returns: `{ access }` token

### Logout
- **POST** `/logout/`
- Headers: `Authorization: Bearer <token>`
- Body: `{ refresh }`

---

## User Endpoints

### List/Create Users
- **GET** `/users/` - List all users (admin only)
- **POST** `/users/` - Create user (admin only)

### User Detail
- **GET** `/users/{user_id}/` - Get user details
- **PUT** `/users/{user_id}/` - Update user
- **PATCH** `/users/{user_id}/` - Partial update
- **DELETE** `/users/{user_id}/` - Delete user

### User Applications
- **GET** `/users/{user_id}/applications/` - Get user's applications
- **GET** `/users/{user_id}/applications/{id}/` - Get specific application

---

## Job Endpoints (Public)

### List Jobs
- **GET** `/jobs/`
- Query params: `category`, `location`, `employment_type`, `salary`, `search`, `ordering`
- Returns: Paginated job list

### Job Detail
- **GET** `/jobs/{job_id}/` - Get job details

### Apply to Job
- **POST** `/jobs/{job_id}/applications/`
- Headers: `Authorization: Bearer <token>`
- Body: FormData with `resume`, `cover_letter` files
- Returns: Application object

### Get Job Applications
- **GET** `/jobs/{job_id}/applications/` - List applications for a job

---

## Company Endpoints

### List/Create Companies
- **GET** `/companies/` - List all companies (public)
- **POST** `/companies/` - Create company (recruiter/admin)
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, email, phone_number?, description?, location?, website?, industry? }`

### Company Detail
- **GET** `/companies/{company_id}/` - Get company details
- **PUT** `/companies/{company_id}/` - Update company
- **PATCH** `/companies/{company_id}/` - Partial update
- **DELETE** `/companies/{company_id}/` - Delete company

### Company Jobs
- **GET** `/companies/{company_id}/jobs/` - List company jobs
- **POST** `/companies/{company_id}/jobs/` - Create job for company
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, description, category, location?, salary?, deadline, employment_type, is_active? }`

### Company Job Detail
- **GET** `/companies/{company_id}/jobs/{job_id}/`
- **PUT** `/companies/{company_id}/jobs/{job_id}/`
- **PATCH** `/companies/{company_id}/jobs/{job_id}/`
- **DELETE** `/companies/{company_id}/jobs/{job_id}/`

### Company Job Applications
- **GET** `/companies/{company_id}/jobs/{job_id}/applications/` - View applications (recruiter/admin)
- **GET** `/companies/{company_id}/jobs/{job_id}/applications/{id}/` - Application detail
- **PATCH** `/companies/{company_id}/jobs/{job_id}/applications/{id}/` - Update status

### Company Reviews
- **GET** `/companies/{company_id}/reviews/` - List reviews (public)
- **POST** `/companies/{company_id}/reviews/` - Create review
- Headers: `Authorization: Bearer <token>`
- Body: `{ rating, comment? }`

### Company Notifications
- **GET** `/companies/{company_id}/notifications/` - List notifications (recruiter/admin)
- **GET** `/companies/{company_id}/notifications/{id}/` - Notification detail
- **PATCH** `/companies/{company_id}/notifications/{id}/mark-as-read/` - Mark as read

---

## Category Endpoints

### List/Create Categories
- **GET** `/categories/` - List all categories
- **POST** `/categories/` - Create category (admin only)
- Body: `{ name, description? }`

### Category Detail
- **GET** `/categories/{category_id}/`
- **PUT** `/categories/{category_id}/`
- **PATCH** `/categories/{category_id}/`
- **DELETE** `/categories/{category_id}/`

---

## Profile Endpoints

### List/Create Profiles
- **GET** `/profiles/` - List profiles
- **POST** `/profiles/` - Create profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ bio?, location?, skills?, experience?, linkedin_url?, github_url?, portfolio_url? }`

### Profile Detail
- **GET** `/profiles/{profile_id}/`
- **PUT** `/profiles/{profile_id}/`
- **PATCH** `/profiles/{profile_id}/`
- **DELETE** `/profiles/{profile_id}/`

### My Profile
- **GET** `/profiles/me/` - Get current user's profile

---

## Response Formats

### Success Response
```json
{
  "count": 100,
  "next": "url",
  "previous": "url",
  "results": [...]
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

---

## Authentication

Most endpoints require JWT authentication:
```
Authorization: Bearer <access_token>
```

## Permissions

- **Public**: Anyone can access
- **Authenticated**: Requires login
- **User**: Job seekers (role='user')
- **Recruiter**: Company recruiters (role='recruiter')
- **Admin**: Platform administrators (role='admin')
