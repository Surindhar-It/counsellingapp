import mongoose, { Schema, Document, Model } from "mongoose"

export interface IAppointment extends Document {
  studentId: string
  counsellorId: string
  date: Date
  time: string
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    studentId: { type: String, required: true },
    counsellorId: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
)

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ?? mongoose.model<IAppointment>("Appointment", AppointmentSchema)

export default Appointment
