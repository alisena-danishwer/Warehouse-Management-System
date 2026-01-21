const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super_secret_key_123'; // In a real app, put this in .env

// 1. Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body; // REMOVE 'role' from here

    // Check if user exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User (ALWAYS Force Role to 'Operator')
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'Operator' // <--- FORCED
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    // Generate Token (The "ID Card")
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, role: user.role, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};