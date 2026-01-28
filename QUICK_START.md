# Quick Start Guide - ExamReady Frontend

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local` in root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 3. Start Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

---

## Testing Checklist

### Before You Start
- [ ] Spring Boot backend running on `localhost:8000`
- [ ] Backend CORS configured for `localhost:3000`
- [ ] Google Client ID obtained and in `.env.local`

### Test 1: Landing Page
```
1. Visit http://localhost:3000
2. Should see ExamReady landing page
3. Scroll and view features
4. Check footer has correct links
5. Click "Start Today's Tasks" → Should go to /login
```

### Test 2: Legal Pages
```
1. From footer, click "Privacy Policy" → /privacy-policy ✓
2. Click back, then "Terms & Conditions" → /terms-and-conditions ✓
3. Click back, then "Disclaimer" → /disclaimer ✓
4. Click back, then "Careers" → /careers (shows "no openings") ✓
```

### Test 3: Login Flow
```
1. Click "Start Today's Tasks" on homepage
2. Redirected to /login page
3. See Google Sign-In button (or implement if not present)
4. Complete Google OAuth process
5. Backend creates user & JWT token
6. Frontend fetches user profile
7. Since no exam selected → Redirect to /onboarding
```

### Test 4: Onboarding
```
1. Fill profile form:
   - Username: john_doe
   - Phone: +91-1234567890
   - Working Status: WORKING
   - Degree: ENGINEERING
   - Timezone: Asia/Kolkata
2. Click "Continue"
3. Form validates (shows errors if invalid)
4. API call: PUT /users/me
5. Move to exam selection
6. Select CAT exam and attempt type
7. Click "Confirm Selection"
8. API call: POST /users/me/exams
9. Redirect to /dashboard
```

### Test 5: Dashboard
```
1. Should show:
   - Current streak (e.g., 5 days)
   - Longest streak (e.g., 12 days)
   - 7-day task calendar
2. Click "Mark Complete" on a task
3. API call: POST /users/me/taskProgress
4. Task should show as completed
5. Streak should update
```

### Test 6: Feedback Form
```
1. From dashboard header, look for feedback/profile menu
2. Click "Send Feedback"
3. Should be redirected to /feedback
4. If NOT logged in, should redirect to /login first
5. Fill feedback form:
   - Type: Feature Request
   - Subject: Better notifications
   - Message: Would love real-time notifications
6. Click "Submit Feedback"
7. API call: POST /api/feedback
8. Should show success message
9. Form should clear
```

### Test 7: Logout
```
1. Click profile menu (top right)
2. Click "Logout"
3. Should redirect to home page
4. On refresh, should stay on home (not redirected)
5. Clicking login again should show profile form (new session)
```

---

## API Endpoints to Test

Use DevTools Network tab or curl:

```bash
# 1. Get current user (after login)
curl -X GET http://localhost:8000/api/users/me \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json"

# 2. Update profile
curl -X PUT http://localhost:8000/api/users/me \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "phoneNumber": "+91-1234567890",
    "workingStatus": "WORKING",
    "bachelorDegree": "ENGINEERING",
    "timeZone": "Asia/Kolkata"
  }'

# 3. Select exam
curl -X POST http://localhost:8000/api/users/me/exams \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "examCode": "CAT",
    "attemptType": "FIRST_ATTEMPT"
  }'

# 4. Get dashboard
curl -X GET http://localhost:8000/api/dashboard \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json"

# 5. Complete task
curl -X POST http://localhost:8000/api/users/me/taskProgress \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "task-uuid-here"
  }'

# 6. Submit feedback
curl -X POST http://localhost:8000/api/feedback \
  -H "Cookie: jwt=your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "feedbackType": "feature",
    "subject": "Better UX",
    "message": "Love the app, suggestion..."
  }'
```

---

## Debugging

### Enable Detailed Logs
1. Open DevTools: F12
2. Go to Console tab
3. Go to Network tab
4. Perform actions
5. Watch for requests and responses

### Check Request/Response
1. Network tab → Click on request
2. Check Request headers (should have Cookie with JWT)
3. Check Response headers (JWT location)
4. Check Response body (returned data)

### Common Status Codes
```
200 - Success
201 - Created (new resource)
204 - No content (deleted)
400 - Bad request (validation error)
401 - Unauthorized (need to login)
403 - Forbidden (not allowed)
404 - Not found (endpoint doesn't exist)
500 - Server error
```

---

## File Structure

### Pages
- `app/page.tsx` - Landing page
- `app/login/page.tsx` - OAuth login
- `app/onboarding/page.tsx` - Profile & exam selection
- `app/dashboard/page.tsx` - Main app
- `app/feedback/page.tsx` - Feedback (auth-only)
- `app/careers/page.tsx` - Careers
- `app/privacy-policy/page.tsx` - Legal
- `app/terms-and-conditions/page.tsx` - Legal
- `app/disclaimer/page.tsx` - Legal

### Core Logic
- `lib/api-client.ts` - API communication
- `lib/auth-context.tsx` - Auth state

### Components
- `components/task-card.tsx` - Task display
- `components/streak-celebration-modal.tsx` - Celebration

---

## Troubleshooting

### "Cannot GET /feedback"
**Cause:** Trying to access feedback page without authentication
**Fix:** Login first, then access from authenticated state

### "CORS Error"
**Cause:** Backend CORS not configured
**Fix:** Add CORS configuration to Spring Boot:
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
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true)
                    .allowedHeaders("*");
            }
        };
    }
}
```

### "401 Unauthorized"
**Cause:** JWT token expired or invalid
**Fix:** Logout and login again

### "Cannot read property 'user' of undefined"
**Cause:** Component not wrapped in AuthProvider
**Fix:** Ensure app/layout.tsx includes `<AuthProvider>`

---

## Environment Variables Explained

| Variable | What It Does | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Tells frontend where backend is | `http://localhost:8000/api` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth identifier | `157182042595-ironqc7ilripav5ek0tbj1kfu4m5pcu5.apps.googleusercontent.com` |

**Note:** `NEXT_PUBLIC_` prefix means it's sent to browser (don't put secrets here)

---

## What's Ready vs What's Needed

### ✅ Ready (Frontend)
- Landing page
- OAuth login page structure
- Onboarding form with validation
- Dashboard with tasks
- Feedback form (auth-only)
- Legal pages
- All API client calls
- Auth state management
- Error handling

### ⏳ Needed from You (Backend)
- [ ] Google OAuth validation
- [ ] User creation/updates
- [ ] Exam selection logic
- [ ] Task data structure
- [ ] Streak calculation
- [ ] Feedback storage

---

## Next Steps

1. **Test Auth Flow**
   - Get your Google Client ID
   - Test OAuth on `/login` page

2. **Test Profile Endpoints**
   - Create new user → PUT /users/me
   - Test all form validation

3. **Test Exam Selection**
   - Select exam → POST /users/me/exams
   - Verify user can't change exam again

4. **Test Dashboard**
   - GET /dashboard should return task list
   - Task complete should update streak

5. **Test Feedback**
   - Feedback form → POST /api/feedback
   - Verify data storage

6. **Deploy**
   - Build: `npm run build`
   - Test production build
   - Deploy to Vercel or your server

---

## Support

**Questions?** See these files:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION_NOTES.md` - Technical details and explanations
- Code comments in `/lib` and `/app` files
