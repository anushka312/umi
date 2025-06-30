const express = require('express');
const connectDB = require('./db');
const app = express();

const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());



const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
