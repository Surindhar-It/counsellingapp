import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Message from "@/lib/models/Message"

export async function POST(request: NextRequest) {
  try {
    const { to, from, subject, message, priority } = await request.json()

    if (!to || !from || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const newMessage = await Message.create({
      to,
      from,
      subject,
      message,
      priority: priority || "normal",
      read: false,
      status: "sent",
    })

    return NextResponse.json({
      message: "Message sent successfully",
      messageId: newMessage._id.toString(),
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

    await connectDB()

    const messages = await Message.find({
      $or: [{ to: userId }, { from: userId }],
    }).sort({ createdAt: -1 })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
