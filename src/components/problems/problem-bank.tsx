"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Search, Filter, Code, CheckCircle, XCircle, Clock, Play, History, Tag, Users } from "lucide-react";
import React from 'react';
import { ProblemFilters } from "./problem-filters";
import { createSupabaseBrowserClient } from '@/lib/supabase';

import { Database } from '@/lib/supabase';

type Problem = Database['public']['Tables']['dsa_problems']['Row'];
type Submission = Database['public']['Tables']['submissions']['Row'];

interface ProblemStatus {
  problemId: number;
  status: "solved" | "attempted" | "unsolved";
  submissions: Submission[];
}

const difficultyConfig: { [key: string]: { color: string; label: string } } = {
  easy: { color: "bg-green-100 text-green-800 border-green-200", label: "Easy" },
  medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Medium" },
  hard: { color: "bg-red-100 text-red-800 border-red-200", label: "Hard" }
};

const statusConfig = {
  accepted: { icon: CheckCircle, color: "text-green-600", label: "Accepted" },
  "wrong-answer": { icon: XCircle, color: "text-red-600", label: "Wrong Answer" },
  "time-limit-exceeded": { icon: Clock, color: "text-yellow-600", label: "Time Limit" },
  "runtime-error": { icon: XCircle, color: "text-orange-600", label: "Runtime Error" },
  pending: { icon: Clock, color: "text-blue-600", label: "Pending" }
};

export const ProblemBank = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [problemStatuses, setProblemStatuses] = useState<Map<number, ProblemStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected problem and submission
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [userCode, setUserCode] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [activeTab, setActiveTab] = useState("description");

  const supabase = createSupabaseBrowserClient();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        const { data: problemsData, error: problemsError } = await supabase.from('dsa_problems').select('*');
        if (problemsError) throw problemsError;

        let submissionsData: Submission[] = [];
        if (user) {
          const { data, error: submissionsError } = await supabase.from('submissions').select('*').eq('user_id', user.id);
          if (submissionsError) throw submissionsError;
          submissionsData = data || [];
        }

        setProblems(problemsData || []);
        setUserSubmissions(submissionsData);

        // Calculate problem statuses
        const statusMap = new Map<number, ProblemStatus>();
        (problemsData || []).forEach((problem) => {
          const problemSubmissions = submissionsData.filter(
            (sub) => sub.problem_id === problem.id
          );

          let status: "solved" | "attempted" | "unsolved" = "unsolved";
          if (problemSubmissions.some((sub) => sub.status === "accepted")) {
            status = "solved";
          } else if (problemSubmissions.length > 0) {
            status = "attempted";
          }

          statusMap.set(problem.id, {
            problemId: problem.id,
            status,
            submissions: problemSubmissions
          });
        });

        setProblemStatuses(statusMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const topics = useMemo(() => {
    const topicSet = new Set(problems.map(p => p.topic));
    return Array.from(topicSet);
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (problem.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
      const matchesTopic = topicFilter === "all" || problem.topic === topicFilter;

      const problemStatus = problemStatuses.get(problem.id);
      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "solved" && problemStatus?.status === "solved") ||
        (statusFilter === "attempted" && problemStatus?.status === "attempted") ||
        (statusFilter === "unsolved" && problemStatus?.status === "unsolved");

      return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus;
    });
  }, [problems, searchTerm, difficultyFilter, topicFilter, statusFilter, problemStatuses]);

  const handleSubmitCode = async () => {
    if (!selectedProblem || !userCode.trim()) return;

    try {
      setSubmissionStatus("submitting");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated for submission.");

      const newSubmission: Omit<Submission, 'id' | 'created_at'> = {
        user_id: user.id,
        problem_id: selectedProblem.id,
        code: userCode,
        language: "javascript",
        status: "pending", // Default status, will be updated by a backend process
      };

      const { data: insertedData, error: submissionError } = await supabase
        .from('submissions')
        .insert(newSubmission)
        .select()
        .single();

      if (submissionError) throw submissionError;

      if (insertedData) {
        setUserSubmissions(prev => [...prev, insertedData]);
        setProblemStatuses(prev => {
          const newMap = new Map(prev);
          const problemStatus = newMap.get(selectedProblem.id) || { problemId: selectedProblem.id, status: 'unsolved', submissions: [] };

          const updatedSubmissions = [...problemStatus.submissions, insertedData];
          let newStatus: "solved" | "attempted" | "unsolved" = 'attempted';
          if (updatedSubmissions.some(s => s.status === 'accepted')) {
            newStatus = 'solved';
          }

          newMap.set(selectedProblem.id, { ...problemStatus, submissions: updatedSubmissions, status: newStatus });
          return newMap;
        });
      }

      setSubmissionStatus("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setSubmissionStatus("idle");
    }
  };

  const getStatusIcon = (problemId: number) => {
    const status = problemStatuses.get(problemId)?.status;
    switch (status) {
      case "solved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "attempted":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-48">
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
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Problem Bank</h1>
          <Badge variant="outline" className="text-sm">
            {filteredProblems.length} problems
          </Badge>
        </div>

        {/* Filters */}
        <ProblemFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          topicFilter={topicFilter}
          setTopicFilter={setTopicFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          topics={topics}
        />
      </div>

      {/* Problem Grid */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => {
            const problemStatus = problemStatuses.get(problem.id);
            return (
              <Dialog key={problem.id} onOpenChange={(open) => {
                if (open) {
                  setSelectedProblem(problem);
                  setUserCode("// Your code here");
                  setActiveTab("description");
                  setSubmissionStatus("idle");
                }
              }}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(problem.id)}
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {problem.title}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className={difficultyConfig[problem.difficulty].color}
                        >
                          {difficultyConfig[problem.difficulty].label}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {problem.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{problem.topic}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
                  <DialogHeader className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(problem.id)}
                        <DialogTitle className="text-xl">{problem.title}</DialogTitle>
                        <Badge
                          variant="outline"
                          className={difficultyConfig[problem.difficulty].color}
                        >
                          {difficultyConfig[problem.difficulty].label}
                        </Badge>
                      </div>
                    </div>
                  </DialogHeader>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                    <div className="border-b px-6">
                      <TabsList className="w-full justify-start">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="solution">Solution</TabsTrigger>
                        <TabsTrigger value="submissions">Submissions</TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <TabsContent value="description" className="h-full p-0 m-0">
                        <ScrollArea className="h-full">
                          <div className="p-6 space-y-6">
                            <div className="prose dark:prose-invert max-w-none">
                              <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                              <p className="text-muted-foreground whitespace-pre-wrap">{problem.description}</p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">Sample Input:</h4>
                              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm font-mono">
                                <p>{problem.sample_input}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">Sample Output:</h4>
                              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm font-mono">
                                <p>{problem.sample_output}</p>
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>Your Solution (JavaScript)</Label>
                                  <Button
                                    onClick={handleSubmitCode}
                                    disabled={submissionStatus === "submitting" || !userCode.trim()}
                                  >
                                    {submissionStatus === "submitting" ? (
                                      <>
                                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                                        Submitting...
                                      </>
                                    ) : (
                                      <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Run Code
                                      </>
                                    )}
                                  </Button>
                                </div>
                                <Textarea
                                  value={userCode}
                                  onChange={(e) => setUserCode(e.target.value)}
                                  className="font-mono min-h-[300px]"
                                  placeholder="// Write your solution here..."
                                />
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="solution" className="h-full p-6 m-0 overflow-auto">
                        <Alert>
                          <AlertTitle>Solution Template</AlertTitle>
                          <AlertDescription>
                              <pre className="mt-2 p-4 bg-muted rounded-md overflow-x-auto text-sm">
                              {(problem as any).solutionTemplate || "// No template available"}
                            </pre>
                          </AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="submissions" className="h-full p-6 m-0 overflow-auto">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Your Submissions</h3>
                          {problemStatuses.get(problem.id)?.submissions.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No submissions yet.</p>
                          ) : (
                            <div className="space-y-2">
                              {problemStatuses.get(problem.id)?.submissions.map((sub) => (
                                <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-2">
                                    {statusConfig[sub.status as keyof typeof statusConfig] && React.createElement(statusConfig[sub.status as keyof typeof statusConfig].icon, {
                                      className: `w-4 h-4 ${statusConfig[sub.status as keyof typeof statusConfig].color}`
                                    })}
                                    <span className={statusConfig[sub.status as keyof typeof statusConfig]?.color || ""}>
                                      {statusConfig[sub.status as keyof typeof statusConfig]?.label || sub.status}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(sub.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-lg border-2 border-dashed border-muted">
          <Code className="w-16 h-16 text-muted-foreground mx-auto mb-6" strokeWidth={1.5} />
          <h3 className="text-2xl font-semibold mb-2">No Problems Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any problems matching your search or filter criteria. Try a different query!
          </p>
        </div>
      )}
    </div>
  );
};