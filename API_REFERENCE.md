# 🔥 API Endpoints Reference

## Authentication Endpoints

### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

**Response (Success):**
```json
{
  "message": "User created successfully. Please check your email to verify your account.",
  "user": { ... }
}
```

---

### POST `/api/auth/login`
Sign in an existing user.

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "message": "Logged in successfully",
  "user": { ... },
  "session": { ... }
}
```

---

### POST `/api/auth/logout`
Sign out the current user.

**Request Body:** None

**Response (Success):**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET `/api/auth/me`
Get the current authenticated user.

**Headers Required:**
```
Cookie: sb-access-token=...
```

**Response (Success):**
```json
{
  "user": {
    "id": "uuid",
    "email": "student@example.com",
    "profile": {
      "full_name": "John Doe",
      "role": "student",
      ...
    }
  }
}
```

---

## Subject Endpoints

### GET `/api/subjects`
Get all subjects (public access).

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Data Structures & Algorithms",
    "description": "Core DSA concepts",
    "category": "DSA",
    "difficulty_level": "beginner",
    "order_index": 1
  },
  ...
]
```

---

### POST `/api/subjects`
Create a new subject (admin only).

**Request Body:**
```json
{
  "name": "Operating Systems",
  "description": "OS concepts and fundamentals",
  "category": "CE",
  "difficulty_level": "intermediate"
}
```

---

## Progress Endpoints

### GET `/api/user-progress`
Get current user's learning progress (requires authentication).

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "lesson_id": "uuid",
    "status": "completed",
    "completed_at": "2026-01-24T10:30:00Z",
    "lessons": {
      "id": "uuid",
      "title": "Introduction to Arrays",
      "learning_path_id": "uuid"
    }
  },
  ...
]
```

---

### POST `/api/user-progress`
Update user's learning progress (requires authentication).

**Request Body:**
```json
{
  "lesson_id": "uuid",
  "status": "completed"
}
```

**Note:** The `user_id` is automatically set from the authenticated session.

---

## Study Schedule Endpoints

### GET `/api/study-schedules`
Get current user's study schedules (requires authentication).

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "topic_id": "uuid",
    "title": "Arrays Practice",
    "description": "Practice array problems",
    "date": "2026-01-25",
    "start_time": "14:00:00",
    "end_time": "16:00:00",
    "status": "scheduled",
    "topics": {
      "id": "uuid",
      "name": "Arrays",
      "subject_id": "uuid"
    }
  },
  ...
]
```

---

### POST `/api/study-schedules`
Create a new study schedule (requires authentication).

**Request Body:**
```json
{
  "topic_id": "uuid",
  "title": "Arrays Practice",
  "description": "Practice array problems",
  "date": "2026-01-25",
  "start_time": "14:00:00",
  "end_time": "16:00:00",
  "status": "scheduled"
}
```

**Note:** The `user_id` is automatically set from the authenticated session.

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to perform action",
  "details": "Detailed error message"
}
```

---

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Subjects (Public)
```bash
curl http://localhost:3000/api/subjects
```

### Get User Progress (Authenticated)
```bash
curl http://localhost:3000/api/user-progress \
  -b cookies.txt
```

---

## Authentication Flow

1. **Sign Up** → POST `/api/auth/signup`
2. **Verify Email** → Click link in email → GET `/auth/callback?code=...`
3. **Sign In** → POST `/api/auth/login`
4. **Access Protected Resources** → Use session cookies
5. **Sign Out** → POST `/api/auth/logout`

---

## Protected vs Public Routes

### Public Routes (No Auth Required):
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/api/subjects` - Get subjects
- `/auth/callback` - Email verification callback

### Protected Routes (Auth Required):
- `/dashboard` - User dashboard
- `/api/user-progress` - User progress
- `/api/study-schedules` - Study schedules
- `/api/auth/me` - Current user info
- All other pages (enforced by middleware)

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing:
- Rate limiting middleware
- Supabase built-in rate limiting
- API key requirements for sensitive operations

---

## Response Headers

All API routes return:
```
Content-Type: application/json
```

Authenticated routes also set/read:
```
Set-Cookie: sb-access-token=...
Set-Cookie: sb-refresh-token=...
```

---

## Status Codes

- `200` - Success
- `201` - Created (not currently used, but should be for POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not enough permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

*For implementation details, see the route files in `src/app/api/`*
