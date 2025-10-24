import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const redirect = searchParams.get("redirect")

  try {
    const origin = new URL(request.url).origin
    const baseUrl = process.env.NEXTAUTH_URL || origin

    const clientId = process.env.GOOGLE_CLIENT_ID

    if (!clientId) {
      const message = "Google OAuth not configured: missing GOOGLE_CLIENT_ID"
      if (process.env.NODE_ENV !== "production") {
        console.warn(message)
        return NextResponse.json({
          message: "Google OAuth is not configured",
          requiresEnvSetup: true,
          envVars: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "NEXTAUTH_URL (optional)"],
          redirectUri: `${baseUrl}/api/auth/google/callback`,
          note: "Configure these in Project Settings → Environment Variables. Use the redirectUri above in your Google Cloud OAuth credentials.",
          mockRedirectUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${baseUrl}/api/auth/google/callback&response_type=code&scope=openid%20email%20profile&state=${encodeURIComponent(JSON.stringify({ role, redirect }))}`,
        })
      }
      console.error(message)
      return NextResponse.json(
        {
          error: "Google OAuth not configured",
          details: "GOOGLE_CLIENT_ID environment variable is missing",
        },
        { status: 500 },
      )
    }

    const googleOAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    googleOAuthUrl.searchParams.set("client_id", clientId)
    googleOAuthUrl.searchParams.set("redirect_uri", `${baseUrl}/api/auth/google/callback`)
    googleOAuthUrl.searchParams.set("response_type", "code")
    googleOAuthUrl.searchParams.set("scope", "openid email profile")
    googleOAuthUrl.searchParams.set("state", JSON.stringify({ role, redirect }))

    return NextResponse.redirect(googleOAuthUrl.toString())
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.json(
      {
        error: "Google OAuth failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
