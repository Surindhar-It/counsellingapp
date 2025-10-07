import { type NextRequest, NextResponse } from "next/server"

// Mock database - in a real app, this would be a proper database
const appointments: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { counsellorId, date, time, notes, studentId } = await request.json()

    // Validate required fields
    if (!counsellorId || !date || !time || !studentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      counsellorId,
      studentId,
      date: new Date(date),
      time,
      notes: notes || "",
      status: "pending",
      createdAt: new Date(),
    }

    appointments.push(newAppointment)

    return NextResponse.json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    })
  } catch (error) {
    console.error("Appointment booking error:", error)
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")

    if (!studentId) {
      return NextResponse.json({ error: "Student ID required" }, { status: 400 })
    }

    // Filter appointments for the specific student
    const studentAppointments = appointments.filter((appointment) => appointment.studentId === studentId)

    return NextResponse.json({ appointments: studentAppointments })
  } catch (error) {
    console.error("Get appointments error:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
