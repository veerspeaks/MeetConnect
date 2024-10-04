const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({

        
        questionCategory: String,
        question: String,  // e.g., 'front end', 'back end', 'full stack', 'behavioral'
        answer: String,  // description of the category
      
      
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;
