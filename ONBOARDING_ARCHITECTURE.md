# Onboarding System - Architecture & Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Onboarding Page (/onboarding)                │   │
│  │  - Main orchestrator component                          │   │
│  │  - Manages wizard state                                 │   │
│  │  - Handles step navigation                              │   │
│  │  - Auto-saves to localStorage                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│           ▲              ▼              ▼              ▲        │
│           │              │              │              │        │
│  ┌────────┴────────┬─────┴──────┬──────┴──┬──────────┴─────┐  │
│  │                 │            │         │                │  │
│  ▼                 ▼            ▼         ▼                ▼  │
│ Step1           Step2         Step3     Step4          Step5   │
│Profile       LearningGoals  SkillLevel Interests  DailyCommit │
│Setup                                                           │
│                                                                 │
│  localStorage (onboarding_progress)                            │
│  ├─ data: OnboardingData                                       │
│  └─ step: current step number                                  │
│                                                                 │
│  AuthContext                                                    │
│  ├─ user (authenticated user)                                  │
│  └─ loading state                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
    ┌────────────┐       ┌──────────┐      ┌────────────┐
    │ Middleware │       │ API      │      │ Supabase   │
    │ (check     │       │ Routes   │      │ Client     │
    │ onboarded) │       │ POST/GET │      │            │
    └────────────┘       └──────────┘      └────────────┘
         │                    │                    │
         └────────────────┬───┴────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────┐
         │   Supabase PostgreSQL DB       │
         │   ┌──────────────────────────┐ │
         │   │  users table (updated)   │ │
         │   ├──────────────────────────┤ │
         │   │ id (PK)                  │ │
         │   │ onboarded (NEW)          │ │
         │   │ learning_goals[] (NEW)   │ │
         │   │ skill_level (NEW)        │ │
         │   │ interests[] (NEW)        │ │
         │   │ daily_time_commit (NEW)  │ │
         │   │ ... other fields         │ │
         │   └──────────────────────────┘ │
         │                                │
         │   RLS Policies                 │
         │   - Select own data            │
         │   - Update own data            │
         │   - Service role access       │
         └────────────────────────────────┘
```

---

## User Flow Diagram

```
                    ┌─────────────┐
                    │   USER      │
                    │   LOGIN     │
                    └──────┬──────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  Middleware Check    │
                │  Session Valid?      │
                └──────────┬───────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
                No Session    Session Valid
                    │             │
                    ▼             ▼
              Redirect       Query DB:
              /login       onboarded=true?
                │             │
                │        ┌────┴─────┐
                │        │           │
                │        ▼           ▼
                │   YES: Go to    NO: Redirect
                │   /dashboard   /onboarding
                │        │            │
                │        │            ▼
                │        │    ┌─────────────────┐
                │        │    │   Step 1: Profile   │
                │        │    │   - Name           │
                │        │    │   - College        │
                │        │    │   - Year           │
                │        │    │   - Language       │
                │        │    └────────┬──────────┘
                │        │             │ (Next/Skip)
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │   Step 2: Goals  │
                │        │    │   - Interviews  │
                │        │    │   - DSA         │
                │        │    │   - GATE        │
                │        │    │   - Placement   │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │   Step 3: Level  │
                │        │    │   - Beginner    │
                │        │    │   - Intermediate│
                │        │    │   - Advanced    │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │ Step 4: Interests│
                │        │    │ - DSA Topics    │
                │        │    │ - CE Subjects   │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │ Step 5: Daily   │
                │        │    │ Time Commitment │
                │        │    │ - 15 min        │
                │        │    │ - 30 min        │
                │        │    │ - 1 hour        │
                │        │    │ - 2+ hours      │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │   Save Data     │
                │        │    │   to Supabase   │
                │        │    │   onboarded=✓   │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    ┌─────────────────┐
                │        │    │ Completion Screen│
                │        │    │ - Confetti 🎉  │
                │        │    │ - Success msg   │
                │        │    │ - Stats         │
                │        │    └────────┬──────────┘
                │        │             │
                │        │             ▼
                │        │    [Go to Dashboard]
                │        │             │
                └────────┴─────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  DASHBOARD   │
                  └──────────────┘
```

---

## Data Flow Diagram

```
User Input in Component
        │
        ▼
┌──────────────────────────┐
│  Local State (React)     │
│  - formData              │
├──────────────────────────┤
│ OnboardingData = {       │
│   fullName,              │
│   college,               │
│   yearOfStudy,           │
│   learningGoals[],       │
│   skillLevel,            │
│   interests[],           │
│   dailyTimeCommitment    │
│ }                        │
└──────────┬───────────────┘
           │ (Auto-save)
           ▼
┌──────────────────────────┐
│   localStorage           │
│   'onboarding_progress'  │
├──────────────────────────┤
│ {                        │
│   data: OnboardingData,  │
│   step: 1-5              │
│ }                        │
└──────────┬───────────────┘
           │ (On submit)
           ▼
┌──────────────────────────┐
│  API Route               │
│  POST /api/onboarding    │
├──────────────────────────┤
│ 1. Validate data         │
│ 2. Check auth            │
│ 3. Prepare payload       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Supabase Client         │
│  (Server-side)           │
├──────────────────────────┤
│ supabase.from('users')   │
│   .update({...})         │
│   .eq('id', userId)      │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  PostgreSQL Database     │
│  users table             │
├──────────────────────────┤
│ UPDATE users SET         │
│   onboarded = true,      │
│   learning_goals = {...},│
│   skill_level = '...',   │
│   interests = {...},     │
│   daily_time_commit='...'│
│ WHERE id = $1            │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Confirmation            │
│  Success Response ✓      │
│  (Redirect Dashboard)    │
└──────────────────────────┘
```

---

## Component Hierarchy

```
App
├── AuthProvider
│   ├── Middleware
│   │   └── Check onboarded status
│   │
│   └── Onboarding Page (if not onboarded)
│       ├── Stepper
│       │   └── Progress visualization
│       │
│       ├── Step Components (Conditional Render)
│       │   ├── ProfileSetup
│       │   │   ├── TextInput (fullName)
│       │   │   ├── TextInput (college)
│       │   │   ├── Select (yearOfStudy)
│       │   │   └── Select (language)
│       │   │
│       │   ├── LearningGoals
│       │   │   └── Checkbox[] (goals)
│       │   │
│       │   ├── SkillLevel
│       │   │   └── Radio[] (levels)
│       │   │
│       │   ├── Interests
│       │   │   ├── Tabs
│       │   │   │   ├── DSA Checkbox[]
│       │   │   │   └── CE Checkbox[]
│       │   │   │
│       │   │
│       │   └── DailyCommitment
│       │       └── Radio[] (times)
│       │
│       └── CompletionScreen (after submit)
│           ├── Particles (Confetti)
│           ├── Success Message
│           └── Stats Display
│
└── Dashboard (after onboarding complete)
```

---

## State Management Flow

```
┌─────────────────────────────────────┐
│     AuthContext                     │
│  (Global User State)                │
├─────────────────────────────────────┤
│ - user: User | null                 │
│ - loading: boolean                  │
│ - signIn(), signUp(), signOut()     │
└──────────────────┬──────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌────────────────────────────────────────┐
│    useOnboarding Hook                  │
│  (Session-level State)                │
├────────────────────────────────────────┤
│ - isOnboarded: boolean                 │
│ - currentStep: number                  │
│ - saveProgress(data, step)             │
│ - submitOnboarding(data)               │
│ - getSavedProgress()                   │
│ - clearProgress()                      │
│ - resumeOnboarding()                   │
└──────────────────┬─────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌────────────────────────────────────────┐
│    Component Local State               │
│  (Form Data)                          │
├────────────────────────────────────────┤
│ - formData: OnboardingData             │
│ - currentStep: number                  │
│ - isSubmitting: boolean                │
│ - showCompletion: boolean              │
└────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────┐
│    localStorage                        │
│  (Persistent Session Data)            │
├────────────────────────────────────────┤
│ Key: 'onboarding_progress'             │
│ {                                      │
│   data: OnboardingData,                │
│   step: number                         │
│ }                                      │
└────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────┐
│    Supabase (Server)                   │
│  (Persistent User Data)               │
├────────────────────────────────────────┤
│ PostgreSQL users table                 │
│ - onboarded: boolean                   │
│ - learning_goals: text[]               │
│ - skill_level: text                    │
│ - interests: text[]                    │
│ - daily_time_commitment: text          │
│ - etc.                                 │
└────────────────────────────────────────┘
```

---

## API Endpoint Architecture

```
┌────────────────────────────────────────────┐
│   Route Handler: /api/onboarding/route.ts  │
├────────────────────────────────────────────┤
│                  │                         │
│        ┌─────────┴──────────┐              │
│        │                    │              │
│        ▼                    ▼              │
│     POST                   GET              │
│     └─ Save Data          └─ Get Status   │
│        │                    │              │
│        ├─────────────┬──────┤              │
│        │             │      │              │
│        ▼             ▼      ▼              │
│    ┌──────────────────────────────────┐   │
│    │  Supabase Server Client          │   │
│    │  - Auth Verification             │   │
│    │  - Row Level Security            │   │
│    ├──────────────────────────────────┤   │
│    │  Database Operations             │   │
│    │  - Update users table            │   │
│    │  - Set onboarded = true          │   │
│    │  - Save learning data            │   │
│    └──────────────────────────────────┘   │
│        │                    │              │
│        ▼                    ▼              │
│    Response:           Response:         │
│    {                   {                 │
│      success: true,    onboarded: bool,  │
│      userId: UUID      currentStep: num, │
│    }                   userId: UUID      │
│                        }                 │
└────────────────────────────────────────────┘
```

---

## Middleware Logic Flow

```
Request Received
       │
       ▼
┌──────────────────────────┐
│  Extract Information     │
│  - Get session           │
│  - Get pathname          │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Is Public Route?        │
│  (/, /login, /signup)    │
└────┬───────────────┬─────┘
     │ YES           │ NO
     │               │
     ▼               ▼
  Allow         ┌──────────────────────┐
  Pass       │ Is User Authenticated? │
                │ └────┬────────┬─────┘
                │      │        │
                │   YES│        │ NO
                │      │        │
                │      ▼        ▼
                │   Continue   Redirect
                │               /login
                │
                ▼
         ┌──────────────────────┐
         │ Check Onboarded      │
         │ (if not /onboarding) │
         └────┬────────┬────────┘
              │        │
           YES│        │NO
              │        │
              ▼        ▼
           Allow   Redirect
           Pass    /onboarding
           to DB
```

---

## Database Schema Relationships

```
┌─────────────────────────────────────┐
│         users (existing)            │
├─────────────────────────────────────┤
│ id (PK) ──────────────────┐         │
│ email                     │         │
│ full_name                 │         │
│ role                      │         │
│ created_at                │         │
├─────────────────────────────────────┤
│         (NEW FIELDS)                │
├─────────────────────────────────────┤
│ onboarded: boolean ───────┤         │
│ learning_goals: text[]    │         │
│ skill_level: text         │ Links  │
│ interests: text[]         │ to     │
│ daily_time_commitment: tx │ Other  │
│ preferred_language: text  │ Tables │
│ onboarding_completed_at   │         │
│ onboarding_step: integer  │         │
└─────────────────────────────────────┘
         │
         │
    ┌────┴────────────────────────────┐
    │                                 │
    ▼                                 ▼
[learning_paths]                [user_progress]
(can be joined)                 (track progress)
```

---

## Error Handling Flow

```
┌──────────────────────────┐
│  Validation Error        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Check Field Values                  │
│  - fullName length < 2?              │
│  - goals array empty?                │
│  - interests array empty?            │
│  - missing skill level?              │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Display Error Message               │
│  - Toast notification                │
│  - Inline field error                │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Clear Error on Input Change         │
│  - Remove validation message         │
│  - Allow user to retry               │
└──────────────────────────────────────┘
```

---

## Authentication & RLS Security

```
┌────────────────────────────────────┐
│     User Login                     │
├────────────────────────────────────┤
│  Supabase Auth provides:           │
│  - JWT token in session            │
│  - User ID (UUID)                  │
│  - auth.uid() function             │
└────────┬───────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│     RLS Policies (Database)        │
├────────────────────────────────────┤
│ Policy: Users read own data        │
│ SELECT                             │
│ WHERE auth.uid() = id              │
│                                    │
│ Policy: Users update own data      │
│ UPDATE                             │
│ WHERE auth.uid() = id              │
│                                    │
│ Policy: Service role full access   │
│ ALL OPERATIONS                     │
│ WHERE auth.role() = 'service_role' │
└────────┬───────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│  Safe Operations                   │
│  - Users can't see others' data    │
│  - Users can't modify others' data │
│  - Server can manage data          │
└────────────────────────────────────┘
```

---

## Performance Optimization Strategy

```
┌────────────────────────────┐
│   Client-side Caching      │
├────────────────────────────┤
│ localStorage               │
│ - Instant load             │
│ - Resume capability        │
│ - No API call needed       │
└────────────────┬───────────┘
                 │
                 ▼
┌────────────────────────────┐
│   Component Optimization   │
├────────────────────────────┤
│ - Lazy loading             │
│ - SSR components           │
│ - Code splitting           │
│ - Memoization              │
└────────────────┬───────────┘
                 │
                 ▼
┌────────────────────────────┐
│   Database Optimization    │
├────────────────────────────┤
│ - Indexed queries          │
│ - Efficient RLS            │
│ - Connection pooling       │
│ - Minimal data transfer    │
└────────────────┬───────────┘
                 │
                 ▼
┌────────────────────────────┐
│   Network Optimization     │
├────────────────────────────┤
│ - Gzip compression         │
│ - Minimal API calls        │
│ - CDN caching              │
│ - HTTP/2 multiplexing      │
└────────────────────────────┘
```

---

## Mobile Responsive Design

```
Desktop (1024px+)
┌─────────────────────────────────────────┐
│              Header                     │
├──────────────┬──────────────┬───────────┤
│              │              │           │
│  Stepper     │  Step        │  Sidebar  │
│  (25%)       │  Content     │  (20%)    │
│              │  (55%)       │           │
│              │              │           │
│              │              │           │
│              │              │           │
└──────────────┴──────────────┴───────────┘

Tablet (768px - 1023px)
┌──────────────────────────────┐
│        Header                │
├──────────────────────────────┤
│        Stepper (full width)  │
├──────────────────────────────┤
│    Step Content (full width) │
│                              │
│                              │
└──────────────────────────────┘

Mobile (< 768px)
┌──────────────┐
│   Header     │
├──────────────┤
│  Stepper     │
│  (compact)   │
├──────────────┤
│ Step Content │
│  (fullwidth) │
│              │
│              │
├──────────────┤
│  Buttons     │
│  (stacked)   │
└──────────────┘
```

---

## Testing Strategy

```
┌────────────────────────────────────┐
│        Unit Tests                  │
│   (onboarding-utils.test.ts)       │
├────────────────────────────────────┤
│ ✓ Validation logic                 │
│ ✓ Recommendation algorithm         │
│ ✓ Study schedule calculation       │
│ ✓ Completion messages              │
│ ✓ Edge cases                       │
└────────┬─────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│      Component Tests               │
│   (onboarding.test.tsx)            │
├────────────────────────────────────┤
│ ✓ Component rendering              │
│ ✓ Form validation                  │
│ ✓ User interactions                │
│ ✓ Navigation flow                  │
│ ✓ Accessibility                    │
└────────┬─────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│     Integration Tests              │
│   (Manual testing checklist)       │
├────────────────────────────────────┤
│ ✓ Complete flow                    │
│ ✓ API integration                  │
│ ✓ Database save                    │
│ ✓ Middleware redirect              │
│ ✓ Mobile responsive                │
└────────────────────────────────────┘
```

---

## Deployment Environment

```
┌──────────────────────────────────────────────┐
│          Development                         │
│  npm rundev                                  │
│  - Hot reload enabled                        │
│  - Debug logging                             │
│  - localhost:3000                            │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│          Staging                             │
│  npm run build && npm start                  │
│  - Production build                          │
│  - Full testing                              │
│  - staging.example.com                       │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│          Production                          │
│  Vercel / Docker deployment                  │
│  - Optimized build                           │
│  - Edge caching                              │
│  - Analytics enabled                         │
│  - Error tracking                            │
│  - app.example.com                           │
└──────────────────────────────────────────────┘
```

---

**Last Updated:** 2026-02-06
**Diagram Version:** 1.0
