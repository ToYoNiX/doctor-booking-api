const express = require("express");
const { registerUser, updateUser, deleteUser } = require("../controllers/user.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Public
router.post("/register", registerUser);

// Protected
router.put("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router