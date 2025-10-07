"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff, Phone, Settings, Monitor, Volume2, VolumeX } from "lucide-react"

interface VideoControlsProps {
  onEndSession: () => void
  onToggleVideo: () => void
  onToggleAudio: () => void
  onToggleScreenShare: () => void
  isVideoOn: boolean
  isAudioOn: boolean
  isScreenSharing: boolean
}

export function VideoSessionControls({
  onEndSession,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare,
  isVideoOn,
  isAudioOn,
  isScreenSharing,
}: VideoControlsProps) {
  const [volume, setVolume] = useState(75)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="lg"
            onClick={onToggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="lg"
            onClick={onToggleAudio}
            className="rounded-full w-12 h-12"
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isScreenSharing ? "secondary" : "outline"}
            size="lg"
            onClick={onToggleScreenShare}
            className="rounded-full w-12 h-12"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="lg" className="rounded-full w-12 h-12 bg-transparent">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="destructive" size="lg" onClick={onEndSession} className="rounded-full w-12 h-12">
            <Phone className="h-5 w-5 rotate-[135deg]" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <VolumeX className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}
