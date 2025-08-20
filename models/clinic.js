const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    address: {
      city: { type: String, required: true },
      town: { type: String, required: true },
    },
    description: { type: String },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // doctor = user with doctorData
  },
  { timestamps: true }
);

const Clinic = mongoose.model("Clinic", clinicSchema);
module.exports = { Clinic }