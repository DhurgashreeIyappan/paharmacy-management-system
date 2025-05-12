const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, password: hashed, role });
  await user.save();

  res.status(201).json({ message: 'Registration successful' });
});

// Login Route
router.post('/login', async (req, res) => {  // Corrected route path
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check the role and send appropriate response
  if (user.role === 'admin') {
    return res.status(200).json({ message: 'Login successful', redirectTo: 'admin' });
  } else if (user.role === 'pharmacist') {
    return res.status(200).json({ message: 'Login successful', redirectTo: 'pharmacist' });
  } else if (user.role === 'customer') {
    return res.status(200).json({ message: 'Login successful', redirectTo: 'customer' });
  } else {
    return res.status(400).json({ message: 'Invalid role' });
  }
});

module.exports = router;
