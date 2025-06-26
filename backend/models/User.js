const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  profile: {
    name: String,
    bio: String,
    avatar: String,
  },
  transactions: [
    {
      type: Object, 
    }
  ],
  gameStats: [
    {
      gameId: String,
      highestScore: Number,
      playedAt: Date,
    }
  ],
  purchases: [
    {
      itemId: String,
      name: String,
      purchasedAt: Date,
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
