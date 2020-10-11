const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const saltRounds = 15;

createUser = (req,res) => {

    if(!req.body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a user data",
        });
    }

    const user = new User(req.body);

    if(!user) {
        return res.status(400).json({
            success: false,
            error: err,
        });
    }
    // check if username exist
    User.findOne({name: req.body.username}, (err, username) => {
        if(username) {
            return res.status(400).json({
                error: "This username is already taken",
            });
        }
    });
    // check if e-mail taken
    User.findOne({email: req.body.email}, (err, email) => {
        if(email) {
            return res.status(400).json({
                error: "This e-mail is already in use",
            });
        }
    });
    // hash password
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
        if(error) {
            throw error;
        }
        user.password = hash;
        user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created'
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created',
            });
        })
    })
}

login = (req,res) => {
    if(!req.body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a user login data",
        });
    }
        User.findOne({name: req.body.username}, (err, user) => {
            if(!user) {
                return res.status(200).json({
                    err,
                    message: "User not found"
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (error, success) => {
                    if(!success) {
                        return res.status(200).json({
                            success: false,
                            message: "Password incorrect",
                        })
                    }
                    if(error) {
                        console.log(error);
                    }
                    return res.status(200).json({
                        success: true,
                        userData: {
                            id: user._id,
                            username: user.name,
                            email: user.email,
                        }
                    })
                });
            }
        });
};

module.exports = {
    createUser,
    login,
}