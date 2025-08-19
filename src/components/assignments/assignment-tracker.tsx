"use client"

import { useState, useMemo } from "react"
import { Search, Calendar, Filter, MoreHorizontal, Plus, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  description?: string
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Binary Search Tree Implementation",
    subject: "Data Structures",
    dueDate: "2024-01-15",
    priority: "high",
    status: "pending",
    description: "Implement BST with insert, delete, and search operations"
  },
  {
    id: "2",
    title: "Dynamic Programming Problems",
    subject: "Algorithms",
    dueDate: "2024-01-20",
    priority: "medium",
    status: "in-progress",
    description: "Solve 10 DP problems from LeetCode"
  },
  {
    id: "3",
    title: "Graph Traversal Algorithms",
    subject: "Algorithms",
    dueDate: "2024-01-12",
    priority: "high",
    status: "completed",
    description: "Implement BFS and DFS algorithms"
  },
  {
    id: "4",
    title: "Hash Table Analysis",
    subject: "Data Structures",
    dueDate: "2024-01-10",
    priority: "low",
    status: "completed",
    description: "Analyze time complexity of hash operations"
  },
  {
    id: "5",
    title: "Sorting Algorithm Comparison",
    subject: "Algorithms",
    dueDate: "2024-01-08",
    priority: "medium",
    status: "pending",
    description: "Compare performance of different sorting algorithms"
  }
]

const subjects = ["All Subjects", "Data Structures", "Algorithms", "System Design", "Mathematics"]
const statuses = ["All Status", "pending", "in-progress", "completed"]
const priorities = ["All Priority", "low", "medium", "high"]

export default function AssignmentTracker() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [priorityFilter, setPriorityFilter] = useState("All Priority")
  const [sortBy, setSortBy] = useState("dueDate")

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = subjectFilter === "All Subjects" || assignment.subject === subjectFilter
      const matchesStatus = statusFilter === "All Status" || assignment.status === statusFilter
      const matchesPriority = priorityFilter === "All Priority" || assignment.priority === priorityFilter

      return matchesSearch && matchesSubject && matchesStatus && matchesPriority
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority":
          const priorityOrder = { "high": 3, "medium": 2, "low": 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "title":
          return a.title.localeCompare(b.title)
        case "subject":
          return a.subject.localeCompare(b.subject)
        default:
          return 0
      }
    })
  }, [assignments, searchTerm, subjectFilter, statusFilter, priorityFilter, sortBy])

  const stats = useMemo(() => {
    const total = assignments.length
    const completed = assignments.filter(a => a.status === "completed").length
    const pending = assignments.filter(a => a.status === "pending").length
    const overdue = assignments.filter(a => 
      a.status !== "completed" && new Date(a.dueDate) < new Date()
    ).length

    return { total, completed, pending, overdue }
  }, [assignments])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground"
      case "medium": return "bg-warning text-white"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success"
      case "in-progress": return "text-accent"
      case "pending": return "text-warning"
      default: return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      case "in-progress": return <Clock className="h-4 w-4" />
      case "pending": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const isOverdue = (assignment: Assignment) => {
    return assignment.status !== "completed" && new Date(assignment.dueDate) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const toggleStatus = (id: string) => {
    setAssignments(prev => prev.map(assignment => {
      if (assignment.id === id) {
        const statusOrder = ["pending", "in-progress", "completed"]
        const currentIndex = statusOrder.indexOf(assignment.status)
        const nextIndex = (currentIndex + 1) % statusOrder.length
        return { ...assignment, status: statusOrder[nextIndex] as Assignment["status"] }
      }
      return assignment
    }))
  }

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id))
  }

  return (
    <div className="bg-surface min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-display">Assignment Tracker</h1>
            <p className="text-muted-foreground mt-1">Manage and track your assignments efficiently</p>
          </div>
          <Button className="bg-primary hover:bg-primary-light text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Assignment
          </Button>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-surface border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{stats.completed}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-destructive">{stats.overdue}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-surface border-border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  className="pl-10 bg-background border-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-40 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority === "All Priority" ? priority : priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="subject">Subject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment List */}
        <Card className="bg-surface border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-foreground">
              Assignments ({filteredAndSortedAssignments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header Row - Hidden on mobile */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-muted/30 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="col-span-4">Assignment</div>
                  <div className="col-span-2">Subject</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Assignment Rows */}
                {filteredAndSortedAssignments.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No assignments found</p>
                    <p className="text-sm">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  filteredAndSortedAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-border hover:bg-muted/20 transition-colors ${
                        isOverdue(assignment) ? 'bg-destructive/5' : ''
                      }`}
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground text-base">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toggleStatus(assignment.id)}>
                                Toggle Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteAssignment(assignment.id)}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                              {assignment.priority.toUpperCase()}
                            </Badge>
                            <span className={`flex items-center gap-1 text-sm ${getStatusColor(assignment.status)}`}>
                              {getStatusIcon(assignment.status)}
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                          </div>
                          <div className={`text-sm ${isOverdue(assignment) ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                            {formatDate(assignment.dueDate)}
                            {isOverdue(assignment) && <span className="ml-1">(Overdue)</span>}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:contents">
                        <div className="col-span-4 flex flex-col">
                          <h3 className="font-medium text-foreground text-sm">{assignment.title}</h3>
                          {assignment.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {assignment.description}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2 flex items-center">
                          <span className="text-sm text-foreground">{assignment.subject}</span>
                        </div>

                        <div className="col-span-2 flex items-center">
                          <span className={`text-sm ${isOverdue(assignment) ? 'text-destructive font-medium' : 'text-foreground'}`}>
                            {formatDate(assignment.dueDate)}
                            {isOverdue(assignment) && (
                              <span className="block text-xs text-destructive">Overdue</span>
                            )}
                          </span>
                        </div>

                        <div className="col-span-1 flex items-center">
                          <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                            {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                          </Badge>
                        </div>

                        <div className="col-span-2 flex items-center">
                          <div className={`flex items-center gap-2 ${getStatusColor(assignment.status)}`}>
                            {getStatusIcon(assignment.status)}
                            <span className="text-sm">
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-1 flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toggleStatus(assignment.id)}>
                                Toggle Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteAssignment(assignment.id)}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}