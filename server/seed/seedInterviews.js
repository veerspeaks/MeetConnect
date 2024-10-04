const mongoose = require('mongoose');
const Interview = require('../models/interviewModel.cjs');  // Ensure this path is correct
const database = require('../config/database.cjs');


mongoose.connect(database.mongoURI)
.then(() => {
    console.log("Connection established to database");

    const ObjectId = mongoose.Types.ObjectId;

    const interviews = [
        {
          studentId: new ObjectId('66f58b28bb8855d9c63e917c'),  // Alice Johnson (student)
          interviewerId: new ObjectId('66f58b28bb8855d9c63e917a'),  // John Doe (interviewer)
          category: 'front end',
          scheduledDate: new Date('2024-10-05T10:00:00Z'),
          status: 'pending',
          feedback: {
            score: null,  // No score yet as it's pending
            comments: '',
          },
        },
        {
          studentId: new ObjectId('66f58b28bb8855d9c63e917d'),  // Bob Williams (student)
          interviewerId: new ObjectId('66f58b28bb8855d9c63e917b'),  // Jane Smith (interviewer)
          category: 'back end',
          scheduledDate: new Date('2024-09-28T14:00:00Z'),
          status: 'completed',
          feedback: {
            score: 7,
            comments: 'Good grasp of concepts but needs to improve on algorithmic thinking.',
          },
        },
        {
          studentId: new ObjectId('66f58b28bb8855d9c63e917c'),  // Alice Johnson (student)
          interviewerId: new ObjectId('66f58b28bb8855d9c63e917b'),  // Jane Smith (interviewer)
          category: 'behavioral',
          scheduledDate: new Date('2024-09-25T09:00:00Z'),
          status: 'completed',
          feedback: {
            score: 9,
            comments: 'Strong communication and leadership skills.',
          },
        },
        {
          studentId: new ObjectId('66f58b28bb8855d9c63e917d'),  // Bob Williams (student)
          interviewerId: new ObjectId('66f58b28bb8855d9c63e917a'),  // John Doe (interviewer)
          category: 'full stack',
          scheduledDate: new Date('2024-10-10T16:00:00Z'),
          status: 'pending',
          feedback: {
            score: null,
            comments: '',
          },
        },
      ];

     Interview.insertMany(interviews)
     .then(message => {
        console.log('successfully added :', message )
        mongoose.connection.close()
     }
    )
     .catch(e => {
        console.log('failed to add to database', e)
        mongoose.connection.close()
     }
        
     )
    
    module.exports = interviews;
})