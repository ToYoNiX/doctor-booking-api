const { Review } = require("../models/review.js");

const addReview = async (req, res) => {
  try {
    const review = new Review({ ...req.body, userID: req.user.id });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      userID: req.user.id,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });

    Object.assign(review, req.body);
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userID: req.user.id,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addReview, editReview, deleteReview };
