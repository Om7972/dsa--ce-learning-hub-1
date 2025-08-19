"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Flame
} from "lucide-react"

interface StudySession {
  id: string
  subject: string
  topic: string
  time: string
  duration: number
  completed: boolean
  priority: "high" | "medium" | "low"
}

interface Subject {
  id: string
  name: string
  code: string
  progress: number
  totalHours: number
  completedHours: number
  color: string
}

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

export default function StudyTimetableDashboard() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: "1",
      subject: "Data Structures",
      topic: "Binary Trees",
      time: "09:00",
      duration: 90,
      completed: true,
      priority: "high"
    },
    {
      id: "2",
      subject: "Algorithms",
      topic: "Dynamic Programming",
      time: "11:00",
      duration: 120,
      completed: false,
      priority: "high"
    },
    {
      id: "3",
      subject: "Computer Networks",
      topic: "TCP/IP Protocol",
      time: "14:00",
      duration: 60,
      completed: false,
      priority: "medium"
    },
    {
      id: "4",
      subject: "Database Systems",
      topic: "Query Optimization",
      time: "16:00",
      duration: 90,
      completed: false,
      priority: "medium"
    }
  ])

  const subjects: Subject[] = [
    {
      id: "1",
      name: "Data Structures & Algorithms",
      code: "DSA",
      progress: 78,
      totalHours: 120,
      completedHours: 94,
      color: "bg-chart-1"
    },
    {
      id: "2",
      name: "Computer Networks",
      code: "CN",
      progress: 65,
      totalHours: 80,
      completedHours: 52,
      color: "bg-chart-2"
    },
    {
      id: "3",
      name: "Database Systems",
      code: "DBMS",
      progress: 82,
      totalHours: 100,
      completedHours: 82,
      color: "bg-chart-3"
    },
    {
      id: "4",
      name: "Operating Systems",
      code: "OS",
      progress: 59,
      totalHours: 90,
      completedHours: 53,
      color: "bg-chart-4"
    }
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Implement Red-Black Tree",
      subject: "Data Structures",
      dueDate: "2024-01-15",
      priority: "high",
      completed: false
    },
    {
      id: "2",
      title: "Network Protocol Analysis",
      subject: "Computer Networks",
      dueDate: "2024-01-18",
      priority: "medium",
      completed: false
    },
    {
      id: "3",
      title: "Database Query Optimization",
      subject: "Database Systems",
      dueDate: "2024-01-20",
      priority: "high",
      completed: true
    },
    {
      id: "4",
      title: "Process Synchronization Report",
      subject: "Operating Systems",
      dueDate: "2024-01-22",
      priority: "medium",
      completed: false
    }
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentWeekHours = [2.5, 4.0, 3.5, 5.0, 4.5, 3.0, 2.0]
  const studyStreak = 15
  const totalStudyHours = 24.5

  const toggleSessionComplete = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, completed: !session.completed }
        : session
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground"
      case "medium": return "bg-warning text-white"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 7) return `${diffDays} days`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-background min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Study Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track your progress and manage your study schedule
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2 border">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">{studyStreak} day streak</span>
            </div>
            <Button className="bg-primary hover:bg-primary-light">
              <Calendar className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-surface border border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl font-semibold font-display">{totalStudyHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-semibold font-display">
                    {sessions.filter(s => s.completed).length}/{sessions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-xl font-semibold font-display">
                    {Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Award className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-xl font-semibold font-display">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Overview */}
          <Card className="bg-surface border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display">
                <BarChart3 className="h-5 w-5 text-primary" />
                Weekly Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    <div 
                      className={`h-16 rounded-lg border-2 transition-all cursor-pointer flex items-end justify-center pb-2 ${
                        selectedDay === index 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedDay(index)}
                    >
                      <div 
                        className="w-3 bg-primary rounded-t"
                        style={{ height: `${(currentWeekHours[index] / 5) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1 font-medium">{currentWeekHours[index]}h</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="bg-surface border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                    session.completed ? 'bg-success/5 border-success/20' : 'bg-surface border-border'
                  }`}
                >
                  <Checkbox 
                    checked={session.completed}
                    onCheckedChange={() => toggleSessionComplete(session.id)}
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${session.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {session.subject}
                      </span>
                      <Badge variant="outline" size="sm" className={getPriorityColor(session.priority)}>
                        {session.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{session.topic}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.time} • {session.duration} min
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Progress */}
          <Card className="bg-surface border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display">
                <BookOpen className="h-5 w-5 text-primary" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <span className="text-sm font-medium">{subject.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {subject.completedHours}/{subject.totalHours}h
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={subject.progress} className="flex-1" />
                    <span className="text-sm font-medium min-w-[3rem] text-right">
                      {subject.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-surface border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display">
                <Target className="h-5 w-5 text-primary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                    assignment.completed ? 'bg-success/5 border-success/20' : 'bg-surface border-border'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {assignment.completed ? (
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-medium ${assignment.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {assignment.title}
                        </span>
                        <Badge variant="outline" size="sm" className={getPriorityColor(assignment.priority)}>
                          {assignment.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {formatDate(assignment.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}