const mongoose = require('mongoose');
const Users = require('../models/usersModel.cjs');  // Ensure this path is correct
const database = require('../config/database.cjs');
const bcrypt = require('bcrypt');

mongoose.connect(database.mongoURI)
  .then( async () => {
    console.log("connected to MongoDB");

    const users = [
      {
        name: "Pritam Das",
        email: "prtiamsona@gmail.com",
        password: await bcrypt.hash("hashedpassword123",10),  // This should be replaced with a real hashed password
        role: "student",
        additionalInfo: {
        studentProfile: {
            yearOfStudy: "6",
            major: "Chemistry",
            workExperience: ["Post Office"],
          },
        },
      },
      
    ];

    Users.insertMany(users)
      .then(result => {
        console.log('Data saved:', result);
        mongoose.connection.close();
      })
      .catch(e => {
        console.error('Error saving data:', e);
        mongoose.connection.close();
      });

  })
  .catch(e => {
    console.log("Error connecting to MongoDB:", e);
  });
