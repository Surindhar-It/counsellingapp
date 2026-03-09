import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Email, password, and role are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const validRoles = ["student", "parent", "counsellor", "admin"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email: email.toLowerCase().trim(), role })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials or role" }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const userWithoutPassword = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    }

    const response = NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })

    response.cookies.set("user", JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
