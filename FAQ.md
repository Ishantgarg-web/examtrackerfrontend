# Frequently Asked Questions - ExamReady Frontend

## Google OAuth Setup

### Q: How do I set up Google OAuth?

**A:** Follow these 3 steps:

1. **Get Google Client ID**
   - Go to https://console.cloud.google.com/
   - Create OAuth 2.0 credentials for Web
   - Copy the Client ID

2. **Add to `.env.local`**
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
   ```

3. **Backend Needs To:**
   - Receive Google token from frontend
   - Validate with Google
   - Create JWT token
   - Set in HTTP-only cookie

See `IMPLEMENTATION_NOTES.md` for detailed backend requirements.

---

### Q: Where do I add the Google OAuth button?

**A:** On the login page (`/app/login/page.tsx`). The page is ready for OAuth integration.

You'll need to:
1. Import Google Sign-In library
2. Add the Sign-In button element
3. Handle OAuth response
4. Send token to backend

---

### Q: What should my backend do when it receives the Google token?

**A:** Backend should:
```
1. Receive Google token from frontend (POST /auth/google)
2. Call Google API to validate token
3. Extract user email, name, picture
4. Create user in database if new
5. Update user if exists
6. Generate JWT token
7. Set JWT in HTTP-only cookie
8. Return user data (id, email, username, exams[], etc.)
```

The frontend will automatically send JWT with future requests via cookies.

---

## Testing with Spring Boot

### Q: How do I test the frontend with my Spring Boot backend?

**A:** 

1. **Ensure backend is running**
   ```bash
   java -jar app.jar
   # Check: curl http://localhost:8000/api/health
   ```

2. **Check CORS configuration**
   ```java
   registry.addMapping("/api/**")
       .allowedOrigins("http://localhost:3000")
       .allowCredentials(true)
   ```

3. **Start frontend**
   ```bash
   npm run dev
   ```

4. **Follow testing checklist**
   See `/QUICK_START.md` for complete checklist

---

### Q: How do I debug API issues?

**A:**

1. **Open DevTools** - F12 → Network tab
2. **Perform action** - Click button, submit form, etc.
3. **Check requests**
   - Look for XHR/Fetch requests to `/api/`
   - Check status code (200, 400, 401, 500, etc.)
   - Check request headers (should have Cookie with JWT)
   - Check response body (data or error message)
4. **Check backend logs** - Look for validation errors
5. **Use curl commands** - Test endpoints manually

See `SETUP_GUIDE.md` for example curl commands.

---

## Environment Variables

### Q: What environment variables do I need?

**A:**

```env
# Required - API endpoint
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Required - Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
```

### Q: Can I use different API URLs for dev and production?

**A:** Yes, create `.env.local` for local development and use Vercel environment variables for production.

```
.env.local (local development)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

Vercel (production)
NEXT_PUBLIC_API_URL=https://api.yoursite.com/api
```

---

## Pages & Routing

### Q: What pages are available?

**A:**

| Path | Purpose | Auth Required |
|------|---------|---------------|
| `/` | Landing page | No |
| `/login` | Google OAuth login | No |
| `/onboarding` | Profile & exam selection | Yes (redirects) |
| `/dashboard` | Main app, tasks | Yes (redirects) |
| `/feedback` | Send feedback form | Yes (redirects) |
| `/careers` | Careers page | No |
| `/privacy-policy` | Legal page | No |
| `/terms-and-conditions` | Legal page | No |
| `/disclaimer` | Legal page | No |

---

### Q: What happens if unauthenticated user visits protected page?

**A:** They're automatically redirected to `/login`.

```
/feedback (not logged in) → redirects to /login
/dashboard (not logged in) → redirects to /login
```

---

### Q: How does the routing work after login?

**A:**

1. **User not authenticated** → Landing page
2. **User authenticated, no exam** → Onboarding page
3. **User authenticated, has exam** → Dashboard

---

## API Integration

### Q: What are all the API endpoints the frontend uses?

**A:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/users/me` | Get current user profile |
| PUT | `/users/me` | Update profile |
| POST | `/users/me/exams` | Select exam |
| GET | `/dashboard` | Get tasks & streaks |
| POST | `/users/me/taskProgress` | Mark task done |
| POST | `/feedback` | Submit feedback |

See `IMPLEMENTATION_NOTES.md` for request/response formats.

---

### Q: How does the JWT authentication work?

**A:**

1. **Backend sets JWT** in HTTP-only cookie after login
2. **Frontend automatically sends** cookie with every request (credentials: 'include')
3. **Backend validates** JWT on protected endpoints
4. **If invalid** → Returns 401 → Frontend catches error

The API client (`lib/api-client.ts`) handles this automatically.

---

### Q: What should the profile update endpoint validate?

**A:**

```json
{
  "username": "string (3-20 chars, alphanumeric + underscore)",
  "phoneNumber": "string (valid phone format)",
  "workingStatus": "enum (WORKING, STUDENT, UNEMPLOYED)",
  "bachelorDegree": "enum (ENGINEERING, SCIENCE, COMMERCE, ARTS, OTHER)",
  "timeZone": "string (valid timezone like 'Asia/Kolkata')"
}
```

Frontend does basic validation; backend should do thorough validation.

---

### Q: Can user change their exam selection?

**A:** No. The exam selection is intentionally one-time, irreversible.

- After `POST /users/me/exams` succeeds, exam is locked
- User cannot change exam in `/onboarding` again
- If needed, this must be handled by admin

---

## Code Structure

### Q: How is authentication state managed?

**A:** Using React Context API:

```
AuthProvider (lib/auth-context.tsx)
  ↓
useAuth() hook
  ↓
Components can access: user, loading, isAuthenticated, hasExamSelected
```

To use auth state:
```tsx
const { user, isAuthenticated, logout } = useAuth();
```

---

### Q: How do API calls work?

**A:** Through the API Client singleton:

```tsx
// In components:
import { apiClient } from '@/lib/api-client';

// Call methods:
const profile = await apiClient.getProfile();
await apiClient.updateProfile(data);
await apiClient.selectExam(data);
```

All requests automatically include JWT cookie.

---

### Q: How are forms validated?

**A:**

1. **Frontend validation** - Before API call
   - Check required fields
   - Check input format
   - Show error messages

2. **Backend validation** - In API endpoint
   - Thorough data validation
   - Business logic validation
   - Return errors in response

Frontend should show backend errors to user.

---

## Feedback Form

### Q: Can anonymous users send feedback?

**A:** No. Feedback form requires authentication.

Unauthenticated users trying to access `/feedback` are redirected to `/login`.

---

### Q: Where does feedback go?

**A:** Sent via `POST /api/feedback` to backend.

Backend should:
- Validate feedback data
- Store in database
- Return success response

---

## Legal Pages

### Q: Are the legal pages final?

**A:** They're ready to use but you should review and update:

1. Company name & details
2. Contact information
3. Legal jurisdiction
4. Data storage locations
5. Specific disclaimers

Review `/app/privacy-policy/page.tsx`, `/app/terms-and-conditions/page.tsx`, and `/app/disclaimer/page.tsx`.

---

## Deployment

### Q: How do I deploy this?

**A:**

1. **Build**
   ```bash
   npm run build
   ```

2. **Test production build**
   ```bash
   npm start
   ```

3. **Deploy to Vercel**
   - Connect GitHub repository
   - Vercel automatically deploys on push
   - Add environment variables in Vercel dashboard

4. **Update backend URL**
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

---

### Q: How do I test production build locally?

**A:**

```bash
npm run build        # Create production build
npm start            # Run production server
# Visit http://localhost:3000
```

---

## Troubleshooting

### Q: Getting "CORS Error"

**A:** Backend CORS not configured correctly.

Check Spring Boot CORS config:
```java
registry.addMapping("/api/**")
    .allowedOrigins("http://localhost:3000")
    .allowCredentials(true)
    .allowedMethods("GET", "POST", "PUT", "DELETE")
```

---

### Q: Getting "401 Unauthorized"

**A:** Session expired or invalid JWT.

**Fix:**
1. Logout and login again
2. Check that backend is setting cookie properly
3. Check that cookie is being sent with requests (DevTools → Network → Headers)

---

### Q: Getting "Cannot read property 'user' of undefined"

**A:** Component using `useAuth()` outside `AuthProvider`.

**Fix:** Ensure component is inside `<AuthProvider>` (check layout.tsx)

---

### Q: Form submit doesn't work

**A:** Check:
1. Form validation passing? (Check console for error messages)
2. Backend endpoint exists? (Check Network tab)
3. API response error? (Check Network → Response tab)
4. Backend returning proper status code? (Should be 200/201)

---

### Q: Frontend says "Loading..." forever

**A:** Likely API issue:

1. Check if backend is running: `curl http://localhost:8000/api/health`
2. Check if CORS is configured
3. Check browser console for errors
4. Check backend logs

---

## Performance & Optimization

### Q: Is caching set up?

**A:** Minimal caching currently. For production:

1. Add SWR for data fetching
2. Implement cache headers on backend
3. Use Vercel's ISR for static pages

---

### Q: Can I add more features?

**A:** Yes! The structure supports:

1. **New pages** - Create in `/app`
2. **New API calls** - Add methods to `api-client.ts`
3. **New components** - Create in `/components`
4. **New state** - Extend `auth-context.tsx` or add new contexts

---

## Getting Help

### Q: Where do I find more information?

**A:** See these files:

1. **`QUICK_START.md`** - 5-minute setup & testing
2. **`SETUP_GUIDE.md`** - Detailed setup & troubleshooting
3. **`IMPLEMENTATION_NOTES.md`** - Technical details
4. **Code comments** - In `/lib` and `/app` files

---

### Q: Something's not working

**A:** Follow this checklist:

1. ✅ Backend running on localhost:8000?
2. ✅ CORS configured in backend?
3. ✅ Environment variables set in `.env.local`?
4. ✅ Frontend running on localhost:3000?
5. ✅ Check browser Network tab for errors
6. ✅ Check backend logs
7. ✅ Check browser Console for errors
8. ✅ Try incognito mode (clear cookies)

---

## Contact & Support

For specific questions about your implementation:
- Email: support@examready.com
- Issues: Check backend logs and Network tab
- Feature requests: Use the `/feedback` form
