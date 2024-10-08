require('dotenv').config();

 // Log the environment variable

module.exports = {
    mongoURI: process.env.MONGODB_URI
};

console.log(process.env.MONGODB_URI)