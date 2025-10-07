"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TestLoginPage() {
  const [userRole, setUserRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("[v0] Login attempt with:", { email, role: userRole })

    try {
      // Mock successful login for testing
      const mockUser = {
        id: 1,
        email,
        firstName: "Test",
        lastName: "User",
        role: userRole as "student" | "parent" | "counsellor" | "admin",
        isActive: true,
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      console.log("[v0] User stored in localStorage:", mockUser)

      // Redirect based on role
      switch (userRole) {
        case "student":
          console.log("[v0] Redirecting to student dashboard")
          router.push("/student/dashboard")
          break
        case "counsellor":
          console.log("[v0] Redirecting to counsellor dashboard")
          router.push("/counsellor/dashboard")
          break
        case "parent":
          console.log("[v0] Redirecting to parent dashboard")
          router.push("/parent/dashboard")
          break
        case "admin":
          console.log("[v0] Redirecting to admin dashboard")
          router.push("/admin/dashboard")
          break
        default:
          console.log("[v0] Redirecting to home")
          router.push("/")
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const testVideoSession = () => {
    console.log("[v0] Testing video session")
    router.push("/session/test-session-123")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            MindBridge Test Login
          </h1>
          <p style={{ color: "#6b7280" }}>Test the counselling app features</p>
        </div>

        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          {error && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              I am a
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="counsellor">Counsellor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              background: isLoading ? "#9ca3af" : "#4f46e5",
              color: "white",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
              fontWeight: "500",
              cursor: isLoading ? "not-allowed" : "pointer",
              marginBottom: "16px",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={testVideoSession}
            style={{
              background: "#10b981",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            🎥 Test Video Session & Emotion Tracking
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          <strong>Test Instructions:</strong>
          <br />
          1. Select any role and enter any email/password
          <br />
          2. Click "Sign In" to test login flow
          <br />
          3. Or click "Test Video Session" to directly test camera & emotion tracking
        </div>
      </div>
    </div>
  )
}
