const express = require('express');
const mongoose = require('mongoose');
const database = require('./config/database.cjs');
const categoryRoute = require('./route/categoryRoute.cjs')
const interviewRoute = require('./route/interviewRoute.cjs')
const usersRoute = require('./route/usersRoute.cjs')
const session = require('express-session')
const path = require('path'); // Import path module
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../server/models/usersModel.cjs')
const questionsRoute = require('../server/route/questionsRoute.cjs')

//connecting to MongoDB

mongoose.connect(database.mongoURI)
    .then(() =>{
        console.log("connected to MongoDB")
    })
    .catch(e => {
        console.error('errror establishing connection',e)
    })


// Initialize and sessionize Passport.js
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Define the strategy for Passport.js to use
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Customizing username field to be 'email'
    async (email, password, done) => { // This function is called when `passport.authenticate('local')` is triggered
      try {
        const user = await User.findOne({ email }); // Look up the user by email
        if (!user) {
            
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        
  
        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
  
        // If everything is correct, return the user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
    // Store the user's ID in the session
    
    done(null, user.id)
})

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
    
    try {
        // Attempt to find the user by their ID
        const user = await User.findById(id)
        // If the user is found, return them
        done(null, user)
    } catch (err) {
        // If an error occurs during the process, return the error
        done(err)
    }
})


//middleware
app.use(express.json())


function checkAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("User is not authenticated, redirecting...");
    
}



//routes

app.get('/api/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ authenticated: true, user: req.user });
    } else {
      return res.json({ authenticated: false });
    }
  });
  
app.use('/api/categories', checkAuthenticated, categoryRoute)
app.use('/api/interviews', checkAuthenticated, interviewRoute)
app.use('/api/users',usersRoute)
app.use('/api/questions', questionsRoute)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist'))); // Adjust path to your build directory

// Handle all requests by sending the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // Adjust path to your build directory
});

app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`)
}
)




