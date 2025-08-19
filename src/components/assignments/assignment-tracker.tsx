"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus, Search, Filter, SortAsc, SortDesc, Edit, Trash2, Clock, AlertTriangle, CheckCircle, Eye, EyeOff, BookOpen, Target, Calendar as CalendarIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dueDate: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
}

interface AssignmentFormData {
  title: string;
  description: string;
  subjectId: string;
  dueDate: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'points' | 'difficulty'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [expandedAssignments, setExpandedAssignments] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const [formData, setFormData] = useState<AssignmentFormData>({
    title: '',
    description: '',
    subjectId: '',
    dueDate: '',
    points: 100,
    difficulty: 'Medium'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assignmentsResponse, subjectsResponse] = await Promise.all([
        fetch('/api/assignments'),
        fetch('/api/subjects')
      ]);

      if (!assignmentsResponse.ok || !subjectsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const assignmentsData = await assignmentsResponse.json();
      const subjectsData = await subjectsResponse.json();

      setAssignments(assignmentsData);
      setSubjects(subjectsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const getDueDateStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'due-today';
    if (diffDays <= 3) return 'due-soon';
    return 'upcoming';
  };

  const getDueDateBadge = (dueDate: string, status: string) => {
    const dueDateStatus = getDueDateStatus(dueDate);
    const date = new Date(dueDate).toLocaleDateString();

    switch (dueDateStatus) {
      case 'overdue':
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Overdue {date}</Badge>;
      case 'due-today':
        return <Badge variant="destructive" className="gap-1"><Clock className="w-3 h-3" />Due Today</Badge>;
      case 'due-soon':
        return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" />Due {date}</Badge>;
      default:
        return <Badge variant="outline" className="gap-1"><CalendarIcon className="w-3 h-3" />{date}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 gap-1"><CheckCircle className="w-3 h-3" />Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 gap-1"><Clock className="w-3 h-3" />In Progress</Badge>;
      case 'Overdue':
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Overdue</Badge>;
      default:
        return <Badge variant="outline" className="gap-1">Not Started</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{difficulty}</Badge>;
  };

  const filteredAndSortedAssignments = assignments
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || assignment.subjectId === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'all' || assignment.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;

      return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingAssignment ? `/api/assignments/${editingAssignment.id}` : '/api/assignments';
      const method = editingAssignment ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save assignment');
      }

      await fetchData();
      toast.success(editingAssignment ? 'Assignment updated successfully' : 'Assignment created successfully');
      
      setIsCreateDialogOpen(false);
      setIsEditDialogOpen(false);
      setEditingAssignment(null);
      setFormData({
        title: '',
        description: '',
        subjectId: '',
        dueDate: '',
        points: 100,
        difficulty: 'Medium'
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      subjectId: assignment.subjectId,
      dueDate: assignment.dueDate.split('T')[0],
      points: assignment.points,
      difficulty: assignment.difficulty
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;

    try {
      const response = await fetch(`/api/assignments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete assignment');
      }

      await fetchData();
      toast.success('Assignment deleted successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedAssignments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedAssignments(newExpanded);
  };

  const toggleSort = (field: 'dueDate' | 'points' | 'difficulty') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Error Loading Assignments</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchData} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignment Tracker</h1>
          <p className="text-muted-foreground">Manage and track your assignments</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Add a new assignment to track progress and deadlines.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subjectId} onValueChange={(value) => setFormData({ ...formData, subjectId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="points">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        min="1"
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Assignment</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          