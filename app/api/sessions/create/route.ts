import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, studentId, counsellorId, sessionType } = await request.json()

    // Generate a unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // In a real app, you would save this to your database
    // For now, we'll return the session ID
    const sessionData = {
      id: sessionId,
      appointmentId,
      studentId,
      counsellorId,
      sessionType,
      startTime: new Date().toISOString(),
      status: "active",
    }

    console.log("[v0] Created new session:", sessionData)

    return NextResponse.json({
      success: true,
      sessionId,
      sessionData,
    })
  } catch (error) {
    console.error("[v0] Error creating session:", error)
    return NextResponse.json({ success: false, error: "Failed to create session" }, { status: 500 })
  }
}
