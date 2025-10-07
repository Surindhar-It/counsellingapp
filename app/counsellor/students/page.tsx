"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ArrowLeft, Search, Users, Calendar, FileText } from "lucide-react"
import Link from "next/link"

const students = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    grade: "Grade 11",
    lastSession: "2 days ago",
    nextSession: "Tomorrow 10:00 AM",
    progress: 75,
    status: "improving",
    totalSessions: 8,
    concerns: ["Anxiety", "Study Stress"],
    parentContact: "Jane Johnson",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    grade: "Grade 12",
    lastSession: "1 week ago",
    nextSession: "Dec 20, 2:00 PM",
    progress: 60,
    status: "stable",
    totalSessions: 5,
    concerns: ["Career Guidance", "College Stress"],
    parentContact: "Robert Williams",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    grade: "Grade 10",
    lastSession: "Today",
    nextSession: "Next week",
    progress: 85,
    status: "excellent",
    totalSessions: 12,
    concerns: ["Academic Pressure", "Social Anxiety"],
    parentContact: "Lisa Chen",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    grade: "Grade 11",
    lastSession: "3 days ago",
    nextSession: "Friday 11:00 AM",
    progress: 45,
    status: "needs attention",
    totalSessions: 3,
    concerns: ["Depression", "Family Issues"],
    parentContact: "Mark Davis",
  },
]

export default function CounsellorStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.concerns.some((concern) => concern.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "default"
      case "improving":
        return "secondary"
      case "stable":
        return "outline"
      case "needs attention":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/counsellor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">My Students</h1>
            </div>
          </div>
          <Badge variant="secondary">Dr. Sarah Smith</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or concern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Students ({students.length})</TabsTrigger>
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="priority">Priority</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Students Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>
                      {student.grade} • {student.email}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(student.status)}>{student.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Session</p>
                    <p className="font-medium">{student.lastSession}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Session</p>
                    <p className="font-medium">{student.nextSession}</p>
                  </div>
                </div>

                {/* Concerns */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Primary Concerns</p>
                  <div className="flex flex-wrap gap-1">
                    {student.concerns.map((concern, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Parent Contact */}
                <div className="text-sm">
                  <p className="text-muted-foreground">Parent/Guardian</p>
                  <p className="font-medium">{student.parentContact}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" asChild>
                    <Link href={`/counsellor/students/${student.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
