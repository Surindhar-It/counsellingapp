import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Shield,
  Settings,
  FileText,
  BarChart3,
  UserCheck,
  Clock,
} from "lucide-react"
import Link from "next/link"

const systemStats = {
  totalUsers: 1247,
  activeStudents: 892,
  activeCounsellors: 24,
  activeParents: 756,
  totalSessions: 3456,
  sessionsThisWeek: 187,
  averageRating: 4.8,
  systemUptime: 99.9,
}

const recentAlerts = [
  {
    id: "1",
    type: "high_priority",
    message: "Student flagged for immediate attention - Crisis intervention needed",
    timestamp: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    type: "system",
    message: "Video conferencing system maintenance scheduled for tonight",
    timestamp: "4 hours ago",
    status: "scheduled",
  },
  {
    id: "3",
    type: "compliance",
    message: "Monthly data backup completed successfully",
    timestamp: "1 day ago",
    status: "resolved",
  },
]

const counsellorPerformance = [
  {
    name: "Dr. Sarah Smith",
    students: 32,
    sessionsThisWeek: 18,
    rating: 4.9,
    status: "excellent",
  },
  {
    name: "Dr. Michael Johnson",
    students: 28,
    sessionsThisWeek: 15,
    rating: 4.7,
    status: "good",
  },
  {
    name: "Dr. Emily Davis",
    students: 25,
    sessionsThisWeek: 12,
    rating: 4.8,
    status: "good",
  },
  {
    name: "Dr. James Wilson",
    students: 30,
    sessionsThisWeek: 20,
    rating: 4.6,
    status: "needs_review",
  },
]

const systemHealth = [
  { component: "Database", status: "healthy", uptime: 99.9 },
  { component: "Video Conferencing", status: "healthy", uptime: 98.5 },
  { component: "AI Chatbot", status: "warning", uptime: 97.2 },
  { component: "Authentication", status: "healthy", uptime: 99.8 },
  { component: "File Storage", status: "healthy", uptime: 99.5 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">MindBridge Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Badge variant="secondary">Administrator</Badge>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">System Overview</h2>
          <p className="text-muted-foreground">Monitor and manage the MindBridge counselling platform.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{systemStats.activeStudents}</p>
                </div>
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions This Week</p>
                  <p className="text-2xl font-bold">{systemStats.sessionsThisWeek}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
                <CardDescription>Recent system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === "high_priority"
                            ? "bg-red-500"
                            : alert.type === "system"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                      <Badge
                        variant={
                          alert.status === "active"
                            ? "destructive"
                            : alert.status === "scheduled"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Counsellor Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Counsellor Performance
                </CardTitle>
                <CardDescription>Weekly performance metrics for all counsellors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counsellorPerformance.map((counsellor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{counsellor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {counsellor.students} students • {counsellor.sessionsThisWeek} sessions this week
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">{counsellor.rating}/5.0</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <Badge
                          variant={
                            counsellor.status === "excellent"
                              ? "default"
                              : counsellor.status === "good"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {counsellor.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Health
                </CardTitle>
                <CardDescription>Real-time status of all system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            component.status === "healthy"
                              ? "bg-green-500"
                              : component.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{component.component}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{component.uptime}% uptime</span>
                        <Badge
                          variant={
                            component.status === "healthy"
                              ? "secondary"
                              : component.status === "warning"
                                ? "destructive"
                                : "destructive"
                          }
                        >
                          {component.status}
                        </Badge>
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
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/reports">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/backup">
                    <Shield className="h-4 w-4 mr-2" />
                    Data Backup
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">New user registration</p>
                    <p className="text-muted-foreground">Student: Emma Wilson - 5 min ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Session completed</p>
                    <p className="text-muted-foreground">Dr. Smith & Alex Johnson - 15 min ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">System backup</p>
                    <p className="text-muted-foreground">Automated backup completed - 1 hour ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">New counsellor onboarded</p>
                    <p className="text-muted-foreground">Dr. Lisa Chen joined - 2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Student Engagement</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Counsellor Utilization</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Parent Satisfaction</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Performance</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-red-700">Emergency Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="destructive" size="sm" className="w-full">
                    Crisis Intervention Team
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    System Emergency Shutdown
                  </Button>
                  <p className="text-xs text-red-600 mt-2">
                    Use only in case of critical system issues or safety concerns
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
