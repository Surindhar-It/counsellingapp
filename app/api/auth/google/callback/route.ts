import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    console.error("OAuth error from Google:", error)
    return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error)}`, request.url))
  }

  if (!code || !state) {
    console.error("Missing OAuth parameters")
    return NextResponse.redirect(new URL("/auth/login?error=missing_parameters", request.url))
  }

  try {
    const stateData = JSON.parse(decodeURIComponent(state))
    const { role, redirect } = stateData

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const origin = new URL(request.url).origin
    const baseUrl = process.env.NEXTAUTH_URL || origin

    if (!clientId || !clientSecret) {
      const msg = "Google OAuth not configured: missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET"
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
      console.error("Token exchange failed:", tokenResponse.status, errorText)
      throw new Error(`Failed to exchange code for token: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.error("User info fetch failed:", userResponse.status)
      throw new Error("Failed to get user info")
    }

    const googleUser = await userResponse.json()

    // Upsert user into MongoDB
    await connectDB()
    const firstName = googleUser.given_name || googleUser.name?.split(" ")[0] || "User"
    const lastName = googleUser.family_name || googleUser.name?.split(" ").slice(1).join(" ") || ""

    const dbUser = await User.findOneAndUpdate(
      { email: googleUser.email.toLowerCase() },
      {
        $setOnInsert: {
          email: googleUser.email.toLowerCase(),
          firstName,
          lastName,
          role,
          isActive: true,
          googleId: googleUser.id,
        },
      },
      { upsert: true, new: true }
    )

    const user = {
      id: dbUser._id.toString(),
      email: dbUser.email,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      role: dbUser.role,
      isActive: dbUser.isActive,
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

    const response = NextResponse.redirect(new URL(dashboardUrl, request.url))

    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Google OAuth callback error:", error)
    return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", request.url))
  }
}
