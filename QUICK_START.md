# ⚡ Quick Start Guide - DSA & CE Learning Hub

## 🎯 Goal
Get your application running with full authentication in **5 minutes**.

---

## Step 1: Run Database Migration (2 minutes)

1. **Open Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/nbjdxrtfpbkcypeybiny
   ```

2. **Go to SQL Editor** (left sidebar)

3. **Create New Query** (button in top right)

4. **Copy & Paste:**
   - Open file: `supabase/migrations/001_initial_schema.sql`
   - Select ALL (Ctrl+A)
   - Copy (Ctrl+C)
   - Paste into SQL Editor (Ctrl+V)

5. **Run the Query:**
   - Click "Run" button OR press `Ctrl + Enter`
   - Wait for "Success" message

6. **Verify:**
   - Click "Table Editor" (left sidebar)
   - You should see 17 tables

---

## Step 2: Enable Email Auth (1 minute)

1. **In Supabase Dashboard, go to:**
   ```
   Authentication → Providers
   ```

2. **Make sure "Email" is enabled** (should be by default)

3. **For testing only** (disable in production):
   - Go to: `Authentication → Settings`
   - Scroll to "Email Auth"
   - Turn OFF "Enable email confirmations"
   - This lets you test without verifying emails

4. **Set Site URL:**
   - Go to: `Authentication → URL Configuration`
   - Set Site URL: `http://localhost:3000`
   - Add Redirect URL: `http://localhost:3000/auth/callback`

---

## Step 3: Start Development Server (30 seconds)

Dev server is already running! If not:

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## Step 4: Test Authentication (2 minutes)

### Create Account:
1. Click "**Sign Up**" button
2. Enter:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Create Account"
4. You should see success message

### Login:
1. Go to http://localhost:3000/login
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign In"
4. You should be redirected to `/dashboard`

---

## Step 5: Test API Endpoints (1 minute)

Open browser console (F12) and run:

```javascript
// Test subjects API (should work now!)
fetch('/api/subjects')
  .then(r => r.json())
  .then(console.log)

// Test current user
fetch('/api/auth/me')
  .then(r => r.json())
  .then(console.log)

// Test user progress (needs login)
fetch('/api/user-progress')
  .then(r => r.json())
  .then(console.log)
```

**Expected:** All return `200` status, no more `500` errors! ✅

---

## ✅ Success Checklist

- [ ] SQL migration ran successfully
- [ ] 17 tables visible in Supabase
- [ ] Email auth enabled
- [ ] Can create account
- [ ] Can login
- [ ] Can access `/dashboard` when logged in
- [ ] API endpoints return data (not 500 errors)

---

## 🐛 Common Issues & Fixes

### Issue: Can't run SQL migration
**Fix:** Make sure you're in the correct Supabase project

### Issue: 500 error on API endpoints
**Fix:** You forgot to run the SQL migration

### Issue: Can't login after signup
**Fix:** Either verify email or disable email confirmation

### Issue: Redirected to login when accessing dashboard
**Fix:** This is correct! You need to login first

---

## 📁 File Structure (What We Created)

```
dsa--ce-learning-hub-1/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts ✨
│   │   │   │   ├── signup/route.ts ✨
│   │   │   │   ├── logout/route.ts ✨
│   │   │   │   └── me/route.ts ✨
│   │   │   ├── subjects/route.ts (FIXED)
│   │   │   ├── user-progress/route.ts (FIXED)
│   │   │   └── study-schedules/route.ts (FIXED)
│   │   ├── auth/
│   │   │   └── callback/route.ts ✨
│   │   ├── login/page.tsx ✨
│   │   ├── signup/page.tsx ✨
│   │   └── page.tsx (Updated)
│   ├── lib/
│   │   ├── supabase.ts (Updated)
│   │   └── supabase-server.ts ✨
│   ├── contexts/
│   │   └── AuthContext.tsx ✨
│   └── middleware.ts ✨
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql ✨
├── SETUP_INSTRUCTIONS.md ✨
├── API_REFERENCE.md ✨
└── IMPLEMENTATION_SUMMARY.md ✨

✨ = New file
(FIXED) = Fixed existing file
(Updated) = Modified existing file
```

---

## 🎉 You're Done!

Your app now has:
- ✅ Complete authentication system
- ✅ Protected routes
- ✅ Working API endpoints
- ✅ User registration & login
- ✅ Database with 17 tables
- ✅ Row-level security

---

## 🚀 What's Next?

Now you can build on this foundation:

1. **Create Dashboard** - Build the main user interface
2. **Learning Paths** - Display courses and lessons
3. **DSA Problems** - Code editor and submission
4. **Progress Tracking** - Analytics and charts
5. **Admin Panel** - Content management

---

## 📚 Documentation

- **Setup Details:** `SETUP_INSTRUCTIONS.md`
- **API Reference:** `API_REFERENCE.md`
- **Full Summary:** `IMPLEMENTATION_SUMMARY.md`

---

**Questions?** Check the browser console (F12) or terminal for error messages.

**Happy Coding!** 🚀
