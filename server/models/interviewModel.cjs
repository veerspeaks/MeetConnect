const mongoose = require('mongoose');
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const interviewSchema = new Schema({
    
    studentId: ObjectId,  // reference to student
    interviewerId: ObjectId,  // reference to interviewer
    category: String,  // e.g., 'front end', 'back end'
    scheduledDate: Date,
    status: String,  // 'completed' or 'pending'
    feedback: {
      score: Number,  // score given by interviewer
      comments: String,  // feedback comments
    }
  }
  )

module.exports = mongoose.model('Interview', interviewSchema);