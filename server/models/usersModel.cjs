const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,  // hashed password for login
  role: String,  // 'interviewer' or 'student'
  additionalInfo: {
    interviewerProfile: {
      experience: String,
      expertise: [String],  // e.g., ["front end", "back end"]
    },
    studentProfile: {
      yearOfStudy: Number,
      major: String,
      workExperience: [String],
    },
  },
});

userSchema.methods.comparePassword = async function(userPassword) {
  
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    
    return isMatch;
  } catch (error) {
    
    throw new Error("Error comparing passwords.");
  }
};



module.exports = mongoose.model('Users', userSchema);
