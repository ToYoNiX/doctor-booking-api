const express = require("express");
const { addAppointment, cancelAppointment } = require("../controllers/appointment.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected
router.post("/", authMiddleware, addAppointment);
router.put("/:id", authMiddleware, cancelAppointment);

module.exports = router