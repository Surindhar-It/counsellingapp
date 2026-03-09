import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  role: "student" | "parent" | "counsellor" | "admin"
  isActive: boolean
  googleId?: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Not required for Google OAuth users
      default: "",
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["student", "parent", "counsellor", "admin"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    googleId: { type: String, default: null },
  },
  { timestamps: true }
)

// Prevent model re-compilation in Next.js hot-reload
const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema)

export default User
