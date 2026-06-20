# 🚀 DSA & CE Learning Hub

A comprehensive, modern learning platform for Data Structures & Algorithms (DSA) and Computer Engineering (CE) subjects with premium UI/UX, interactive visuals, gamification, and a personalized onboarding system.

---

## 🎨 Premium UI/UX & Design System

### Visual Features
*   **Animated Navigation Bar**: Sleek top navbar containing user avatar dropdowns, notification centers (with unread badges), and interactive gamification metrics (streaks & points).
*   **Aesthetic Transitions**: Powered by Framer Motion for smooth layout shifts, modal transitions, hover effects, and progressive page loadings.
*   **Advanced Layouts**: Integrated layouts supporting responsive grid systems, collapsable sidebars, and dedicated light/dark theme schemes.
*   **Responsive Adaptation**: Designed mobile-first, ensuring high responsiveness across mobile, tablet, and widescreen monitors.

### Design Tokens
*   **Primary Accent**: Blue gradient (representing dynamic progression and calls-to-action)
*   **Secondary Accent**: Purple gradient (highlighting statistics and gamification achievements)
*   **Success Indicator**: Green color palette (signaling completed challenges, correct solutions, and finished modules)
*   **Warning/Error Accents**: Yellow, orange, and red HSL values for alerts, locked features, or syntax compilation failures.

---

## 📚 Core Product Modules

### 1. 🎯 Personalized Onboarding System
A 5-step wizard built to map out custom profiles, gauge current abilities, compile user learning goals, and provide curated learning roadmaps.
*   **Step 1: Profile Setup**: Collects full name, college, current academic year, and preferred programming language.
*   **Step 2: Learning Goals**: Identifies target fields (e.g., Interviews, DSA preparation, GATE exam, Placement, or University courses).
*   **Step 3: Skill Level**: Determines user baseline (Beginner, Intermediate, Advanced).
*   **Step 4: Interests Matrix**: Enables selection from 10+ core DSA topics and 10+ CE subjects.
*   **Step 5: Daily Commitment**: Selects target daily study hours (15m, 30m, 1hr, 2+hrs) to calibrate recommendation metrics.
*   **Features**: Auto-saves step progress locally using browser session caches, dynamically renders recommendations using a scoring engine, and celebrates completion with custom canvas confetti animations.

### 2. 📚 Learning Paths
Provides linear, structured learning paths to master key engineering competencies:
*   *Data Structures Fundamentals* (Beginner)
*   *Algorithm Design & Analysis* (Intermediate)
*   *Advanced Trees & Graphs* (Advanced)
*   *Competitive Programming* (Advanced)
*   *Capabilities*: Progress bars, hours-spent trackers, and modular lesson unlock structures.

### 3. 💻 DSA Practice Arena
A practice hub hosting diverse problem sets with key analytics:
*   **Problem Lists**: Sorted by Difficulty (Easy, Medium, Hard) and Category (Array, String, Trees, Dynamic Programming).
*   **Tracking**: Tracks problem states (Solved ✓, Attempted ⏱️, Unsolved ○) and displays global acceptance rates.
*   **Company Tags**: Identifies problems commonly asked at tech companies (e.g. Google, Amazon, Microsoft).

### 4. 🏛️ CE Subjects Hub
Organized course guides for core computer engineering curricula:
*   **Curriculum Coverage**: Includes Computer Architecture (COA), DBMS, Computer Networks, Operating Systems, Software Engineering, and Theory of Computation.
*   **Resource Management**: Access video lectures, written lecture notes, and assignments. Includes countdown trackers for upcoming exams.

### 5. 🎮 Gamification & Progress Center
*   **Daily Streaks**: Encourages consistency with flame badges and consecutive day counters.
*   **Points/XP System**: Awards points for completing challenges, lessons, and quizzes.
*   **Achievements**: Unlockable badges (e.g., *First Steps*, *Week Warrior*, *Problem Solver*) with progress visualizers.

---

## 🗄️ Database Architecture

The backend operates on a **Supabase PostgreSQL** instance comprising **17 tables** structured with proper indices, triggers, and Row Level Security (RLS) policies:

| Table Name | Description |
| :--- | :--- |
| `users` | Profiles, roles, preferred languages, and onboarding settings |
| `subjects` | Computer Engineering and Programming subjects |
| `learning_paths` | Learning tracks containing multiple modules |
| `lessons` | Sub-modules of subjects and paths containing content |
| `topics` | Broad category groups (e.g., Sorting, Arrays) |
| `dsa_problems` | Coding questions, difficulty levels, and constraints |
| `quizzes` | Assessments assigned to various subjects |
| `quiz_questions` | Multiple-choice questions mapped to quizzes |
| `user_progress` | Trackers for completed lessons and paths |
| `study_schedules` | Calendar items and reminders created by users |
| `submissions` | Code outputs and execution results for DSA problems |
| `achievements` | Seeded badges and reward descriptors |
| `user_achievements` | User-to-achievement mapping |
| `certificates` | Generated credentials for completed subjects |
| `discussion_threads` | Parent community discussion posts |
| `discussion_replies` | Nested responses inside discussion threads |

---

## 🔐 Authentication System

Powered by **Supabase Auth** with JWT session management:
*   **Secure Cookies**: Saves token contexts to secure cookies ensuring SSR (Server-Side Rendering) compatibility.
*   **Protected Routing**: Managed via `src/middleware.ts` which redirects users:
    *   To `/onboarding` if they haven't finished the onboarding questionnaire.
    *   To `/login` if they are not authenticated.
    *   To `/dashboard` (away from login/signup pages) once they are successfully authenticated.

---

## 📡 API Endpoints Reference

### Authentication API

#### `POST /api/auth/signup`
Creates a new user record in Supabase Auth.
*   **Body**:
    ```json
    {
      "email": "student@example.com",
      "password": "password123",
      "full_name": "Jane Doe"
    }
    ```
*   **Response**: `200 OK` with validation success message.

#### `POST /api/auth/login`
Signs in a user and returns their JWT context.
*   **Body**:
    ```json
    {
      "email": "student@example.com",
      "password": "password123"
    }
    ```
*   **Response**: JWT session token and user profile model.

#### `POST /api/auth/logout`
Terminates the user session and clears authentication cookies.

#### `GET /api/auth/me`
Retrieves the logged-in user profile from the active cookie.

---

### Subjects & Content API

#### `GET /api/subjects`
Fetches a list of all engineering subjects ordered by order index (Public).

#### `POST /api/subjects`
Creates a new subject entry (Admin Only).
*   **Body**:
    ```json
    {
      "name": "Distributed Systems",
      "description": "Advanced systems topics",
      "category": "CE",
      "difficulty_level": "advanced"
    }
    ```

---

### User Progress & Study Planners

#### `GET /api/user-progress`
Fetches the current user's completed modules and paths (Auth Required).

#### `POST /api/user-progress`
Updates or creates progress entries for a lesson (Auth Required).
*   **Body**:
    ```json
    {
      "lesson_id": "uuid-here",
      "status": "completed"
    }
    ```

#### `GET /api/study-schedules`
Fetches study schedules and calendar events for the user (Auth Required).

#### `POST /api/study-schedules`
Schedules a new learning slot (Auth Required).
*   **Body**:
    ```json
    {
      "topic_id": "uuid-here",
      "title": "Study Binary Search Trees",
      "description": "Complete 3 Medium Tree problems",
      "date": "2026-06-25",
      "start_time": "14:00:00",
      "end_time": "16:00:00",
      "status": "scheduled"
    }
    ```

---

## 🚀 Getting Started & Setup Guide

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (Version 18 or higher)
*   [Supabase CLI](https://supabase.com/docs/guides/cli) or an active [Supabase Cloud Project](https://supabase.com/)

### 2. Project Installation
Clone the repository and install all dependencies:
```bash
# Install package dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of the project with your database and API credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Run Database Migrations
1. Open your **Supabase Dashboard** SQL editor.
2. Create a new query and run the contents of:
   *   `supabase/migrations/001_initial_schema.sql` (Creates core structures and tables)
   *   `supabase/migrations/002_add_onboarding_fields.sql` (Appends onboarding tracking parameters)
3. Ensure RLS policies are enabled under the *Authentication -> Policies* tab of the database.

### 5. Running the Application
Launch the dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project.

### 6. Testing
You can run the test suite to verify component renderings, validations, and helper utilities:
```bash
npm run test
```

---

## 📁 Directory Structure

```
dsa--ce-learning-hub-1/
├── src/
│   ├── app/                  # Next.js App Router routes & API endpoints
│   ├── components/           # UI elements and page modules (Onboarding, Layout, etc.)
│   ├── contexts/             # Global contexts (e.g. AuthContext)
│   ├── db/                   # Database helpers & schemas
│   ├── hooks/                # Custom React hooks (e.g. useOnboarding)
│   ├── lib/                  # Utilities, constants, and mock helpers
│   ├── types/                # TypeScript type definitions
│   └── middleware.ts         # Session verification and URL routing middleware
├── supabase/
│   └── migrations/           # Database migration files
├── public/                   # Static assets (images, icons)
├── tsconfig.json             # TypeScript configuration
├── package.json              # App dependencies & scripts
└── README.md                 # Project documentation
```

---

*Built with ❤️ for Computer Engineering & Computer Science students.*
