const { User } = require("../models/user.js");

const registerDoctor = async (req, res) => {
  try {
    const { specialization, syndicateCard, availableTime } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.doctorData = { specialization, syndicateCard, availableTime };
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findById(req.user.id);
    if (!user || !user.doctorData) return res.status(404).json({ error: "Doctor not found" });

    Object.assign(user.doctorData, updates);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.doctorData) return res.status(404).json({ error: "Doctor not found" });

    user.doctorData = null;
    await user.save();

    res.json({ message: "Doctor profile removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerDoctor, updateDoctor, deleteDoctor }