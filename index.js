// External Libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Secrets
require("dotenv").config()
const PORT = process.env.PORT
const connString = process.env.connString

// Creating backend app
const app = express()

// Global Middleware
app.use(express.json())
app.use(cors({ origin: "*" }))

// Routes
const userRoutes = require("./routes/user.js");
const doctorRoutes = require("./routes/doctor.js");
const clinicRoutes = require("./routes/clinic.js");
const appointmentRoutes = require("./routes/appointment.js");
const reviewRoutes = require("./routes/review.js");

app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);

// Not Found Middleware (after routes)
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

// Error Handler Middleware (last one)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Database connections
mongoose.connect(connString).then(() => {
  console.log(`Mongoose is connected to ${connString}`)
}).catch((err) => {
  console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is available at http://localhost:${PORT}`)
})
