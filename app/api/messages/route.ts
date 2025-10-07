import { type NextRequest, NextResponse } from "next/server"

// Mock message storage - in a real app, this would be a database
const messages: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { to, from, subject, message, priority } = await request.json()

    // Validate required fields
    if (!to || !from || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new message
    const newMessage = {
      id: Date.now().toString(),
      to,
      from,
      subject,
      message,
      priority: priority || "normal",
      timestamp: new Date(),
      read: false,
      status: "sent",
    }

    messages.push(newMessage)

    // In a real app, you would:
    // 1. Save to database
    // 2. Send notification to counsellor
    // 3. Log the communication
    // 4. Check for emergency priority and escalate if needed

    return NextResponse.json({
      message: "Message sent successfully",
      messageId: newMessage.id,
    })
  } catch (error) {
    console.error("Message sending error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Filter messages for the specific user
    const userMessages = messages.filter((message) => message.to === userId || message.from === userId)

    return NextResponse.json({ messages: userMessages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
