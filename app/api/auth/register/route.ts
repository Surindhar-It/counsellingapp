import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { users, addUser, findUserByEmail } from "@/lib/users"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, role } = await request.json()

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate role
    const validRoles = ["student", "parent", "counsellor", "admin"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role selected" }, { status: 400 })
    }

    // Validate name fields
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return NextResponse.json({ error: "First name and last name must be at least 2 characters" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check for existing user
    const existingUser = findUserByEmail(email.toLowerCase().trim())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = {
      id: users.length + 1,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      isActive: true,
    }

    addUser(newUser)

    // Return success (excluding password)
    const { password: _, ...userWithoutPassword } = newUser

    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )

    // Set secure cookie for server-side auth
    response.cookies.set("user", JSON.stringify(userWithoutPassword), {
      httpOnly: false, // Allow client-side access for now
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
