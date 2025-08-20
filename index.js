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


// Middleware
app.use(express.json())

app.use(function (req, res) {
  res.status(500).json("internal server error");
});

app.use(cors({ origin: "*" }));

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});


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


// Database connections
mongoose.connect(connString).then(() => {
  console.log(`Mongoose is connected to ${connString}`)
}).catch((err) => {
  console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is available at http://localhost:${PORT}`)
})