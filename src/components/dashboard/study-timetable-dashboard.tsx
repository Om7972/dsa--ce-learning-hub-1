"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, BookOpen, TrendingUp, Plus, Edit, Trash2, RefreshCcw, AlertCircle } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface StudySchedule {
  id: string;
  subject_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  date: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  subject_id: string;
  total_hours: number;
  completed_sessions: number;
  last_session: string;
  streak_days: number;
  created_at: string;
  updated_at: string;
}

interface NewScheduleForm {
  subject_id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
}

export const StudyTimetableDashboard = () => {
  const [schedules, setSchedules] = useState<StudySchedule[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"daily" | "weekly">("daily");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<StudySchedule | null>(null);
  const [formData, setFormData] = useState<NewScheduleForm>({
    subject_id: "",
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    start_time: "",
    end_time: ""
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [schedulesRes, subjectsRes, progressRes] = await Promise.all([
        fetch('/api/study-schedules'),
        fetch('/api/subjects'),
        fetch('/api/user-progress')
      ]);

      if (!schedulesRes.ok || !subjectsRes.ok || !progressRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [schedulesData, subjectsData, progressData] = await Promise.all([
        schedulesRes.json(),
        subjectsRes.json(),
        progressRes.json()
      ]);

      setSchedules(schedulesData);
      setSubjects(subjectsData);
      setProgress(progressData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSubjectById = (id: string) => subjects.find(s => s.id === id);

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(s => s.date === today);
  };

  const getSelectedDateSchedules = () => {
    return schedules.filter(s => s.date === selectedDate);
  };

  const getWeekSchedules = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekSchedules = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      weekSchedules.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        schedules: schedules.filter(s => s.date === dateStr)
      });
    }
    return weekSchedules;
  };

  const calculateStats = () => {
    const totalHours = progress.reduce((sum, p) => sum + p.total_hours, 0);
    const completedSessions = progress.reduce((sum, p) => sum + p.completed_sessions, 0);
    const maxStreak = Math.max(...progress.map(p => p.streak_days), 0);
    const upcomingSessions = schedules.filter(s => !s.is_completed && new Date(s.date) >= new Date()).length;
    
    return { totalHours, completedSessions, maxStreak, upcomingSessions };
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/study-schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create schedule');

      await fetchData();
      setIsCreateModalOpen(false);
      setFormData({
        subject_id: "",
        title: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
        start_time: "",
        end_time: ""
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create schedule');
    }
  };

  const handleUpdateSchedule = async (id: string, updates: Partial<StudySchedule>) => {
    try {
      const response = await fetch(`/api/study-schedules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update schedule');

      await fetchData();
      setEditingSchedule(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    
    try {
      const response = await fetch(`/api/study-schedules/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete schedule');

      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete schedule');
    }
  };

  const toggleComplete = async (schedule: StudySchedule) => {
    await handleUpdateSchedule(schedule.id, { is_completed: !schedule.is_completed });
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error loading data</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchData} className="mt-4" variant="outline">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Dashboard</h1>
          <p className="text-muted-foreground">Manage your study schedule and track progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Study Session</DialogTitle>
                <DialogDescription>
                  Schedule a new study session for your subjects
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSchedule} className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject_id} onValueChange={(value) => setFormData(prev => ({ ...prev, subject_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Study session title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Optional description"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">End Time</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Session</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}</div>
            <p className="text-xs text-muted-foreground">
              Study time completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Sessions finished
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.maxStreak}</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
            <p className="text-xs text-muted-foreground">
              Sessions scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Study Schedule</CardTitle>
                <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "daily" | "weekly")}>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto"
                />
              </div>
            </CardHeader>
            <CardContent>
              {activeView === "daily" ? (
                <div className="space-y-4">
                  {getSelectedDateSchedules().length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No sessions scheduled for this date</p>
                    </div>
                  ) : (
                    getSelectedDateSchedules()
                      .sort((a, b) => a.start_time.localeCompare(b.start_time))
                      .map(schedule => {
                        const subject = getSubjectById(schedule.subject_id);
                        return (
                          <div
                            key={schedule.id}
                            className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${
                              schedule.is_completed 
                                ? 'bg-green-50 border-l-green-500 opacity-75' 
                                : 'bg-card border-l-primary'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className={`font-semibold ${schedule.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {schedule.title}
                                  </h4>
                                  {subject && (
                                    <Badge variant="secondary" style={{ backgroundColor: subject.color + '20', color: subject.color }}>
                                      {subject.name}
                                    </Badge>
                                  )}
                                  {schedule.is_completed && (
                                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-mute