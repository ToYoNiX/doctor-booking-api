const express = require("express");
const { registerClinic, updateClinic, deleteClinic } = require("../controllers/clinic.js");
const { authMiddleware } = require("../auth/auth.js");

const router = express.Router();

// Protected (admin or doctor — you can expand logic later)
router.post("/", authMiddleware, registerClinic);
router.put("/:id", authMiddleware, updateClinic);
router.delete("/:id", authMiddleware, deleteClinic);

module.exports = router
