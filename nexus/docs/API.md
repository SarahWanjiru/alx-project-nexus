# API Documentation

## Base URL
```
https://job-board-platform-fcav.onrender.com/api
```

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <access_token>
```

### Register
**POST** `/api/register/`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "SecurePass123!",
  "role": "user"  // or "recruiter"
}
```

### Login
**POST** `/api/token/`
```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```
Response:
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Refresh Token
**POST** `/api/token/refresh/`
```json
{
  "refresh": "<refresh_token>"
}
```

### Logout
**POST** `/api/logout/`
```json
{
  "refresh": "<refresh_token>"
}
```

## Jobs

### List Jobs
**GET** `/api/jobs/`

Query parameters:
- `page` - Page number
- `search` - Search by title/company/location
- `employment_type` - Filter by type (full_time, part_time, contract)
- `deadline` - Filter by deadline (true for active jobs)

### Get Job Details
**GET** `/api/jobs/{id}/`

### Apply to Job
**POST** `/api/jobs/{id}/applications/`

Multipart form data:
- `resume` - PDF file
- `cover_letter` - PDF file (optional)

## User Applications

### List User Applications
**GET** `/api/users/{user_id}/applications/`

Query parameters:
- `search` - Search applications

### Update Application
**PATCH** `/api/users/{user_id}/applications/{application_id}/`

## Companies

### List Companies
**GET** `/api/companies/`

### Get Company Details
**GET** `/api/companies/{id}/`

### Create Company (Recruiter/Admin)
**POST** `/api/companies/`
```json
{
  "name": "Tech Corp",
  "location": "Nairobi, Kenya",
  "industry": "Software Development",
  "website": "https://techcorp.com",
  "description": "Leading tech company"
}
```

### Company Jobs
**GET** `/api/companies/{company_id}/jobs/`

### Create Job (Recruiter/Admin)
**POST** `/api/companies/{company_id}/jobs/`
```json
{
  "title": "Backend Developer",
  "description": "Build scalable APIs",
  "category": 2,
  "salary": "150000.00",
  "deadline": "2025-12-31T23:59:59Z",
  "employment_type": "full_time"
}
```

### Job Applications (Recruiter/Admin)
**GET** `/api/companies/{company_id}/jobs/{job_id}/applications/`

Query parameters:
- `resume` - Filter by resume presence (true/false)
- `cover_letter` - Filter by cover letter presence (true/false)

### Update Application Status (Recruiter/Admin)
**PATCH** `/api/companies/{company_id}/jobs/{job_id}/applications/{application_id}/`
```json
{
  "status": "accepted"  // or "rejected", "pending"
}
```

## Profile

### Get/Update Profile
**GET/PATCH** `/api/profile/{profile_id}/`
```json
{
  "bio": "Passionate developer",
  "location": "Nairobi, Kenya",
  "skills": "Python, Django, React",
  "experience": "2 years",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "portfolio_url": "https://johndoe.dev"
}
```

## Categories

### List Categories
**GET** `/api/categories/`

## Error Responses

```json
{
  "detail": "Error message"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
