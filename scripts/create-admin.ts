import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const MONGODB_URI = process.env.MONGODB_URI!

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, default: "" },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  role: { type: String },
  isActive: { type: Boolean, default: true },
  googleId: { type: String, default: null },
}, { timestamps: true })

const User = mongoose.models.User ?? mongoose.model("User", UserSchema)

async function createAdmin() {
  await mongoose.connect(MONGODB_URI)
  const hashed = await bcrypt.hash("Admin@123", 10)
  await User.findOneAndUpdate(
    { email: "admin@mindbridge.com" },
    {
      email: "admin@mindbridge.com",
      password: hashed,
      firstName: "Surindhar",
      lastName: "Admin",
      role: "admin",
      isActive: true,
    },
    { upsert: true, new: true }
  )
  console.log("✅ Admin created: admin@mindbridge.com / Admin@123")
  await mongoose.disconnect()
}

createAdmin().catch(console.error)
