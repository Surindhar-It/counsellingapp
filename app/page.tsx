import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Icons.Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MindBridge</h1>
              <p className="text-xs text-muted-foreground">Virtual Counselling Support</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/student" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Students
            </Link>
            <Link href="/parent" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Parents
            </Link>
            <Link href="/counsellor" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Counsellors
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Admins
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
        <div className="container mx-auto text-center max-w-5xl relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
            <Icons.Heart className="h-4 w-4 mr-2" />
            Your Mental Health Matters
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professional Counselling Made Accessible
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            Connect with AI-powered support and certified counsellors through secure video sessions, designed
            specifically for students, parents, and mental health professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto" asChild>
              <Link href="/auth/register">
                Start Your Journey
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 bg-transparent" asChild>
              <Link href="/demo">
                <Icons.Video className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Comprehensive Mental Health Support</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for your mental health journey in one secure platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icons.Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">AI Chatbot Support</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get instant guidance and support from our intelligent AI assistant, available 24/7 for immediate help
                  with doubts and concerns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icons.Video className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">Live Video Sessions</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Connect with certified counsellors through secure video conferencing with real-time emotion
                  recognition for better support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icons.Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Multi-Role Platform</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Designed for students, parents, counsellors, and administrators with specialized dashboards for each
                  role.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icons.MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">Career Guidance</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Receive personalized career advice and educational guidance tailored to your interests and goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icons.Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Privacy & Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  End-to-end encrypted sessions and GDPR-compliant data handling ensure your privacy is always
                  protected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icons.Heart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">Progress Tracking</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Monitor your mental health journey with detailed progress reports and insights shared with parents and
                  counsellors.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6">What Our Users Say</h3>
            <p className="text-xl text-muted-foreground">Real stories from students and families we've helped</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-2">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Icons.Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
                <CardDescription className="text-base">
                  "The AI chatbot helped me through my anxiety attacks at 2 AM when no one else was available. It's like
                  having a friend who truly understands."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-2">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <Icons.Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-muted-foreground">Parent</p>
                  </div>
                </div>
                <CardDescription className="text-base">
                  "Being able to track my daughter's progress and communicate with her counsellor has been invaluable.
                  The platform keeps our family connected to her healing journey."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-2">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Icons.Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Lisa K.</p>
                    <p className="text-sm text-muted-foreground">Counsellor</p>
                  </div>
                </div>
                <CardDescription className="text-base">
                  "The emotion recognition during video sessions gives me deeper insights into my students' wellbeing.
                  It's revolutionized how I provide support."
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">Ready to Begin Your Journey?</h3>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have found support, guidance, and healing through MindBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link href="/auth/register">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-sidebar border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icons.Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-bold text-sidebar-foreground">MindBridge</h4>
              </div>
              <p className="text-muted-foreground">
                Professional counselling support for students, parents, and mental health professionals.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sidebar-foreground">For Students</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/student" className="hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/student/chat" className="hover:text-primary transition-colors">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/student/appointments" className="hover:text-primary transition-colors">
                    Book Session
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sidebar-foreground">For Parents</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/parent" className="hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/parent/message-counsellor" className="hover:text-primary transition-colors">
                    Message Counsellor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sidebar-foreground">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MindBridge. All rights reserved. Your mental health matters.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
