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
import { Search, Filter, Code, CheckCircle, XCircle, Clock, Play, History, Tag, Users } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tags: string[];
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  solutionTemplate?: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  constraints: string[];
}

interface UserSubmission {
  id: string;
  problemId: string;
  code: string;
  language: string;
  status: "accepted" | "wrong-answer" | "time-limit-exceeded" | "runtime-error" | "pending";
  submittedAt: string;
  runtime?: number;
  memory?: number;
}

interface ProblemStatus {
  problemId: string;
  status: "solved" | "attempted" | "unsolved";
  submissions: UserSubmission[];
}

const difficultyConfig = {
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
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([]);
  const [problemStatuses, setProblemStatuses] = useState<Map<string, ProblemStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Selected problem and submission
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [userCode, setUserCode] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [activeTab, setActiveTab] = useState("description");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, submissionsRes] = await Promise.all([
          fetch("/api/problems"),
          fetch("/api/user-submissions")
        ]);

        if (!problemsRes.ok || !submissionsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const problemsData = await problemsRes.json();
        const submissionsData = await submissionsRes.json();

        setProblems(problemsData);
        setUserSubmissions(submissionsData);

        // Calculate problem statuses
        const statusMap = new Map<string, ProblemStatus>();
        problemsData.forEach((problem: Problem) => {
          const problemSubmissions = submissionsData.filter(
            (sub: UserSubmission) => sub.problemId === problem.id
          );
          
          let status: "solved" | "attempted" | "unsolved" = "unsolved";
          if (problemSubmissions.some((sub: UserSubmission) => sub.status === "accepted")) {
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
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(problems.map(p => p.category));
    return Array.from(categorySet);
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === "all" || problem.category === categoryFilter;
      
      const problemStatus = problemStatuses.get(problem.id);
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "solved" && problemStatus?.status === "solved") ||
        (statusFilter === "attempted" && problemStatus?.status === "attempted") ||
        (statusFilter === "unsolved" && problemStatus?.status === "unsolved");

      return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
    });
  }, [problems, searchTerm, difficultyFilter, categoryFilter, statusFilter, problemStatuses]);

  const handleSubmitCode = async () => {
    if (!selectedProblem || !userCode.trim()) return;

    try {
      setSubmissionStatus("submitting");
      
      const response = await fetch("/api/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: selectedProblem.id,
          code: userCode,
          language: "javascript"
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();
      setSubmissionStatus("submitted");
      
      // Refresh submissions
      const submissionsRes = await fetch("/api/user-submissions");
      const submissionsData = await submissionsRes.json();
      setUserSubmissions(submissionsData);
      
      // Update problem status
      const problemSubmissions = submissionsData.filter(
        (sub: UserSubmission) => sub.problemId === selectedProblem.id
      );
      
      let status: "solved" | "attempted" | "unsolved" = "unsolved";
      if (problemSubmissions.some((sub: UserSubmission) => sub.status === "accepted")) {
        status = "solved";
      } else if (problemSubmissions.length > 0) {
        status = "attempted";
      }

      setProblemStatuses(prev => new Map(prev.set(selectedProblem.id, {
        problemId: selectedProblem.id,
        status,
        submissions: problemSubmissions
      })));

    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const getStatusIcon = (problemId: string) => {
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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search problems, descriptions, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="attempted">Attempted</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem) => {
          const problemStatus = problemStatuses.get(problem.id);
          return (
            <Dialog key={problem.id} onOpenChange={(open) => {
              if (open) {
                setSelectedProblem(problem);
                setUserCode(problem.solutionTemplate || "");
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
                        <span className="text-sm text-gray-600">{problem.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {problemStatus?.submissions.length || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {problem.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{problem.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
                <DialogHeader>
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

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className