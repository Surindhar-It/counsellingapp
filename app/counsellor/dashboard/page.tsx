"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Video, FileText, Clock, TrendingUp, Heart, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

const todayAppointments = [
  {
    id: "1",
    student: "Alex Johnson",
    time: "10:00 AM",
    type: "Anxiety Support",
    status: "upcoming",
    notes: "Follow-up on coping strategies",
  },
  {
    id: "2",
    student: "Sarah Williams",
    time: "2:00 PM",
    type: "Career Guidance",
    status: "upcoming",
    notes: "College application stress",
  },
  {
    id: "3",
    student: "Michael Chen",
    time: "4:00 PM",
    type: "Academic Pressure",
    status: "completed",
    notes: "Exam preparation anxiety",
  },
]

const recentStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    lastSession: "2 days ago",
    progress: 75,
    status: "improving",
    totalSessions: 8,
  },
  {
    id: "2",
    name: "Sarah Williams",
    lastSession: "1 week ago",
    progress: 60,
    status: "stable",
    totalSessions: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    lastSession: "Today",
    progress: 85,
    status: "excellent",
    totalSessions: 12,
  },
]

export default function CounsellorDashboard() {
  const [startingSession, setStartingSession] = useState<string | null>(null)
  const { user, logout } = useAuth()
  const handleLogout = () => {
    logout()
    window.location.href = "/auth/login"
  }

  const startSession = async (appointmentId: string, studentName: string, sessionType: string) => {
    setStartingSession(appointmentId)

    try {
      const response = await fetch("/api/sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          studentId: appointmentId, // Using appointment ID as student ID for now
          counsellorId: "counsellor_1", // This would come from auth context
          sessionType,
        }),
      })

      const result = await response.json()

      if (result.success) {
        window.location.href = `/session/${result.sessionId}`
      } else {
        console.error("[v0] Failed to create session:", result.error)
        alert("Failed to start session. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error starting session:", error)
      alert("Failed to start session. Please try again.")
    } finally {
      setStartingSession(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">MindBridge</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge variant="secondary">{user ? `${user.firstName} ${user.lastName}` : "Counsellor"}</Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Good morning, {user?.firstName ?? "Counsellor"}!</h2>
          <p className="text-muted-foreground">You have 3 appointments scheduled for today.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.student}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <Badge variant={appointment.status === "completed" ? "secondary" : "default"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        {appointment.status === "upcoming" && (
                          <Button
                            size="sm"
                            onClick={() => startSession(appointment.id, appointment.student, appointment.type)}
                            disabled={startingSession === appointment.id}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            {startingSession === appointment.id ? "Starting..." : "Start Session"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Student Progress Overview
                </CardTitle>
                <CardDescription>Recent progress updates from your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {student.totalSessions} sessions • Last: {student.lastSession}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={student.progress} className="h-2 w-24" />
                            <span className="text-sm text-muted-foreground">{student.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            student.status === "excellent"
                              ? "default"
                              : student.status === "improving"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {student.status}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/counsellor/students/${student.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/counsellor/appointments">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Schedule
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/counsellor/students">
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/counsellor/reports">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Sessions Completed</span>
                    <span className="font-medium">18/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Students</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Progress Reports</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Session Rating</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Progress Reports Due</p>
                      <p className="text-xs text-muted-foreground">Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Team Meeting</p>
                      <p className="text-xs text-muted-foreground">Friday 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Training Workshop</p>
                      <p className="text-xs text-muted-foreground">Next Monday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
