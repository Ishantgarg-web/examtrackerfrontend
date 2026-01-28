# ExamReady Frontend - Setup & Configuration Guide

## Overview
This is the frontend application for ExamReady, built with Next.js 16, React 19, and TypeScript. It connects to a Spring Boot backend running on `localhost:8000`.

---

## Prerequisites
- Node.js 18+ or higher
- npm or yarn package manager
- A Spring Boot backend running on `localhost:8000` (or configured API URL)
- Google OAuth 2.0 credentials (for authentication)

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
# Points to your Spring Boot backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Google OAuth Configuration
# Get these from Google Cloud Console
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

#### Where to get Google OAuth Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application type)
5. Add authorized redirect URIs:
   - `http://localhost:3000/` (for local development)
   - `http://localhost:3000/login` (login page)
   - Your production URL when deploying
6. Copy the Client ID and add it to `.env.local`

---

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

---

## API Configuration

### Backend URL
The frontend communicates with the Spring Boot backend via the `NEXT_PUBLIC_API_URL` environment variable.

**Default:** `http://localhost:8000/api`

To change it, modify the value in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```

### API Endpoints Used
The following endpoints are called by the frontend:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/users/me` | GET | Fetch user profile & exams |
| `/users/me` | PUT | Update user profile |
| `/users/me/exams` | POST | Select exam |
| `/dashboard` | GET | Fetch dashboard data (tasks, streaks) |
| `/users/me/taskProgress` | POST | Mark task as completed |
| `/feedback` | POST | Submit user feedback |

---

## Testing with Spring Boot Backend

### Step 1: Ensure Backend is Running
Make sure your Spring Boot backend is running on `localhost:8000`:
```bash
java -jar your-app.jar
# or
mvn spring-boot:run
```

### Step 2: Check CORS Configuration
Ensure your Spring Boot backend has CORS configured to allow requests from localhost:3000:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowCredentials(true)
                    .allowedHeaders("*");
            }
        };
    }
}
```

### Step 3: Start Frontend Dev Server
```bash
npm run dev
```

### Step 4: Test Authentication Flow

1. **Visit Landing Page**
   - Navigate to `http://localhost:3000`
   - You should see the ExamReady landing page

2. **Click "Start Today's Tasks for CAT"**
   - This redirects to `/login`
   - Should show Google OAuth button

3. **Sign In with Google**
   - Click the Google Sign In button
   - Complete Google authentication
   - Backend should create/update user session

4. **Complete Onboarding**
   - Fill out profile (username, phone, etc.)
   - Select exam (CAT)
   - Should redirect to dashboard

5. **View Dashboard**
   - Should display current streak, longest streak
   - Show 7-day task calendar
   - Allow marking tasks as complete

### Step 5: Test API Calls

Open browser DevTools (F12) and check the Network tab:

1. **After login**: Look for GET `/users/me` request
   - Status should be 200
   - Response should contain user data with exams array

2. **After exam selection**: Look for POST `/users/me/exams` request
   - Status should be 201 (created) or 200
   - User profile should update with new exam

3. **When completing task**: Look for POST `/users/me/taskProgress` request
   - Status should be 200
   - Task should be marked complete in UI

### Common Issues & Solutions

#### Issue: CORS Error
```
Access to XMLHttpRequest at 'http://localhost:8000/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
- Check your Spring Boot CORS configuration (see Step 2 above)
- Ensure your backend is running on port 8000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local` is correct

#### Issue: 401 Unauthorized
```
API Error: Unauthorized
```

**Solution:**
- User session cookie not being sent with requests
- Ensure your API client uses `credentials: 'include'` in fetch options (it does by default)
- Check that backend is setting auth cookies properly
- Try logging in again

#### Issue: Google OAuth Not Working
```
Failed to initialize Google Sign-In
```

**Solution:**
- Verify Google Client ID in `.env.local` is correct
- Check that authorized redirect URIs in Google Console include `http://localhost:3000`
- Clear browser cache and cookies
- Check browser console for detailed error messages

#### Issue: Profile Update Fails
```
Failed to update profile
```

**Solution:**
- Verify all required fields are filled (username, phone, etc.)
- Check backend validation rules
- Ensure phone number format matches backend expectations
- Check Network tab in DevTools for exact error message from backend

---

## Architecture Overview

### Frontend Structure
```
/app
  /login         → Google OAuth login page
  /onboarding    → Profile completion & exam selection
  /dashboard     → Main app with task management
  /feedback      → Feedback submission form (auth required)
  /careers       → Careers page
  /privacy-policy    → Legal page
  /terms-and-conditions → Legal page
  /disclaimer         → Legal page

/lib
  api-client.ts  → API communication layer
  auth-context.tsx → Auth state management

/components
  task-card.tsx  → Task display component
  streak-celebration-modal.tsx → Celebration animation
  ui/            → shadcn/ui components
```

### Authentication Flow
1. User lands on homepage
2. User clicks "Start Today's Tasks"
3. Redirected to `/login`
4. User authenticates with Google
5. Backend creates JWT token, sets in cookie
6. Frontend checks `/users/me` endpoint
7. If no exam selected → redirect to `/onboarding`
8. If exam selected → redirect to `/dashboard`

### Data Flow
1. Auth state managed by `AuthProvider` (React Context)
2. All API calls go through `apiClient` class
3. Components use `useAuth()` hook for auth state
4. JWT token automatically sent with all requests via cookies

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Yes | Google OAuth Client ID |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not put secrets like API keys in these variables.

---

## Debugging

### Enable Console Logs
Some files include debug console.log statements prefixed with `[v0]`. These help trace execution flow:

```javascript
console.log("[v0] User data received:", userData)
```

Check the browser Console (F12) to see these logs.

### Network Debugging
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action (login, submit form, etc.)
4. Check requests and responses
5. Look for status codes:
   - 200 = Success
   - 201 = Created
   - 400 = Bad request
   - 401 = Unauthorized
   - 404 = Not found
   - 500 = Server error

### Check Backend Logs
View your Spring Boot backend logs to see:
- Authentication attempts
- API request validation
- Database operations
- Error messages

---

## Deployment

### Vercel Deployment
1. Connect your GitHub repository
2. Add environment variables in Vercel project settings
3. Deploy automatically on push to main branch

### Other Platforms
Update `NEXT_PUBLIC_API_URL` to point to your production backend URL.

---

## Support & Troubleshooting

For issues or questions:
1. Check the Network tab in DevTools
2. Review backend logs for error messages
3. Verify all environment variables are set
4. Ensure CORS is properly configured
5. Contact support at: support@examready.com
