"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Shield,
  Palette,
  BarChart3,
  Search,
  DollarSign,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from "lucide-react";

interface CareerPath {
  id: number;
  title: string;
  category: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
  };
  requirements: string[];
  skills: string[];
  experience: string;
  education: string;
  growth: string;
  outlook: string;
}

const categoryIcons: Record<string, any> = {
  "Software Development": <Code className="w-5 h-5" />,
  "Data Science": <Database className="w-5 h-5" />,
  "DevOps": <Cloud className="w-5 h-5" />,
  "Mobile Development": <Smartphone className="w-5 h-5" />,
  "Cybersecurity": <Shield className="w-5 h-5" />,
  "Design": <Palette className="w-5 h-5" />,
  "Business": <BarChart3 className="w-5 h-5" />
};

const categoryColors: Record<string, string> = {
  "Software Development": "bg-blue-100 text-blue-800 border-blue-200",
  "Data Science": "bg-green-100 text-green-800 border-green-200",
  "DevOps": "bg-purple-100 text-purple-800 border-purple-200",
  "Mobile Development": "bg-orange-100 text-orange-800 border-orange-200",
  "Cybersecurity": "bg-red-100 text-red-800 border-red-200",
  "Design": "bg-pink-100 text-pink-800 border-pink-200",
  "Business": "bg-yellow-100 text-yellow-800 border-yellow-200"
};

export const CareerPathsGallery = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/career-paths');
        if (!response.ok) {
          throw new Error('Failed to fetch career paths');
        }
        const data = await response.json();
        setCareerPaths(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  const categories = ["all", ...Array.from(new Set(careerPaths.map(path => path.category)))];

  const filteredCareerPaths = careerPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = activeTab === "all" || path.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  const toggleCardExpansion = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-80">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
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
      <Alert className="max-w-2xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load career paths: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Career Paths</h2>
          <p className="text-muted-foreground">Explore diverse career opportunities in tech</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search careers or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:flex xl:w-fit gap-1 h-auto p-1">
          <TabsTrigger value="all" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All Careers
          </TabsTrigger>
          {categories.slice(1).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex items-center gap-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {categoryIcons[category]}
              <span className="hidden sm:inline">{category}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredCareerPaths.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No careers found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "No careers available in this category"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareerPaths.map((career) => {
                const isExpanded = expandedCards.has(career.id);

                return (
                  <Card
                    key={career.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border hover:border-primary/20"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {categoryIcons[career.category]}
                          <Badge
                            variant="secondary"
                            className={`${categoryColors[career.category]} border text-xs`}
                          >
                            {career.category}
                          </Badge>
                        </div>
                      </div>

                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {career.title}
                      </CardTitle>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span className="font-medium text-success">
                          {formatSalary(career.salaryRange.min, career.salaryRange.max)}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm leading-relaxed">
                        {isExpanded ? career.description : `${career.description.substring(0, 120)}...`}
                      </CardDescription>

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.slice(0, isExpanded ? career.skills.length : 4).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs hover:bg-accent hover:text-accent-foreground cursor-default transition-colors"
                              title={skill}
                            >
                              {skill}
                            </Badge>
                          ))}
                          {!isExpanded && career.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{career.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Requirements (when expanded) */}
                      {isExpanded && (
                        <div className="space-y-3 pt-2 border-t border-border">
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Requirements</h4>
                            <ul className="space-y-1">
                              {career.requirements.map((req, index) => (
                                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="font-medium text-foreground">Experience:</span>
                              <p className="text-muted-foreground mt-1">{career.experience}</p>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Education:</span>
                              <p className="text-muted-foreground mt-1">{career.education}</p>
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-foreground text-xs">Growth Outlook:</span>
                            <p className="text-muted-foreground text-xs mt-1">{career.outlook}</p>
                          </div>
                        </div>
                      )}

                      {/* Expand/Collapse Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCardExpansion(career.id)}
                        className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Show More
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      {filteredCareerPaths.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredCareerPaths.length} of {careerPaths.length} career paths
          {searchTerm && ` for "${searchTerm}"`}
          {activeTab !== "all" && ` in ${activeTab}`}
        </div>
      )}
    </div>
  );
};