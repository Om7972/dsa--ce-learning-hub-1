# 🚀 DSA & CE Learning Hub - Setup Instructions

## 📋 Prerequisites Completed
- ✅ Supabase project created
- ✅ Environment variables configured in `.env`
- ✅ All npm packages installed

## 🗄️ Step 1: Run Database Migration in Supabase

1. **Open your Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard/projects
   - Select your project: `nbjdxrtfpbkcypeybiny`

2. **Navigate to SQL Editor:**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Migration:**
   - Open the file: `supabase/migrations/001_initial_schema.sql`
   - Copy ALL the contents
   - Paste into the Supabase SQL Editor
   - Click "Run" button (or press Ctrl+Enter)
   - Wait for success message

4. **Verify Tables Created:**
   - Go to "Table Editor" in left sidebar
   - You should see all these tables:
     - users
     - subjects
     - learning_paths
     - lessons
     - topics
     - dsa_problems
     - quizzes
     - quiz_questions
     - user_progress
     - study_schedules
     - submissions
     - achievements
     - user_achievements
     - certificates
     - discussion_threads
     - discussion_replies

## 🔐 Step 2: Configure Authentication

1. **Enable Email Authentication:**
   - Go to "Authentication" → "Providers"
   - Make sure "Email" is enabled
   - Optional: Disable "Confirm email" for testing (re-enable for production)

2. **Configure Email Templates (Optional):**
   - Go to "Authentication" → "Email Templates"
   - Customize the confirmation email if needed

3. **Set Site URL:**
   - Go to "Authentication" → "URL Configuration"
   - Add your site URL: `http://localhost:3000` (for development)
   - Add redirect URLs: `http://localhost:3000/auth/callback`

## 🏃 Step 3: Start the Development Server

```bash
npm run dev
```

The app will be available at: http://localhost:3000

## 🧪 Step 4: Test the Application

### Test Authentication:
1. Go to http://localhost:3000/signup
2. Create a new account (use a real email or disable email confirmation)
3. If email confirmation is enabled, check your email and click the link
4. Go to http://localhost:3000/login and sign in
5. You should be redirected to http://localhost:3000/dashboard

### Test API Endpoints:
After logging in, you can test these endpoints in your browser console or Postman:

```javascript
// Get subjects
fetch('/api/subjects').then(r => r.json()).then(console.log)

// Get user progress
fetch('/api/user-progress').then(r => r.json()).then(console.log)

// Get study schedules
fetch('/api/study-schedules').then(r => r.json()).then(console.log)

// Get current user
fetch('/api/auth/me').then(r => r.json()).then(console.log)
```

## 📊 Step 5: Verify Row Level Security (RLS)

The migration automatically sets up RLS policies. To verify:

1. Go to Supabase Dashboard → Authentication → Policies
2. You should see policies for each table
3. Key policies:
   - Students can only see/edit their own data
   - Admins can manage learning content
   - Public content (subjects, lessons) is readable by everyone

## 🎉 What's Working Now

✅ **Authentication System:**
- Email/Password signup with JWT
- Email verification
- Login/Logout
- Session persistence
- Protected routes

✅ **API Routes (Fixed):**
- `/api/subjects` - Get all subjects
- `/api/user-progress` - Get/Update user progress
- `/api/study-schedules` - Get/Create study schedules
- `/api/auth/login` - Login endpoint
- `/api/auth/signup` - Signup endpoint
- `/api/auth/logout` - Logout endpoint
- `/api/auth/me` - Get current user

✅ **Database:**
- All tables created with proper relationships
- Row Level Security enabled
- Indexes for performance
- Triggers for auto-updating timestamps
- Seed data inserted

✅ **UI Pages:**
- `/login` - Modern login page
- `/signup` - Modern signup page
- Protected routes with middleware

## 🔧 Troubleshooting

### If you get 500 errors on API routes:
1. Make sure you ran the SQL migration in Supabase
2. Check that all environment variables are correct in `.env`
3. Check the browser console and terminal for error messages
4. Verify your Supabase project is active

### If authentication doesn't work:
1. Make sure email provider is enabled in Supabase
2. Check that redirect URLs are configured
3. Clear browser cookies and try again
4. Check Supabase logs: Dashboard → Logs

### If RLS prevents access:
1. Make sure you're logged in
2. Check that your user role is set correctly in the `users` table
3. Temporarily disable RLS for debugging (not recommended for production)

## 📝 Next Steps

Now that the foundation is working, you can:

1. **Build Dashboard UI** - Create the main dashboard page
2. **Add Learning Paths** - Implement course/path viewing pages
3. **DSA Visualizer** - Build the algorithm visualization components
4. **Admin Panel** - Create admin interfaces for content management
5. **Progress Tracking** - Build analytics and progress tracking UI
6. **Community Features** - Add discussion forums and doubt system

## 🚨 Important Notes

- **Environment Variables**: Never commit `.env` to version control
- **Service Role Key**: Only use on the server-side (API routes)
- **Anon Key**: Safe to use on client-side
- **RLS**: Always keep Row Level Security enabled in production
- **Email Verification**: Enable for production deployments

## 📚 Documentation Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Need Help?** Check the Supabase Dashboard logs or browser console for detailed error messages.
