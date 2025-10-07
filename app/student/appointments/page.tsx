"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft, CalendarIcon, Clock, User, Video } from "lucide-react"
import Link from "next/link"

const counsellors = [
  { id: "1", name: "Dr. Sarah Smith", specialty: "Anxiety & Stress", available: true },
  { id: "2", name: "Dr. Michael Johnson", specialty: "Career Guidance", available: true },
  { id: "3", name: "Dr. Emily Davis", specialty: "Depression Support", available: false },
  { id: "4", name: "Dr. James Wilson", specialty: "Academic Pressure", available: true },
]

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

const upcomingAppointments = [
  {
    id: "1",
    counsellor: "Dr. Sarah Smith",
    date: "Tomorrow",
    time: "2:00 PM",
    type: "Video Session",
    status: "confirmed",
  },
  {
    id: "2",
    counsellor: "Dr. Michael Johnson",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    type: "Career Guidance",
    status: "pending",
  },
]

export default function StudentAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCounsellor, setSelectedCounsellor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [activeTab, setActiveTab] = useState<"book" | "upcoming">("upcoming")

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedCounsellor || !selectedTime) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          counsellorId: selectedCounsellor,
          date: selectedDate.toISOString(),
          time: selectedTime,
          notes: notes,
          studentId: "current-student-id", // This would come from auth
        }),
      })

      if (response.ok) {
        alert("Appointment booked successfully!")
        // Reset form
        setSelectedCounsellor("")
        setSelectedTime("")
        setNotes("")
        setActiveTab("upcoming")
      } else {
        alert("Failed to book appointment. Please try again.")
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Appointments</h1>
            </div>
          </div>
          <Badge variant="secondary">Student</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Sessions
          </Button>
          <Button variant={activeTab === "book" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("book")}>
            Book New Session
          </Button>
        </div>

        {activeTab === "upcoming" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Sessions</CardTitle>
                <CardDescription>Manage your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.counsellor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {appointment.date}
                            </span>
                            <span className="text-sm flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                        {appointment.status === "confirmed" && (
                          <Button size="sm" asChild>
                            <Link href={`/session/${appointment.id}`}>
                              <Video className="h-4 w-4 mr-2" />
                              Join Session
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "book" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book a New Session</CardTitle>
                  <CardDescription>Schedule a video session with one of our counsellors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Counsellor Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Counsellor</label>
                    <Select value={selectedCounsellor} onValueChange={setSelectedCounsellor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a counsellor" />
                      </SelectTrigger>
                      <SelectContent>
                        {counsellors.map((counsellor) => (
                          <SelectItem key={counsellor.id} value={counsellor.id} disabled={!counsellor.available}>
                            <div className="flex items-center justify-between w-full">
                              <span>{counsellor.name}</span>
                              <span className="text-sm text-muted-foreground ml-2">{counsellor.specialty}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                    <Textarea
                      placeholder="What would you like to discuss in this session?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    className="w-full"
                    disabled={!selectedDate || !selectedCounsellor || !selectedTime}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Calendar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose your preferred appointment date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                  <p className="text-sm text-muted-foreground mt-4">* Weekends are not available for appointments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
