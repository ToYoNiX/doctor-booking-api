const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    doctorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports = { reviewModel }