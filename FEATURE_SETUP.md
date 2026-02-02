# Features Setup Guide

## 1. Database Setup (Supabase)
To enable Community, Certificates, and Achievements, you must run the SQL migration script.

1.  Go to your Supabase Dashboard -> SQL Editor.
2.  Open/Copy the content of `src/db/schema_update.sql`.
3.  Run the script to create the necessary tables.

## 2. Environment Variables
Make sure `.env` contains:
- `GEMINI_API_KEY`: For the AI Tutor.
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Features Overview

### Community
- Accessed via `/community`
- Supports real-time discussions, Markdown, and replies.
- "Report Abuse" is supported in the database (`reports` table).

### Certificates
- Certificates are generated using `html2canvas` and `jspdf`.
- Accessed via `/certificates/[unique_code]`
- To trigger certificate generation, you should call the API/Utility when a course is completed. Currently, this can be integrated into `src/lib/coefficients.ts` or similar logic.

### API & Hybrid Architecture
- The app uses a hybrid database approach:
    - **Turso (SQLite)**: Core legacy data (Problems, Subjects).
    - **Supabase (Postgres)**: Community, Auth, Achievements.
- The `api/user-submissions` endpoint has been updated to check for Achievements (`First Problem Solved`) automatically upon submission.
