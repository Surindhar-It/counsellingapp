"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MessageCircle, Video, Brain, TrendingUp, Clock, Heart } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function StudentDashboard() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
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
            <Badge variant="secondary">Student</Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
          <p className="text-muted-foreground">How are you feeling today? I'm here to support you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Quick Support
                </CardTitle>
                <CardDescription>Get immediate help when you need it</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button asChild className="h-auto p-4 flex-col items-start">
                    <Link href="/student/chat">
                      <MessageCircle className="h-6 w-6 mb-2" />
                      <span className="font-semibold">Chat with AI Assistant</span>
                      <span className="text-sm opacity-80">Available 24/7</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4 flex-col items-start bg-transparent">
                    <Link href="/student/appointments">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="font-semibold">Book Video Session</span>
                      <span className="text-sm opacity-80">With counsellor</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">AI Chat Session</p>
                      <p className="text-sm text-muted-foreground">Discussed study stress - 2 hours ago</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Video className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Video Session with Dr. Smith</p>
                      <p className="text-sm text-muted-foreground">Career guidance - Yesterday</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Upcoming Appointment</p>
                      <p className="text-sm text-muted-foreground">Tomorrow at 2:00 PM</p>
                    </div>
                    <Badge>Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Mood Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Wellbeing</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Stress Management</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Social Connection</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Next Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-2xl font-bold text-primary">Tomorrow</div>
                  <div className="text-lg">2:00 PM</div>
                  <div className="text-sm text-muted-foreground">Dr. Sarah Smith</div>
                  <Button size="sm" className="w-full">
                    Join Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-red-700">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600 mb-3">If you're experiencing a crisis, reach out immediately.</p>
                <Button variant="destructive" size="sm" className="w-full">
                  Emergency Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
