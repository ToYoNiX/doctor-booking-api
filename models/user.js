const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const doctorDataSchema = new mongoose.Schema({
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  syndicateCard: {
    number: { type: String, required: true },
    fImage: { type: String, required: true }, // URL to image
    bImage: { type: String, required: true },
  },
  availableTime: [
    {
      day: { type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], required: true },
      startHour: { type: String, required: true }, // could be "09:00"
      endHour: { type: String, required: true },
    },
  ],
});

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true, trim: true },
    lName: { type: String, required: true, trim: true },
    nationalID: {
      number: { type: String, required: true, unique: true },
      fImage: { type: String },
      bImage: { type: String },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, enum: ["male", "female"], required: true },
    address: {
      city: { type: String, required: true },
      town: { type: String, required: true },
    },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    doctorData: { type: doctorDataSchema, default: null }, // only exists if doctor
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel }