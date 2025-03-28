const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
const port = 3000;

// Import models from the 'Models' folder in the 'backend' directory
const Signup = require('./Models/signup');
const Auction = require('./Models/auction');

// Signup API
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, dob, rollNo, college } = req.body;
    const user = await Signup.create({
      name,
      email,
      password,
      dob,
      rollNo,
      college
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user', details: error.message });
  }
});

// Signin API
app.post('/signin', async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const user = await Signup.findOne({ rollNo, password });
    if (user) {
      res.status(200).json({ message: 'Signin successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error signing in', details: error.message });
  }
});

// Add Auction Data API
app.post('/auction', async (req, res) => {
  try {
    const { title, description, link, img } = req.body;
    const auction = await Auction.create({
      title,
      description,
      link,
      img
    });
    res.status(201).json({ message: 'Auction created successfully', auction });
  } catch (error) {
    res.status(400).json({ error: 'Error creating auction', details: error.message });
  }
});

// Retrieve Auction Data API
app.get('/auction', async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.status(200).json({ message: 'Auctions retrieved successfully', auctions });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving auctions', details: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// MongoDB Connection with your connection string
mongoose
  .connect('mongodb+srv://john:E7HvcSfqrCHV6PXD@mycluster.e8wzycn.mongodb.net/auctionDB')
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));