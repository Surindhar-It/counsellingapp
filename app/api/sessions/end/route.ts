import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Session from "@/lib/models/Session"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, duration, notes, emotionData, endTime } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    await connectDB()

    const updatedSession = await Session.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          duration: duration || 0,
          notes: notes || "",
          emotionData: emotionData || [],
          endTime: endTime ? new Date(endTime) : new Date(),
          status: "completed",
        },
      },
      { new: true, upsert: true }
    )

    return NextResponse.json({
      message: "Session ended successfully",
      sessionId,
      summary: {
        duration: `${Math.floor((duration || 0) / 60)} minutes`,
        emotionsDetected: (emotionData || []).length,
        notesLength: (notes || "").length,
      },
    })
  } catch (error) {
    console.error("Error ending session:", error)
    return NextResponse.json({ error: "Failed to end session" }, { status: 500 })
  }
}
