import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Appointment from "@/lib/models/Appointment"

export async function POST(request: NextRequest) {
  try {
    const { counsellorId, date, time, notes, studentId } = await request.json()

    if (!counsellorId || !date || !time || !studentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const newAppointment = await Appointment.create({
      counsellorId,
      studentId,
      date: new Date(date),
      time,
      notes: notes || "",
      status: "pending",
    })

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
    const counsellorId = searchParams.get("counsellorId")

    await connectDB()

    const query: Record<string, string> = {}
    if (studentId) query.studentId = studentId
    if (counsellorId) query.counsellorId = counsellorId

    if (!studentId && !counsellorId) {
      return NextResponse.json({ error: "studentId or counsellorId is required" }, { status: 400 })
    }

    const appointments = await Appointment.find(query).sort({ date: 1 })
    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Get appointments error:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
