"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, Send, MessageCircle, Clock, User } from "lucide-react"
import Link from "next/link"

const previousMessages = [
  {
    id: "1",
    from: "Dr. Sarah Smith",
    to: "Jane Johnson",
    subject: "Alex's Progress Update",
    message:
      "Hi Jane, I wanted to update you on Alex's recent progress. They've been doing exceptionally well with the coping strategies we've been working on. I'd like to schedule a brief call to discuss next steps.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "2",
    from: "Jane Johnson",
    to: "Dr. Sarah Smith",
    subject: "Re: Alex's Progress Update",
    message:
      "Thank you for the update! I've noticed Alex seems more confident lately. I'm available for a call this week. What times work best for you?",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "3",
    from: "Dr. Sarah Smith",
    to: "Jane Johnson",
    subject: "Appointment Confirmation",
    message:
      "Perfect! I've scheduled our call for tomorrow at 2:00 PM. We'll discuss Alex's continued progress and any questions you might have.",
    timestamp: "1 day ago",
    read: false,
  },
]

export default function MessageCounsellor() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose")

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message")
      return
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "dr-sarah-smith",
          subject,
          message,
          priority,
          from: "parent-jane-johnson",
        }),
      })

      if (response.ok) {
        alert("Message sent successfully!")
        setSubject("")
        setMessage("")
        setPriority("normal")
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error sending message:", error)
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
              <Link href="/parent/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Message Counsellor</h1>
            </div>
          </div>
          <Badge variant="secondary">Parent</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "compose" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("compose")}
          >
            Compose Message
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("history")}
          >
            Message History
          </Button>
        </div>

        {activeTab === "compose" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Send Message to Dr. Sarah Smith
              </CardTitle>
              <CardDescription>
                Communicate securely with your child's counsellor about their progress and any concerns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Priority Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Message Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General inquiry</SelectItem>
                    <SelectItem value="normal">Normal - Regular update</SelectItem>
                    <SelectItem value="high">High - Urgent concern</SelectItem>
                    <SelectItem value="emergency">Emergency - Immediate attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <Button onClick={handleSendMessage} disabled={!subject.trim() || !message.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Guidelines */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Communication Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Messages are typically responded to within 24-48 hours</li>
                  <li>• For urgent concerns, please call the emergency contact number</li>
                  <li>• All communications are confidential and secure</li>
                  <li>• Please be specific about your concerns or questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Message History
              </CardTitle>
              <CardDescription>Previous conversations with Dr. Sarah Smith</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`border rounded-lg p-4 ${!msg.read ? "bg-blue-50/50 border-blue-200" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{msg.from}</p>
                          <p className="text-sm text-muted-foreground">to {msg.to}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        {!msg.read && (
                          <Badge variant="default" className="mt-1">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{msg.subject}</h3>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
