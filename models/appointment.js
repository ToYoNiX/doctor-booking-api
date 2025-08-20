const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clinicID: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["waiting", "completed", "canceled"], default: "waiting" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = { Appointment }