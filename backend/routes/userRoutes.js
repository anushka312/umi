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

// userRoutes.js

router.post('/api/users/:walletAddress/gameStats', async (req, res) => {
  const { walletAddress } = req.params;
  const { gameId, score } = req.body;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find the game stat
    const statIndex = user.gameStats.findIndex(stat => stat.gameId === String(gameId));

    if (statIndex !== -1) {
      // Update only if new score is higher
      if (score > user.gameStats[statIndex].highestScore) {
        user.gameStats[statIndex].highestScore = score;
        user.gameStats[statIndex].playedAt = new Date();
      }
    } else {
      user.gameStats.push({
        gameId: String(gameId),
        highestScore: score,
        playedAt: new Date(),
      });
    }

    await user.save();
    res.status(200).json({ message: 'High score recorded' });
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Record a game purchase
router.post('/api/users/:walletAddress/purchase', async (req, res) => {
  const { walletAddress } = req.params;
  const { itemId, name, amount } = req.body;

  if (!itemId || !name || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Avoid duplicate purchase
    const alreadyPurchased = user.purchases.some(p => p.itemId === itemId);
    if (!alreadyPurchased) {
      user.purchases.push({
        itemId,
        name,
        purchasedAt: new Date(),
      });
    }

    // Always log transaction
    user.transactions.push({
      type: 'game_purchase',
      itemId,
      name,
      amount,
      timestamp: new Date(),
    });

    await user.save();
    res.status(200).json({ message: 'Purchase recorded' });
  } catch (err) {
    console.error('Error recording purchase:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
