"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Database, 
  Code2, 
  Network, 
  Server, 
  Globe, 
  Smartphone, 
  Brain, 
  Settings,
  GitBranch,
  Layers,
  Clock,
  BookOpen,
  Filter,
  CheckCircle2,
  Circle,
  TrendingUp
} from 'lucide-react'

interface Subject {
  id: string
  title: string
  icon: React.ReactNode
  completion: number
  topicsCovered: number
  totalTopics: number
  estimatedHours: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: 'Core' | 'Development' | 'Systems' | 'Advanced'
}

const subjects: Subject[] = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    icon: <Layers className="h-6 w-6" />,
    completion: 85,
    topicsCovered: 17,
    totalTopics: 20,
    estimatedHours: 40,
    difficulty: 'Intermediate',
    category: 'Core'
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    icon: <Code2 className="h-6 w-6" />,
    completion: 72,
    topicsCovered: 18,
    totalTopics: 25,
    estimatedHours: 60,
    difficulty: 'Advanced',
    category: 'Core'
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    icon: <Server className="h-6 w-6" />,
    completion: 60,
    topicsCovered: 12,
    totalTopics: 20,
    estimatedHours: 45,
    difficulty: 'Intermediate',
    category: 'Systems'
  },
  {
    id: 'database-management',
    title: 'Database Management',
    icon: <Database className="h-6 w-6" />,
    completion: 90,
    topicsCovered: 18,
    totalTopics: 20,
    estimatedHours: 35,
    difficulty: 'Intermediate',
    category: 'Core'
  },
  {
    id: 'computer-networks',
    title: 'Computer Networks',
    icon: <Network className="h-6 w-6" />,
    completion: 45,
    topicsCovered: 9,
    totalTopics: 20,
    estimatedHours: 50,
    difficulty: 'Intermediate',
    category: 'Systems'
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    icon: <GitBranch className="h-6 w-6" />,
    completion: 78,
    topicsCovered: 14,
    totalTopics: 18,
    estimatedHours: 40,
    difficulty: 'Intermediate',
    category: 'Development'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: <Globe className="h-6 w-6" />,
    completion: 95,
    topicsCovered: 19,
    totalTopics: 20,
    estimatedHours: 80,
    difficulty: 'Beginner',
    category: 'Development'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    icon: <Smartphone className="h-6 w-6" />,
    completion: 35,
    topicsCovered: 7,
    totalTopics: 20,
    estimatedHours: 70,
    difficulty: 'Intermediate',
    category: 'Development'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    icon: <Brain className="h-6 w-6" />,
    completion: 25,
    topicsCovered: 5,
    totalTopics: 20,
    estimatedHours: 100,
    difficulty: 'Advanced',
    category: 'Advanced'
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: <Settings className="h-6 w-6" />,
    completion: 15,
    topicsCovered: 3,
    totalTopics: 20,
    estimatedHours: 90,
    difficulty: 'Advanced',
    category: 'Advanced'
  }
]

const categories = ['All', 'Core', 'Development', 'Systems', 'Advanced']
const completionFilters = ['All', 'Completed', 'In Progress', 'Not Started']

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-success text-white'
    case 'Intermediate':
      return 'bg-warning text-white'
    case 'Advanced':
      return 'bg-destructive text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getCompletionStatus = (completion: number) => {
  if (completion === 100) return 'Completed'
  if (completion > 0) return 'In Progress'
  return 'Not Started'
}

export default function SubjectCoverageGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCompletion, setSelectedCompletion] = useState('All')

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const categoryMatch = selectedCategory === 'All' || subject.category === selectedCategory
      const completionMatch = selectedCompletion === 'All' || 
        getCompletionStatus(subject.completion) === selectedCompletion
      return categoryMatch && completionMatch
    })
  }, [selectedCategory, selectedCompletion])

  const overallStats = useMemo(() => {
    const totalCompletion = subjects.reduce((sum, subject) => sum + subject.completion, 0)
    const avgCompletion = Math.round(totalCompletion / subjects.length)
    const completedSubjects = subjects.filter(s => s.completion === 100).length
    const totalHours = subjects.reduce((sum, subject) => sum + subject.estimatedHours, 0)
    
    return {
      avgCompletion,
      completedSubjects,
      totalSubjects: subjects.length,
      totalHours
    }
  }, [])

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-foreground mb-4">
            Subject Coverage Overview
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track your progress across all computer engineering subjects. Monitor completion rates, 
            study time, and difficulty levels to optimize your learning journey.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{overallStats.avgCompletion}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {overallStats.completedSubjects}/{overallStats.totalSubjects}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Study Time</p>
                  <p className="text-2xl font-bold text-foreground">{overallStats.totalHours}h</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
                  <p className="text-2xl font-bold text-foreground">
                    {subjects.filter(s => s.completion > 0 && s.completion < 100).length}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-surface border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4" />
                Filters:
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="h-8"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  {completionFilters.map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedCompletion === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCompletion(filter)}
                      className="h-8"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="bg-surface border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {subject.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold text-foreground truncate">
                        {subject.title}
                      </CardTitle>
                    </div>
                  </div>
                  {subject.completion === 100 && (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-semibold text-accent">{subject.completion}%</span>
                  </div>
                  <Progress 
                    value={subject.completion} 
                    className="h-2 bg-muted"
                  />
                </div>

                {/* Topics Coverage */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Topics Covered</span>
                  <span className="text-xs font-medium text-foreground">
                    {subject.topicsCovered}/{subject.totalTopics}
                  </span>
                </div>

                {/* Study Time */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Est. Study Time</span>
                  <span className="text-xs font-medium text-foreground">{subject.estimatedHours}h</span>
                </div>

                {/* Difficulty Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Difficulty</span>
                  <Badge className={`${getDifficultyColor(subject.difficulty)} text-xs px-2 py-1`}>
                    {subject.difficulty}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="pt-2 border-t border-border">
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                    {subject.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more subjects.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}