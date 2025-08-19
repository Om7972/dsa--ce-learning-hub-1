"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Github, Calendar, Clock, Plus, Eye, Heart, Star, Code, Layers, Smartphone, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "web" | "mobile" | "ai-ml" | "backend" | "frontend" | "fullstack";
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  status: "active" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  instructorId?: string;
}

const categoryIcons = {
  web: Code,
  mobile: Smartphone,
  "ai-ml": Brain,
  backend: Layers,
  frontend: Eye,
  fullstack: Code,
};

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-red-100 text-red-800 border-red-200",
};

export const ProjectsGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    difficulty: "beginner" as const,
    category: "web" as const,
    githubUrl: "",
    demoUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchQuery, selectedCategory, selectedDifficulty, selectedTech]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.techStack.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((project) => project.difficulty === selectedDifficulty);
    }

    if (selectedTech !== "all") {
      filtered = filtered.filter((project) =>
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  };

  const handleAddProject = async () => {
    try {
      const projectData = {
        ...newProject,
        techStack: newProject.techStack.split(",").map((tech) => tech.trim()),
        status: "active" as const,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      await fetchProjects();
      setShowAddProject(false);
      setNewProject({
        title: "",
        description: "",
        techStack: "",
        difficulty: "beginner",
        category: "web",
        githubUrl: "",
        demoUrl: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const allTechStacks = Array.from(
    new Set(projects.flatMap((project) => project.techStack))
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-64" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchProjects}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Projects Gallery</h1>
            <p className="text-muted-foreground">
              Discover and explore coding projects across different technologies and difficulty levels
            </p>
          </div>
          <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProject.category}
                      onValueChange={(value: any) => setNewProject({ ...newProject, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="ai-ml">AI/ML</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={newProject.difficulty}
                      onValueChange={(value: any) => setNewProject({ ...newProject, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                  <Input
                    id="techStack"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="demoUrl">Demo URL</Label>
                    <Input
                      id="demoUrl"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      placeholder="https://demo.example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddProject(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject}>Add Project</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="ai-ml">AI/ML</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="fullstack">Fullstack</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTech} onValueChange={setSelectedTech}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tech</SelectItem>
              {allTechStacks.map((tech) => (
                <SelectItem key={tech} value={tech}>{tech}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => {
          const CategoryIcon = categoryIcons[project.category];
          return (
            <Card 
              key={project.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <CategoryIcon className="h-16 w-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    {project.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {project.views