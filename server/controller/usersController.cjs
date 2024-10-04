
const Users = require('../models/usersModel.cjs');
const passport = require('passport')
const bcrypt = require('bcrypt');


exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch categories", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getInfo = (req, res) => {
    try {
        // Attempt to find the user by their ID stored in the session
        Users.findById(req.session.passport.user)
            .then(user => {
                // If the user is not found, send a 404 response with a message
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // If the user is found, send the user data as a JSON response
                res.json(user);
            })
            // If there is an error during the database query, send a 500 response with an error message
            .catch(e => res.status(500).json({ message: 'Server error', error: e }));
    } catch (e) {
        // If there is an error in the try block, log the error and send a 500 response with an error message
        console.log('hitting error');
        res.status(500).json({ message: 'Server error', error: e });
    }
};


exports.signIn = (req, res, next) => {
    
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ user: user });
        });
    })(req, res, next);
};


exports.signOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        return res.status(200).json({ message: 'Successfully logged out' });
    });
};


exports.signUp = async (req, res) => {
    try {
        const users = await Users.find({email: req.body.email});
        
        if(users.length != 0){
            res.send("User already exist")
        }
        if(users.length == 0){
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            Users.create({name: req.body.name , email:req.body.email , password: hashedPassword})
            return res.status(200).json({ message: 'Successfully signed up' })
        }
        
        
        
    } catch (error) {
        console.error("Failed to fetch categories", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updateUser = async (req, res) => { 
    try {
        const user = await Users.findById(req.session.passport.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.name = req.body.name;
        user.additionalInfo.studentProfile.yearOfStudy = req.body.yearOfStudy;
        user.additionalInfo.studentProfile.major = req.body.expertise;
        
        // Check if workExperience exists, if not, initialize it
        if (!user.additionalInfo.studentProfile.workExperience) {
            user.additionalInfo.studentProfile.workExperience = [];
        }
        // Assign the value from req.body.workExperience
        console.log(req.body.workExperience);
        user.additionalInfo.studentProfile.workExperience = req.body.workExperience;
        user.profilePicture = req.body.profilePicture
        
        await user.save();
        res.json(user);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


