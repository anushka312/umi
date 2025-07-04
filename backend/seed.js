const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projects = [
  {
    id: '1',
    name: 'Clean the Ganges',
    wallet: '0x8834EDD41DCA0C832C5FE9bcE709eE9b6817f192',
    description: 'Join us in removing plastic waste from the sacred river.',
    image: 'https://res.cloudinary.com/da5ytwk7j/image/upload/v1751609967/ganges_kd6vvm.jpg',
    raised: 1.2,
    goal: 2.0,
    contributors: 43,
    highestTip: 0.2,
    raisedBy: 'Amy',
    link: 'https://example.com/project1',
    benefits: ['Earn “Tree Forest” NFT', 'Extra 100 XP in your account'],
  },
  {
    id: '2',
    name: 'Solar Village',
    wallet: '0x8834EDD41DCA0C832C5FE9bcE709eE9b6817f192',
    description: 'Help install solar panels in a remote village in Rajasthan.',
    image: 'https://res.cloudinary.com/da5ytwk7j/image/upload/v1751609980/solar_fo4raf.jpg',
    raised: 0.9,
    goal: 1.5,
    contributors: 30,
    highestTip: 0.1,
    raisedBy: 'Rahul',
    link: 'https://example.com/project2',
    benefits: ['Earn “Solar Star” NFT', 'Extra 100 XP in your account'],
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("Projects seeded!");
  process.exit();
})
.catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
