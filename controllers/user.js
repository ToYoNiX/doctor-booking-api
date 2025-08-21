const { User } = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { fName, lName, nationalID, email, password, gender, address } =
      req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered" });

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      fName,
      lName,
      nationalID,
      email,
      password: hashedPassword,
      gender,
      address,
    });

    await user.save();

    const token = createToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = createToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fName, lName, nationalID, email, password, gender, address } =
      req.body;

    if (
      !fName ||
      !lName ||
      !nationalID ||
      !email ||
      !password ||
      !gender ||
      !address
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required for PUT update" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updates = {
      fName,
      lName,
      nationalID,
      email,
      password: hashedPassword,
      gender,
      address,
    };

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const safe = user.toObject();
    delete safe.password;

    res.json(safe);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
