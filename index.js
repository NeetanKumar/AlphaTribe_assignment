require('dotenv').config(); // Load environment variables

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection logic
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// // Connect to MongoDB
connectDB();

// // Middleware
 app.use(express.json());
 app.use('/api/auth', authRoutes);
 app.use('/api/posts', postRoutes);
 app.use('/api/posts', commentRoutes);
 app.use('/api/user', userRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
