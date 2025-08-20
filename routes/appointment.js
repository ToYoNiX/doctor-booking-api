const express = require("express");
const { addAppointment, cancelAppointment } = require("../controllers/appointment.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected
router.post("/add", authMiddleware, addAppointment);
router.put("/cancel/:id", authMiddleware, cancelAppointment);

module.exports = router