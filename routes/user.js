const express = require("express");
const { loginUser, registerUser, updateUser, deleteUser } = require("../controllers/user.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Public
router.post("/", registerUser);
router.post("/login", loginUser);

// Protected
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router