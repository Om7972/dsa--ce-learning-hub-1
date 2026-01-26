# 🚀 DSA & CE Learning Hub

A comprehensive, modern learning platform for Data Structures & Algorithms and Computer Engineering subjects with premium UI/UX, gamification, and interactive features.

## ✨ Features

### 🎨 Premium UI/UX
- **Animated Top Navigation** - Sleek navbar with user avatar, notifications, streak/points badges
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Beautiful dark theme with smooth transitions
- **Framer Motion Animations** - Smooth, professional animations throughout
- **Gradient Accents** - Modern gradient effects and glassmorphism

### 📚 Learning Features

#### Learning Paths
- Structured learning journeys from beginner to advanced
- Progress tracking for each path
- Difficulty levels (Beginner, Intermediate, Advanced)
- Topic tags and module counts
- Enrollment system with continue learning

#### DSA Practice Arena
- Curated problem sets with difficulty levels
- Problem filtering by category and difficulty
- Acceptance rate tracking
- Company tags (Google, Amazon, Microsoft, etc.)
- Solve/Attempted/Unsolved status tracking
- Search functionality

#### CE Subjects
- Comprehensive coverage of core CS subjects
- Semester-wise organization
- Progress tracking per subject
- Resource counts (Videos, Notes, Assignments)
- Upcoming exam alerts
- Topic completion tracking

### 📊 Progress Tracking
- **Weekly Activity Chart** - Visual representation of daily problem-solving
- **Skill Mastery** - Progress across different DSA topics
- **Achievements System** - Unlock badges and earn rewards
- **Streak Tracking** - Current and longest streaks
- **Total Hours** - Time spent learning

### 🎮 Gamification
- **Streak System** - Daily streak tracking with flame icon
- **Points/XP** - Earn points for completing tasks
- **Achievements** - Unlock badges (First Steps, Week Warrior, Problem Solver, etc.)
- **Leaderboards** - Compete with peers (coming soon)

### 🛠️ User Features

#### Profile & Settings
- **Profile Management** - Update personal information and avatar
- **Notification Preferences** - Customize email, push, and achievement notifications
- **Security** - Password management and account security
- **Appearance** - Theme selection (Light/Dark/System)
- **Language & Region** - Localization settings

#### Support System
- **FAQ Section** - Searchable frequently asked questions
- **Contact Methods** - Email, Live Chat, Phone support
- **Help Resources** - Documentation, Video Tutorials, Community Forum
- **Contact Form** - Direct message to support team

### 🔔 Notifications
- Real-time notification system
- Unread count badges
- Notification categories (Assignments, Achievements, Reminders)
- Notification preferences in settings

## 🎯 Pages

### Main Pages
- **Landing Page** (`/`) - Hero section with features showcase
- **Dashboard** (`/dashboard`) - Overview with stats and activity
- **Learning Paths** (`/learning-paths`) - Structured learning journeys
- **DSA Practice** (`/dsa-practice`) - Problem-solving arena
- **CE Subjects** (`/ce-subjects`) - Computer Engineering subjects
- **Progress** (`/progress`) - Detailed analytics and achievements
- **Profile** (`/profile`) - User profile and stats
- **Settings** (`/settings`) - Account and preferences management
- **Support** (`/support`) - Help and contact

### Auth Pages
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library

### UI Components
- Avatar, Badge, Button, Card, Dialog
- Dropdown Menu, Input, Label, Progress
- Switch, Tabs, Textarea, Tooltip
- Custom animated components

### Backend (Planned)
- **Supabase** - Authentication and database
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd dsa--ce-learning-hub-1

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── ce-subjects/       # CE Subjects page
│   ├── dashboard/         # Dashboard page
│   ├── dsa-practice/      # DSA Practice page
│   ├── learning-paths/    # Learning Paths page
│   ├── progress/          # Progress page
│   ├── settings/          # Settings page
│   ├── support/           # Support page
│   └── page.tsx           # Landing page
├── components/
│   ├── layout/            # Layout components (TopNav, Sidebar, Footer)
│   ├── ui/                # Reusable UI components
│   └── dashboard/         # Dashboard-specific components
└── lib/                   # Utilities and helpers
```

## 🎨 Design System

### Colors
- **Primary** - Blue gradient (for CTAs and accents)
- **Secondary** - Purple gradient (for highlights)
- **Success** - Green (for completed items)
- **Warning** - Yellow/Orange (for alerts)
- **Error** - Red (for errors and danger zones)

### Typography
- **Headings** - Bold, large sizes with gradients
- **Body** - Readable, accessible font sizes
- **Code** - Monospace for code snippets

### Spacing
- Consistent spacing scale (4px base)
- Generous padding for cards and sections
- Proper margins for readability

## 🔐 Authentication

Currently using mock authentication. Integration with Supabase Auth is planned:
- Email/Password authentication
- Social login (Google, GitHub)
- JWT-based sessions
- Protected routes with middleware

## 📊 Data Models

### User
- Profile information
- Learning progress
- Achievements
- Streak data

### Problem
- Title, description, difficulty
- Category and tags
- Test cases
- Solution templates

### Subject
- Course information
- Topics and modules
- Resources (videos, notes)
- Progress tracking

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Premium UI/UX design
- ✅ All main pages created
- ✅ Navigation system
- ✅ Progress tracking UI
- ✅ Settings and support pages

### Phase 2 (Next)
- 🔄 Supabase integration
- 🔄 Real authentication
- 🔄 Database setup
- 🔄 API implementation

### Phase 3 (Future)
- 📝 Code editor integration
- 📝 Real-time collaboration
- 📝 AI-powered hints
- 📝 Video lessons
- 📝 Discussion forums
- 📝 Leaderboards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Radix UI for accessible components
- Framer Motion for animations
- Lucide for beautiful icons
- Tailwind CSS for styling utilities

---

Built with ❤️ for Computer Engineering students
