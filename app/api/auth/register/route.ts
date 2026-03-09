import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, role } = await request.json()

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const validRoles = ["student", "parent", "counsellor", "admin"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role selected" }, { status: 400 })
    }

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return NextResponse.json(
        { error: "First name and last name must be at least 2 characters" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    await connectDB()

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      isActive: true,
    })

    const userWithoutPassword = {
      id: newUser._id.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      isActive: newUser.isActive,
    }

    const response = NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 }
    )

    response.cookies.set("user", JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
