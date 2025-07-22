const jwt = require('jsonwebtoken');
const User = require('../models/user'); // ✅ Fix the import path

exports.generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '365d' });



const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '365d' });

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("📥 Signup data received:", { name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token, user });

  } catch (err) {
    console.error('❌ Signup error:', err); // 👈 Add this
    res.status(500).json({ message: 'Signup failed', error: err });

  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.oauth = (req, res) => {
  res.send('OAuth login not yet implemented');
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};
