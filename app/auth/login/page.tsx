"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: userRole,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update auth context AND localStorage
        login(data.user)

        // Redirect based on user role
        switch (data.user.role) {
          case "student":
            router.push("/student/dashboard")
            break
          case "parent":
            router.push("/parent/dashboard")
            break
          case "counsellor":
            router.push("/counsellor/dashboard")
            break
          case "admin":
            router.push("/admin/dashboard")
            break
          default:
            router.push("/")
        }
      } else {
        setError(data.error || "Login failed. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!userRole) {
      setError("Please select your role before signing in with Google")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      window.location.href = `/api/auth/google?role=${userRole}&redirect=login`
    } catch (error) {
      setError("Google sign in failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 text-primary">
              <Icons.Heart />
            </div>
            <h1 className="text-2xl font-bold text-primary">MindBridge</h1>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your personalized mental health support</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={userRole} onValueChange={setUserRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="counsellor">Counsellor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleSignIn}
              disabled={!userRole || isLoading}
            >
              <div className="h-5 w-5 mr-2">
                <Icons.Google />
              </div>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <div className="h-4 w-4">{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</div>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4">
                    <Icons.Loader2 />
                  </div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center space-y-2">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot your password?
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
