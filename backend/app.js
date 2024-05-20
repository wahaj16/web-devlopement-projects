const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
// app.use(bodyParser.json());

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

// Create the user model
const User = mongoose.model('message', userSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/menstack")
  .then(() => {
    const port = 5000;
    app.listen(port, () => {
      console.log("Connected to the database and listening on port", port);
    });
  })
  .catch(err => {
    console.log("Error connecting to the database:", err);
  });

// Get all users
app.get('/user', async (req, res) => {
  try {
    const messages = await User.find();
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new user
app.post('/user', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const user = new User({ name, email, subject, message });

    // Save the user and await the result
    const savedUser = await user.save();
    console.log('User saved:', savedUser);

    // Send the saved user as response
    res.status(201).send(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
