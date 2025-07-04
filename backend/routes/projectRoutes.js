const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');

// GET all projects
router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET project by id
router.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST donate
router.post('/api/projects/:id/donate', async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;

    if (!walletAddress) return res.status(400).json({ error: 'Missing wallet address' });

    const project = await Project.findOne({ id: req.params.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Update project stats
    project.raised += amount;
    project.contributors += 1;
    project.highestTip = Math.max(project.highestTip, amount);
    await project.save();

    // Only log donation if user exists
    const user = await User.findOne({ walletAddress });
    if (user) {
      user.transactions.push({
        type: 'donation',
        projectId: project.id,
        projectName: project.name,
        amount,
        donatedAt: new Date(),
      });
      await user.save();
    }

    res.json({ message: 'Donation recorded' });
  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
