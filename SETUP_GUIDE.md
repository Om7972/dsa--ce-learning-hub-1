# 🛠️ Setup & Configuration Guide

## 🔑 Authentication Setup

Currently, the application is running in **Demo Mode**. This means it uses a comprehensive mock authentication system so you can explore all features without needing to set up a backend immediately.

### How Demo Mode Works
- **Sign In**: You can click "Sign In" with any email/password.
- **Sign Up**: You can create an account with any details.
- **Persistence**: Your "session" is saved in your browser's local storage, so you remain logged in even if you refresh.
- **Features**: All protected routes (Dashboard, Profile, etc.) work perfectly.

### 🚀 Going Live with Real Backend (Supabase)

When you are ready to connect a real database and authentication system, follow these steps:

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com) and create a new project.

2. **Get Credentials**
   - Go to Project Settings -> API.
   - Copy the `Project URL` and `anon public` key.

3. **Configure Environment Variables**
   - Create a file named `.env.local` in the root directory.
   - Add the following keys:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Restart Server**
   - Restart the development server (`npm run dev`).
   - The application will automatically detect the keys and switch from **Demo Mode** to **Real Mode**.

## 📚 Database Schema

If using real Supabase, you'll need to set up the database tables. You can find the TypeScript types in `src/lib/supabase.ts` which outline the schema structure for `users`, `learning_paths`, `lessons`, etc.

## 🎨 Customization

- **Colors**: Edit `src/app/globals.css` to change the CSS variables.
- **Content**: Update the mock data in the individual page components (e.g., `src/app/dashboard/page.tsx`).

---
**Enjoy your error-free learning platform!** 🚀
