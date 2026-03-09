import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Session from "@/lib/models/Session"

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, studentId, counsellorId, sessionType } = await request.json()

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    await connectDB()

    const sessionDoc = await Session.create({
      sessionId,
      appointmentId: appointmentId || null,
      studentId: studentId || "",
      counsellorId: counsellorId || null,
      sessionType: sessionType || "general",
      status: "active",
      startTime: new Date(),
    })

    return NextResponse.json({
      success: true,
      sessionId,
      sessionData: sessionDoc,
    })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ success: false, error: "Failed to create session" }, { status: 500 })
  }
}
