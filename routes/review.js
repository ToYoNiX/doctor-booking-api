const express = require("express");
const { addReview, editReview, deleteReview } = require("../controllers/review.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected
router.post("/add", authMiddleware, addReview);
router.put("/:id", authMiddleware, editReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router