// models/Project.js
const mongoose = require('mongoose'); // 


const projectSchema = new mongoose.Schema({
  id: String,
  name: String,
  wallet: String,
  description: String,
  image: String,
  raised: Number,
  goal: Number,
  contributors: Number,
  highestTip: Number,
  raisedBy: String,
  link: String,
  benefits: [String],
});

module.exports = mongoose.model('Project', projectSchema); // 
