const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/usersModel.cjs'); // Adjust the path to your User model

const saltRounds = 10; // Number of salt rounds for bcrypt

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/meetconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const hashPasswords = async () => {
  try {
    // Fetch all users from the database
    const users = await User.find({});

    // Loop through each user and hash their password if it's not already hashed
    for (let user of users) {
      // Check if password is already hashed (bcrypt hashes have 60 characters)
      if (user.password.length !== 60) {
        console.log(`Hashing password for user: ${user.email}`);
        
        // Hash the plain-text password
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        
        // Update the user's password with the hashed one
        user.password = hashedPassword;
        
        // Save the updated user back to the database
        await user.save();
        console.log(`Password updated for user: ${user.email}`);
      } else {
        console.log(`Password for user: ${user.email} is already hashed.`);
      }
    }

    console.log('Password hashing process completed.');
    mongoose.connection.close(); // Close the database connection after processing
  } catch (err) {
    console.error('Error hashing passwords:', err);
    mongoose.connection.close();
  }
};

// Call the function to start hashing passwords
hashPasswords();
