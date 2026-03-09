import mongoose, { Schema, Document, Model } from "mongoose"

export interface IMessage extends Document {
  from: string
  to: string
  subject: string
  message: string
  priority: "normal" | "urgent" | "emergency"
  read: boolean
  status: "sent" | "delivered" | "read"
  createdAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    priority: {
      type: String,
      enum: ["normal", "urgent", "emergency"],
      default: "normal",
    },
    read: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
)

const Message: Model<IMessage> =
  mongoose.models.Message ?? mongoose.model<IMessage>("Message", MessageSchema)

export default Message
