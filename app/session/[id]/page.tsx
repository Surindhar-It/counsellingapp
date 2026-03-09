"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { useAuth } from "@/lib/auth-context"

interface EmotionData {
  emotion: string
  confidence: number
  timestamp: Date
}

export default function VideoSession({ params }: { params: { id: string } }) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [sessionNotes, setSessionNotes] = useState("")
  const [emotionData, setEmotionData] = useState<EmotionData[]>([])
  const [sessionDuration, setSessionDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaError, setMediaError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [screenShareAvailable, setScreenShareAvailable] = useState(true)
  const { user } = useAuth()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sessionStartTime = useRef<Date>(new Date())

  const isStudent = user?.role === "student"
  const isCounsellor = user?.role === "counsellor"
  const meName = user ? `${user.firstName} ${user.lastName}` : isStudent ? "Alex Johnson" : "Sarah Smith"
  const peerName = isStudent ? "Dr. Sarah Smith" : "Alex Johnson"

  const sessionInfo = {
    student: "Alex Johnson",
    counsellor: user ? `${user.firstName} ${user.lastName}` : "Dr. Sarah Smith",
    type: "Anxiety Support Session",
    scheduledTime: "10:00 AM - 11:00 AM",
  }

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
            deviceId: undefined as { exact: string } | undefined,
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        }

        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoDevices = devices.filter((device) => device.kind === "videoinput")

          const laptopCamera = videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("integrated") ||
              device.label.toLowerCase().includes("webcam") ||
              device.label.toLowerCase().includes("built-in") ||
              device.label.toLowerCase().includes("facetime") ||
              (!device.label.toLowerCase().includes("back") && !device.label.toLowerCase().includes("rear")),
          )

          if (laptopCamera) {
            constraints.video = {
              ...constraints.video,
              deviceId: { exact: laptopCamera.deviceId },
            }
          }
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        if (localVideoRef.current) {
          localVideoRef.current.muted = true
          localVideoRef.current.playsInline = true
          localVideoRef.current.srcObject = stream
          localVideoRef.current.play().catch(() => {})
        }
        setMediaError(null)
      } catch (error: any) {
        console.error("Error accessing media devices:", error)
        if (error?.name === "NotAllowedError") {
          setMediaError("Camera/microphone permission denied. Please allow access and try again.")
        } else if (error?.name === "NotFoundError") {
          setMediaError("No camera or microphone was found. Please connect a device and retry.")
        } else {
          setMediaError("Unable to access camera/microphone. Please check permissions and device settings.")
        }
      }
    }

    const checkScreenShareAvailability = () => {
      const available = Boolean(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
      setScreenShareAvailable(available)
    }

    initializeVideo()
    checkScreenShareAvailability()

    const timer = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime.current.getTime()) / 1000))
    }, 1000)

    const emotionTimer = setInterval(async () => {
      if (isCounsellor && canvasRef.current && isVideoOn) {
        try {
          setIsAnalyzing(true)
          const canvas = canvasRef.current
          // Prefer analyzing the student's (remote) video stream if available and ready
          const targetVideo =
            remoteVideoRef.current && remoteVideoRef.current.readyState >= 2
              ? remoteVideoRef.current
              : localVideoRef.current

          if (targetVideo) {
            const { videoWidth, videoHeight } = targetVideo
            // Skip if video not ready or has no dimensions yet
            if (!videoWidth || !videoHeight) {
              setIsAnalyzing(false)
              return
            }

            const ctx = canvas.getContext("2d")
            if (ctx) {
              canvas.width = videoWidth
              canvas.height = videoHeight
              ctx.drawImage(targetVideo, 0, 0, videoWidth, videoHeight)

              const imageData = canvas.toDataURL("image/jpeg", 0.8)

              const response = await fetch("/api/sessions/emotions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-client-role": "counsellor",
                },
                body: JSON.stringify({
                  imageData,
                  sessionId: params.id,
                }),
              })

              if (response.ok) {
                const result = await response.json()
                const newEmotionData: EmotionData = {
                  emotion: result.primaryEmotion,
                  confidence: result.confidence * 100,
                  timestamp: new Date(),
                }
                setEmotionData((prev) => [...prev.slice(-9), newEmotionData])
              }
            }
          }
        } catch (error) {
          console.error("Emotion detection error:", error)
        } finally {
          setIsAnalyzing(false)
        }
      }
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(emotionTimer)
    }
  }, [params.id, isVideoOn, isCounsellor])

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoOn(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioOn(audioTrack.enabled)
      }
    }
  }

  const toggleScreenShare = async () => {
    if (!screenShareAvailable) {
      setMediaError(
        "Screen sharing is not available here. It requires a user gesture and works in production deployments.",
      )
      return
    }

    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream
          localVideoRef.current.play().catch(() => {})
        }
        setIsScreenSharing(true)
        setMediaError(null)
      } else {
        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
            deviceId: undefined as { exact: string } | undefined,
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        }

        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoDevices = devices.filter((device) => device.kind === "videoinput")
          const laptopCamera = videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("integrated") ||
              device.label.toLowerCase().includes("webcam") ||
              device.label.toLowerCase().includes("built-in") ||
              device.label.toLowerCase().includes("facetime") ||
              (!device.label.toLowerCase().includes("back") && !device.label.toLowerCase().includes("rear")),
          )
          if (laptopCamera) {
            constraints.video.deviceId = { exact: laptopCamera.deviceId }
          }
        }

        const cameraStream = await navigator.mediaDevices.getUserMedia(constraints)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = cameraStream
          localVideoRef.current.play().catch(() => {})
        }
        setIsScreenSharing(false)
      }
    } catch (error: any) {
      console.error("Screen sharing error:", error)
      if (error?.name === "NotAllowedError") {
        setMediaError("Screen sharing permission denied. Please allow screen sharing and try again.")
      } else if (typeof error?.message === "string" && error.message.includes("permissions policy")) {
        setMediaError("Screen sharing is blocked by security policy. This feature works in production deployments.")
        setScreenShareAvailable(false)
      } else {
        setMediaError("Screen sharing failed. Please try again or use camera mode.")
      }
    }
  }

  const endSession = async () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    const sessionData = {
      sessionId: params.id,
      duration: sessionDuration,
      notes: sessionNotes,
      emotionData: isCounsellor ? emotionData : [],
      endTime: new Date(),
    }

    try {
      await fetch("/api/sessions/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      })
    } catch (error) {
      console.error("Error ending session:", error)
    }

    const target = isStudent ? "/student/dashboard" : "/counsellor/dashboard"
    window.location.href = target
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return "text-green-600"
      case "anxious":
        return "text-red-600"
      case "concerned":
        return "text-orange-600"
      case "focused":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 text-primary">
              <Icons.Heart />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Video Session</h1>
              <p className="text-sm text-muted-foreground">{sessionInfo.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Live Session</Badge>
            <div className="text-sm font-mono">{formatTime(sessionDuration)}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {mediaError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{mediaError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Local (You) */}
              <Card className="relative overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {meName} (You)
                  </div>
                  {!isVideoOn && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <div className="h-12 w-12 text-gray-400">
                        <Icons.VideoOff />
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Remote (Peer) */}
              <Card className="relative overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {peerName}
                  </div>
                  {isCounsellor && emotionData.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      <span className={getEmotionColor(emotionData[emotionData.length - 1]?.emotion)}>
                        {emotionData[emotionData.length - 1]?.emotion}
                      </span>
                      {isAnalyzing && <span className="ml-2 text-yellow-400">●</span>}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {isCounsellor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-5 w-5">
                      <Icons.Eye />
                    </div>
                    Student Emotion Analysis
                    {isAnalyzing && <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
                  </CardTitle>
                  <CardDescription>Real-time analysis of the student's emotional state</CardDescription>
                </CardHeader>
                <CardContent>
                  {emotionData.length > 0 ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold capitalize">
                          <span className={getEmotionColor(emotionData[emotionData.length - 1]?.emotion)}>
                            {emotionData[emotionData.length - 1]?.emotion}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(emotionData[emotionData.length - 1]?.confidence)}% confidence
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recent emotions:</p>
                        <div className="flex flex-wrap gap-1">
                          {emotionData.slice(-5).map((data, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {data.emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      {isAnalyzing ? "Analyzing emotions..." : "Waiting for video feed..."}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button variant={isVideoOn ? "default" : "destructive"} size="lg" onClick={toggleVideo}>
                    <div className="h-5 w-5">{isVideoOn ? <Icons.Video /> : <Icons.VideoOff />}</div>
                  </Button>
                  <Button variant={isAudioOn ? "default" : "destructive"} size="lg" onClick={toggleAudio}>
                    <div className="h-5 w-5">{isAudioOn ? <Icons.Mic /> : <Icons.MicOff />}</div>
                  </Button>
                  <Button
                    variant={isScreenSharing ? "secondary" : "outline"}
                    size="lg"
                    onClick={toggleScreenShare}
                    disabled={!screenShareAvailable}
                    title={
                      !screenShareAvailable ? "Screen sharing not available in preview mode" : "Toggle screen sharing"
                    }
                  >
                    <div className="h-5 w-5">
                      <Icons.Monitor />
                    </div>
                  </Button>
                  <Button variant="outline" size="lg">
                    <div className="h-5 w-5">
                      <Icons.Settings />
                    </div>
                  </Button>
                  <Button variant="destructive" size="lg" onClick={endSession}>
                    <div className="h-5 w-5 mr-2">
                      <Icons.Phone />
                    </div>
                    End Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="font-medium">{sessionInfo.student}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Time</p>
                  <p className="font-medium">{sessionInfo.scheduledTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Session Type</p>
                  <p className="font-medium">{sessionInfo.type}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes about this session..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${isRecording ? "bg-red-500" : "bg-gray-400"}`} />
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <div className="h-4 w-4 mr-2">
                    <Icons.MessageCircle />
                  </div>
                  Send Message
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <div className="h-4 w-4 mr-2">
                    <Icons.Users />
                  </div>
                  Invite Parent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
