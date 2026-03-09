/**
 * Seed script — run once to insert demo users into MongoDB Atlas.
 * Usage: npx ts-node scripts/seed.ts
 *    or: npx tsx scripts/seed.ts
 */
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import path from "path"

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set in .env.local")
  process.exit(1)
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, default: "" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["student", "parent", "counsellor", "admin"] },
  isActive: { type: Boolean, default: true },
  googleId: { type: String, default: null },
}, { timestamps: true })

const User = mongoose.models.User ?? mongoose.model("User", UserSchema)

const demoUsers = [
  {
    email: "student@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Alex",
    lastName: "Student",
    role: "student",
    isActive: true,
  },
  {
    email: "parent@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Sarah",
    lastName: "Parent",
    role: "parent",
    isActive: true,
  },
  {
    email: "counsellor@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Dr. Emily",
    lastName: "Counsellor",
    role: "counsellor",
    isActive: true,
  },
  {
    email: "surindhar@gmail.com",
    password: "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa", // suri@2005
    firstName: "Surindhar",
    lastName: "Admin",
    role: "admin",
    isActive: true,
  },
]

async function seed() {
  console.log("🔗  Connecting to MongoDB Atlas…")
  await mongoose.connect(MONGODB_URI!)
  console.log("✅  Connected")

  let inserted = 0
  let skipped = 0

  for (const userData of demoUsers) {
    const result = await User.findOneAndUpdate(
      { email: userData.email },
      { $setOnInsert: userData },
      { upsert: true, new: false }
    )
    if (result === null) {
      console.log(`   ✅  Inserted: ${userData.email}`)
      inserted++
    } else {
      console.log(`   ⏭   Skipped (already exists): ${userData.email}`)
      skipped++
    }
  }

  console.log(`\n🌱  Seed complete — ${inserted} inserted, ${skipped} skipped`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err)
  process.exit(1)
})
