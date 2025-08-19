"use client"

import React, { useState, useMemo } from 'react'
import { Search, Filter, ChevronDown, Trophy, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
  acceptanceRate: number
  isCompleted: boolean
  recentlyAdded: boolean
}

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table'],
    acceptanceRate: 92.5,
    isCompleted: true,
    recentlyAdded: false
  },
  {
    id: '2',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Medium',
    topics: ['Trees', 'Recursion', 'Stack'],
    acceptanceRate: 87.3,
    isCompleted: false,
    recentlyAdded: true
  },
  {
    id: '3',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topics: ['Trees', 'Recursion', 'DFS'],
    acceptanceRate: 94.1,
    isCompleted: true,
    recentlyAdded: false
  },
  {
    id: '4',
    title: 'Graph Valid Tree',
    difficulty: 'Hard',
    topics: ['Graphs', 'Union Find', 'DFS'],
    acceptanceRate: 45.2,
    isCompleted: false,
    recentlyAdded: false
  },
  {
    id: '5',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Strings', 'Sliding Window', 'Hash Table'],
    acceptanceRate: 76.8,
    isCompleted: false,
    recentlyAdded: true
  },
  {
    id: '6',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    acceptanceRate: 89.7,
    isCompleted: true,
    recentlyAdded: false
  },
  {
    id: '7',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topics: ['Graphs', 'Topological Sort', 'DFS'],
    acceptanceRate: 62.4,
    isCompleted: false,
    recentlyAdded: false
  },
  {
    id: '8',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topics: ['Arrays', 'Two Pointers', 'Dynamic Programming'],
    acceptanceRate: 38.9,
    isCompleted: false,
    recentlyAdded: true
  }
]

const allTopics = ['Arrays', 'Strings', 'Trees', 'Graphs', 'Hash Table', 'Linked List', 'Recursion', 'Dynamic Programming', 'Two Pointers', 'Sliding Window', 'Stack', 'DFS', 'Union Find', 'Topological Sort']

const difficultyColors = {
  Easy: 'bg-[#10b981] text-white',
  Medium: 'bg-[#f59e0b] text-white',
  Hard: 'bg-[#ef4444] text-white'
}

export default function ProblemBank() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [completionFilter, setCompletionFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('title')

  const filteredAndSortedProblems = useMemo(() => {
    let filtered = mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty
      const matchesTopics = selectedTopics.length === 0 || selectedTopics.some(topic => problem.topics.includes(topic))
      const matchesCompletion = completionFilter === 'all' || 
        (completionFilter === 'completed' && problem.isCompleted) ||
        (completionFilter === 'unsolved' && !problem.isCompleted)
      
      return matchesSearch && matchesDifficulty && matchesTopics && matchesCompletion
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'acceptance':
          return b.acceptanceRate - a.acceptanceRate
        case 'recent':
          return Number(b.recentlyAdded) - Number(a.recentlyAdded)
        default:
          return a.title.localeCompare(b.title)
      }
    })
  }, [searchQuery, selectedDifficulty, selectedTopics, completionFilter, sortBy])

  const totalProblems = mockProblems.length
  const solvedProblems = mockProblems.filter(p => p.isCompleted).length
  const progressPercentage = Math.round((solvedProblems / totalProblems) * 100)

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-[#ffffff] rounded-lg p-8 mb-8 shadow-sm border border-[#e2e8f0]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-[var(--font-display)] text-3xl font-bold text-[#0f172a] mb-2">
                Problem Bank
              </h1>
              <p className="text-[#64748b] text-base">
                Practice coding problems to sharpen your algorithmic skills
              </p>
            </div>
            
            {/* Progress Summary */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#f59e0b]" />
                <div>
                  <div className="text-sm text-[#64748b]">Progress</div>
                  <div className="font-semibold text-[#0f172a]">{progressPercentage}%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                <div>
                  <div className="text-sm text-[#64748b]">Solved</div>
                  <div className="font-semibold text-[#0f172a]">{solvedProblems}/{totalProblems}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#0ea5e9]" />
                <div>
                  <div className="text-sm text-[#64748b]">Remaining</div>
                  <div className="font-semibold text-[#0f172a]">{totalProblems - solvedProblems}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-[#ffffff] rounded-lg p-6 mb-8 shadow-sm border border-[#e2e8f0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#ffffff] border-[#e2e8f0] focus:border-[#1e40af] focus:ring-[#1e40af]"
              />
            </div>

            {/* Difficulty Filter */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="bg-[#ffffff] border-[#e2e8f0] focus:border-[#1e40af] focus:ring-[#1e40af]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] border-[#e2e8f0]">
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Completion Filter */}
            <Select value={completionFilter} onValueChange={setCompletionFilter}>
              <SelectTrigger className="bg-[#ffffff] border-[#e2e8f0] focus:border-[#1e40af] focus:ring-[#1e40af]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] border-[#e2e8f0]">
                <SelectItem value="all">All Problems</SelectItem>
                <SelectItem value="completed">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#ffffff] border-[#e2e8f0] focus:border-[#1e40af] focus:ring-[#1e40af]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] border-[#e2e8f0]">
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="acceptance">Acceptance Rate</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Topic Tags */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-[#64748b]" />
              <span className="text-sm font-medium text-[#475569]">Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTopics.map(topic => (
                <Badge
                  key={topic}
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-[#1e40af] hover:bg-[#3b82f6] text-white border-[#1e40af]'
                      : 'bg-[#ffffff] hover:bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]'
                  }`}
                  onClick={() => toggleTopic(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProblems.map(problem => (
            <Card key={problem.id} className="bg-[#ffffff] border-[#e2e8f0] hover:shadow-md transition-shadow group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-[var(--font-display)] font-semibold text-[#0f172a] text-lg mb-2 group-hover:text-[#1e40af] transition-colors">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${difficultyColors[problem.difficulty]} px-2 py-1 text-xs font-medium`}>
                        {problem.difficulty}
                      </Badge>
                      {problem.recentlyAdded && (
                        <Badge variant="outline" className="bg-[#0ea5e9] text-white border-[#0ea5e9] px-2 py-1 text-xs">
                          New
                        </Badge>
                      )}
                      {problem.isCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Acceptance Rate */}
                <div className="text-sm text-[#64748b] mb-3">
                  <span className="font-medium">Acceptance Rate: </span>
                  <span className="font-semibold text-[#0f172a]">{problem.acceptanceRate}%</span>
                </div>
                
                {/* Topic Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {problem.topics.map(topic => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="bg-[#f1f5f9] text-[#475569] border-[#e2e8f0] text-xs px-2 py-1"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  className={`w-full ${
                    problem.isCompleted 
                      ? 'bg-[#10b981] hover:bg-[#059669] text-white' 
                      : 'bg-[#1e40af] hover:bg-[#3b82f6] text-white'
                  } transition-colors`}
                >
                  {problem.isCompleted ? 'Solve Again' : 'Solve Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProblems.length === 0 && (
          <div className="bg-[#ffffff] rounded-lg p-12 text-center border border-[#e2e8f0]">
            <div className="text-[#64748b] text-lg mb-2">No problems found</div>
            <p className="text-[#64748b]">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-[#64748b]">
          Showing {filteredAndSortedProblems.length} of {totalProblems} problems
        </div>
      </div>
    </div>
  )
}