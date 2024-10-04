const mongoose = require('mongoose');
const Category = require('../models/categoriesModel');
const database = require('../config/database');


mongoose.connect(database.mongoURI)
.then(() => {
    console.log("Connection established to database");

    const interviewCategories = [
    {
      categoryName: 'front end',
      description: 'Covers topics related to front-end development, including HTML, CSS, JavaScript, React, and responsive design.',
    },
    {
      categoryName: 'back end',
      description: 'Focuses on server-side development, including Node.js, databases, APIs, and server infrastructure.',
    },
    {
      categoryName: 'full stack',
      description: 'Combines both front-end and back-end development, requiring knowledge of full-stack technologies.',
    },
    {
      categoryName: 'behavioral',
      description: 'Assesses communication, teamwork, leadership, and problem-solving skills in real-world scenarios.',
    },
  ];

  Category.insertMany(interviewCategories)
  .then(() => {
    console.log('Interview categories seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding interview categories:', err);
  });
}
)
  