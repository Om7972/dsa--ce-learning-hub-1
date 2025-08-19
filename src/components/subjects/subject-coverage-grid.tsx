"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Circle, 
  Play,
  Filter,
  Users,
  Brain,
  Code,
  Database
} from "lucide-react";

interface Subject {
  id: string;
  title: string;
  description: string;
  category: 'dsa' | 'programming' | 'theory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  created_at: string;
  updated_at: string;
}

interface Topic {
  id: string;
  subject_id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_minutes: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  topic_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  time_spent_minutes: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

interface SubjectWithProgress extends Subject {
  topics: Topic[];
  progress: UserProgress[];
  completionPercentage: number;
  totalTopics: number;
  completedTopics: number;
}

const categoryIcons = {
  dsa: Database,
  programming: Code,
  theory: Brain
};

const categoryColors = {
  dsa: "bg-blue-100 text-blue-700 border-blue-200",
  programming: "bg-green-100 text-green-700 border-green-200",
  theory: "bg-purple-100 text-purple-700 border-purple-200"
};

const difficultyColors = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700"
};

export const SubjectCoverageGrid = () => {
  const [subjects, setSubjects] = useState<SubjectWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<SubjectWithProgress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatingProgress, setUpdatingProgress] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch subjects
      const subjectsResponse = await fetch('/api/subjects');
      if (!subjectsResponse.ok) throw new Error('Failed to fetch subjects');
      const subjectsData: Subject[] = await subjectsResponse.json();

      // Fetch topics for each subject
      const subjectsWithData = await Promise.all(
        subjectsData.map(async (subject) => {
          const [topicsResponse, progressResponse] = await Promise.all([
            fetch(`/api/topics?subject_id=${subject.id}`),
            fetch(`/api/user-progress?subject_id=${subject.id}`)
          ]);

          const topics: Topic[] = topicsResponse.ok ? await topicsResponse.json() : [];
          const progress: UserProgress[] = progressResponse.ok ? await progressResponse.json() : [];

          const completedTopics = progress.filter(p => p.status === 'completed').length;
          const totalTopics = topics.length;
          const completionPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

          return {
            ...subject,
            topics: topics.sort((a, b) => a.order_index - b.order_index),
            progress,
            completionPercentage,
            totalTopics,
            completedTopics
          };
        })
      );

      setSubjects(subjectsWithData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateTopicProgress = async (topicId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    try {
      setUpdatingProgress(topicId);
      
      const response = await fetch('/api/user-progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_id: topicId,
          status,
          completion_percentage: status === 'completed' ? 100 : status === 'in_progress' ? 50 : 0
        }),
      });

      if (!response.ok) throw new Error('Failed to update progress');

      // Refresh data
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
    } finally {
      setUpdatingProgress(null);
    }
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openSubjectDialog = (subject: SubjectWithProgress) => {
    setSelectedSubject(subject);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-64">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center">
          <div className="text-red-500 mb-2">Error loading subjects</div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchData}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant={selectedCategory === "dsa" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("dsa")}
          >
            <Database className="w-4 h-4 mr-2" />
            DSA
          </Button>
          <Button
            variant={selectedCategory === "programming" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("programming")}
          >
            <Code className="w-4 h-4 mr-2" />
            Programming
          </Button>
          <Button
            variant={selectedCategory === "theory" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("theory")}
          >
            <Brain className="w-4 h-4 mr-2" />
            Theory
          </Button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const CategoryIcon = categoryIcons[subject.category];
          
          return (
            <Card 
              key={subject.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => openSubjectDialog(subject)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {subject.title}
                    </CardTitle>
                  </div>
                  <Badge className={`${categoryColors[subject.category]} text-xs`}>
                    {subject.category.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {subject.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={difficultyColors[subject.difficulty]}>
                      {subject.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{subject.estimated_hours}h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="w-3 h-3" />
                    <span>{subject.totalTopics} topics</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {subject.completedTopics}/{subject.totalTopics} completed
                    </span>
                  </div>
                  <Progress 
                    value={subject.completionPercentage} 
                    className="h-2"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {Math.round(subject.completionPercentage)}%
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSubjectDialog(subject);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Topics
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No subjects found</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedCategory !== "all" 
              ? "Try adjusting your search or filters" 
              : "No subjects available"}
          </p>
        </div>
      )}

      {/* Subject Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedSubject && (
                <>
                  {React.createElement(categoryIcons[selectedSubject.category], { className: "w-6 h-6" })}
                  {selectedSubject.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubject && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {selectedSubject.completionPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold">
                    {selectedSubject.completedTopics}/{selectedSubject.totalTopics}
                  </div>
                  <div className="text-sm text-muted-foreground">Topics Done</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    {selectedSubject.estimated_hours}h
                  </div>
                  <div className="text-sm text-muted-foreground">Est. Time</div>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Topics ({selectedSubject.topics.length})</h4>
                {selectedSubject.topics.map((topic, index) => {
                  const topicProgress = selectedSubject.progress.find(p => p.topic_id === topic.id);
                  const status = topicProgress?.status || 'not_started';
                  const isUpdating = updatingProgress === topic.id;
                  
                  return (
                    <Card key={topic.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {index + 1}.
                            </span>
                            <h5 className="font-medium">{topic.title}</h5>
                            <Badge 
                              variant="outline" 
                              className={difficultyColors[topic.difficulty]}
                            >
                              {topic.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{topic.estimated_minutes} min</span>
                            </div>
                            {topicProgress && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{topicProgress.time_spent_minutes} min spent</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {status === 'in_progress' && (
                            <Circle className="w-5 h-5 text-amber-500 fill-current" />
                          )}
                          {status === 'not_started' && (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                          
                          <div className="flex gap-1">
                            {status === 'not_started' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTopicProgress(topic.id, 'in_progress')}
                                disabled={isUpdating}
                              >
                                Start
                              </Button>
                            )}
                            {status === 'in_progress' && (
                              <Button
                                size="sm"
                                onClick={() => updateTopicProgress(topic.id, 'completed')}
                                disabled={isUpdating}
                              >
                                Complete
                              </Button>
                            )}
                            {status === 'completed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTopicProgress(topic.id, 'in_progress')}
                                disabled={isUpdating}
                              >
                                Restart
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};