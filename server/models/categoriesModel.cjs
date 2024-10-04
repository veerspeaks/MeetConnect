const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

        
        categoryName: String,  // e.g., 'front end', 'back end', 'full stack', 'behavioral'
        description: String,  // description of the category
      
      
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
