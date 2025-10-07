import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  console.log("[v0] OAuth callback received - code:", !!code, "state:", !!state, "error:", error)

  if (error) {
    console.error("[v0] OAuth error from Google:", error)
    return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error)}`, request.url))
  }

  if (!code || !state) {
    console.error("[v0] Missing OAuth parameters - code:", !!code, "state:", !!state)
    return NextResponse.redirect(new URL("/auth/login?error=missing_parameters", request.url))
  }

  try {
    const stateData = JSON.parse(decodeURIComponent(state))
    const { role, redirect } = stateData
    console.log("[v0] Parsed state data - role:", role, "redirect:", redirect)

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const origin = new URL(request.url).origin
    const baseUrl = process.env.NEXTAUTH_URL || origin

    if (!clientId || !clientSecret) {
      const msg = "[v0] Google OAuth not configured: missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET"
      if (process.env.NODE_ENV !== "production") {
        console.warn(msg)
        return NextResponse.json(
          {
            message: "Google OAuth is not configured",
            requiresEnvSetup: true,
            envVars: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "NEXTAUTH_URL (optional)"],
            redirectUri: `${baseUrl}/api/auth/google/callback`,
            note: "Add the variables in Project Settings → Environment Variables, and ensure the redirectUri is in Google OAuth client settings.",
          },
          { status: 200 },
        )
      }
      console.warn(msg)
      return NextResponse.redirect(new URL("/auth/login?error=oauth_config_missing", request.url))
    }

    console.log("[v0] Exchanging code for token...")
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("[v0] Token exchange failed:", tokenResponse.status, errorText)
      throw new Error(`Failed to exchange code for token: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()
    console.log("[v0] Token exchange successful")

    console.log("[v0] Fetching user info...")
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.error("[v0] User info fetch failed:", userResponse.status)
      throw new Error("Failed to get user info")
    }

    const googleUser = await userResponse.json()
    console.log("[v0] User info retrieved for:", googleUser.email)

    const user = {
      id: `google_${googleUser.id}`,
      email: googleUser.email,
      firstName: googleUser.given_name || googleUser.name?.split(" ")[0] || "User",
      lastName: googleUser.family_name || googleUser.name?.split(" ").slice(1).join(" ") || "",
      role: role,
      provider: "google",
      avatar: googleUser.picture,
      createdAt: new Date().toISOString(),
    }

    // Redirect based on role
    const dashboardUrl =
      role === "student"
        ? "/student/dashboard"
        : role === "parent"
          ? "/parent/dashboard"
          : role === "counsellor"
            ? "/counsellor/dashboard"
            : role === "admin"
              ? "/admin/dashboard"
              : "/"

    console.log("[v0] Redirecting to dashboard:", dashboardUrl)

    const response = NextResponse.redirect(new URL(dashboardUrl, request.url))

    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Google OAuth callback error:", error)
    return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", request.url))
  }
}
