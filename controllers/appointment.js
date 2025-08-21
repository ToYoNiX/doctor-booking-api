const { Appointment } = require("../models/appointment.js");

const addAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({ ...req.body, userID: req.user.id });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    if (appointment.userID.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    appointment.status = "canceled";
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addAppointment, cancelAppointment };
