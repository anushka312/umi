const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: Create or update user
router.post('/api/users', async (req, res) => {
  const { walletAddress, name, bio, avatar } = req.body;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({
        walletAddress,
        profile: { name, bio, avatar },
      });
    } else {
      user.profile = { name, bio, avatar };
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Server error');
  }
});

// GET: Fetch all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server error');
  }
});

// routes/users.js
router.get('/api/users/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
