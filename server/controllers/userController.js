const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require('../models/userModels')

const dotenv = require("dotenv");

dotenv.config();

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getCurrentUser = async (req, res) => {
    const userId = req.user.id; 
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.createUser = async (req, res) => {
      const { username, email, password, role } = req.body;
  
      try {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
          
          // Create a new user with the hashed password
          const user = new User({ username, email, password: hashedPassword, role });
          
          // Save the user to the database
          await user.save();
          
          // Respond with the created user
          res.status(201).json(user);
      } catch (err) {
          if (err.code === 11000 && err.keyPattern.username) {
              res.status(400).json({ message: "Username already exists" });
          } else if (err.code === 11000 && err.keyPattern.email) {
              res.status(400).json({ message: "Email already exists" });
          } else {
              res.status(400).json({ message: err.message });
          }
      }
  };
  



  exports.signInUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid user ' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Password is valid, generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.adminOnlyRoute = async (req, res) => {
    try {
        res.status(200).json({ message: 'Admin-only route accessed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.instructorOnlyRoute = async (req, res) => {
    try {
        res.status(200).json({ message: 'Admin-only route accessed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};