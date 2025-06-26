const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

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

module.exports = router;
