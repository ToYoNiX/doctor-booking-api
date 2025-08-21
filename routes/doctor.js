const express = require("express");
const { registerDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctor.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected (only logged-in users can upgrade to doctor)
router.post("/", authMiddleware, registerDoctor);
router.put("/", authMiddleware, updateDoctor);
router.delete("/", authMiddleware, deleteDoctor);

module.exports = router