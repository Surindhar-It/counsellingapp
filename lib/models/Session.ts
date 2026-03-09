import mongoose, { Schema, Document, Model } from "mongoose"

export interface IEmotionEntry {
  emotion: string
  confidence: number
  timestamp: Date
}

export interface ISession extends Document {
  sessionId: string
  studentId: string
  counsellorId?: string
  appointmentId?: string
  sessionType?: string
  duration: number
  notes: string
  emotionData: IEmotionEntry[]
  status: "active" | "completed" | "cancelled"
  startTime: Date
  endTime?: Date
  createdAt: Date
}

const EmotionEntrySchema = new Schema<IEmotionEntry>({
  emotion: { type: String, required: true },
  confidence: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
})

const SessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true },
    studentId: { type: String, required: false, default: "" },
    counsellorId: { type: String, default: null },
    appointmentId: { type: String, default: null },
    sessionType: { type: String, default: "general" },
    duration: { type: Number, default: 0 },
    notes: { type: String, default: "" },
    emotionData: { type: [EmotionEntrySchema], default: [] },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: null },
  },
  { timestamps: true }
)

const Session: Model<ISession> =
  mongoose.models.Session ?? mongoose.model<ISession>("Session", SessionSchema)

export default Session
