import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, User, Calendar, TrendingUp, MessageCircle, FileText, Phone, Shield, Clock } from "lucide-react"
import Link from "next/link"

const childData = {
  name: "Alex Johnson",
  grade: "Grade 11",
  counsellor: "Dr. Sarah Smith",
  overallProgress: 75,
  lastSession: "2 days ago",
  nextSession: "Tomorrow at 10:00 AM",
  totalSessions: 8,
  concernAreas: ["Anxiety", "Study Stress"],
  recentMood: "Improving",
}

const recentSessions = [
  {
    id: "1",
    date: "Dec 15, 2024",
    duration: "45 minutes",
    type: "Anxiety Support",
    counsellorNotes:
      "Alex showed significant improvement in coping strategies. Discussed breathing techniques and positive self-talk.",
    mood: "Positive",
    progress: 80,
  },
  {
    id: "2",
    date: "Dec 12, 2024",
    duration: "50 minutes",
    type: "Study Stress Management",
    counsellorNotes:
      "Worked on time management skills and exam preparation strategies. Alex is more confident about upcoming tests.",
    mood: "Neutral",
    progress: 70,
  },
  {
    id: "3",
    date: "Dec 8, 2024",
    duration: "45 minutes",
    type: "General Check-in",
    counsellorNotes:
      "Regular progress review. Alex is adapting well to new coping mechanisms. Continue current approach.",
    mood: "Good",
    progress: 75,
  },
]

const progressMetrics = [
  { label: "Emotional Regulation", value: 78, trend: "up" },
  { label: "Stress Management", value: 65, trend: "up" },
  { label: "Social Confidence", value: 82, trend: "stable" },
  { label: "Academic Coping", value: 70, trend: "up" },
]

const upcomingEvents = [
  {
    type: "session",
    title: "Regular Counselling Session",
    date: "Tomorrow",
    time: "10:00 AM",
    with: "Dr. Sarah Smith",
  },
  {
    type: "report",
    title: "Monthly Progress Report",
    date: "Dec 20, 2024",
    time: "Available",
    with: "System Generated",
  },
  {
    type: "meeting",
    title: "Parent-Counsellor Meeting",
    date: "Dec 22, 2024",
    time: "3:00 PM",
    with: "Dr. Sarah Smith",
  },
]

export default function ParentDashboard() {
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
            <Badge variant="secondary">Parent - Jane Johnson</Badge>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Jane!</h2>
          <p className="text-muted-foreground">
            Here's how {childData.name} is progressing in their mental health journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Child Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {childData.name}'s Overview
                </CardTitle>
                <CardDescription>Current status and recent progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Grade Level</p>
                      <p className="font-medium">{childData.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Counsellor</p>
                      <p className="font-medium">{childData.counsellor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="font-medium">{childData.totalSessions} completed</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Session</p>
                      <p className="font-medium">{childData.lastSession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Session</p>
                      <p className="font-medium">{childData.nextSession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Mood</p>
                      <Badge variant="secondary">{childData.recentMood}</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{childData.overallProgress}%</span>
                  </div>
                  <Progress value={childData.overallProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Progress Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Metrics
                </CardTitle>
                <CardDescription>Detailed breakdown of improvement areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  {progressMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{metric.value}%</span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              metric.trend === "up"
                                ? "bg-green-500"
                                : metric.trend === "down"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          />
                        </div>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Sessions
                </CardTitle>
                <CardDescription>Summary of recent counselling sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{session.type}</h3>
                          <p className="text-sm text-muted-foreground">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                        <Badge variant="outline">{session.mood}</Badge>
                      </div>
                      <p className="text-sm mb-3">{session.counsellorNotes}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Session Progress:</span>
                          <Progress value={session.progress} className="h-2 w-20" />
                          <span className="text-sm">{session.progress}%</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Full Report
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
                  <Link href="/parent/message-counsellor">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Counsellor
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/parent/schedule-meeting">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/parent/reports">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          event.type === "session"
                            ? "bg-blue-500"
                            : event.type === "report"
                              ? "bg-green-500"
                              : "bg-purple-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground">with {event.with}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Concern Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Current Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {childData.concernAreas.map((concern, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Badge variant="outline">{concern}</Badge>
                      <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Confidentiality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600">
                  All session details shared here have been approved by your child and counsellor. Some information may
                  remain confidential to maintain trust in the therapeutic relationship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
