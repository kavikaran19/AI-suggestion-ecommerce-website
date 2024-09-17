const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');// Import categoryRoutes routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

require('dotenv').config();


const app = express();

// Middleware
app.use(cors()); // Allow all origins. Adjust as needed for security.
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas', err);
});

// Routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes); // Use product routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
