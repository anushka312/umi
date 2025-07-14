const express = require('express');
const connectDB = require('./db');
const app = express();

const cors = require('cors');

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'https://verdefi.onrender.com'],
  credentials: true
}));

app.use(express.json());



const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use(projectRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
