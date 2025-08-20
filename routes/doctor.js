const express = require("express");
const { registerDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctor.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected (only logged-in users can upgrade to doctor)
router.post("/register", authMiddleware, registerDoctor);
router.put("/update", authMiddleware, updateDoctor);
router.delete("/delete", authMiddleware, deleteDoctor);

module.exports = router