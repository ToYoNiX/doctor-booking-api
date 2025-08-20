const { Clinic } = require("../models/clinic.js");

const registerClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });
    res.json({ message: "Clinic deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerClinic, updateClinic, deleteClinic }