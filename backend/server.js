import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Import Routes
import userRoutes from './src/routes/userRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to talk to this API
app.use(express.json()); // Allows us to accept JSON data in the body

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Bean and Vanilla API is running...');
});


// Routes
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold
  )
);