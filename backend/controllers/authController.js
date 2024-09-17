const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/// User Registration
// controllers/authController.js
exports.registerUser = async (req, res) => {
    const { firstName, lastName, nic, gender, dateOfBirth, email, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User with this email already exists' });
      }
  
      // Check if NIC already exists
      user = await User.findOne({ nic });
      if (user) {
        return res.status(400).json({ msg: 'User with this NIC already exists' });
      }
  
      // Create new user
      user = new User({
        firstName,
        lastName,
        nic,
        gender,
        dateOfBirth,
        email,
        password: await bcrypt.hash(password, 10),
      });
  
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user });
    } catch (err) {
      if (err.code === 11000) { // Duplicate key error
        return res.status(400).json({ msg: 'Duplicate key error', error: err.message });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Username or Password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Username or Password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
