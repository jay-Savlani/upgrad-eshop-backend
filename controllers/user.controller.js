const db = require("../models");
const User = db.user;

// requiring bcrypt algorithm to store hashed password in database
const bcrypt = require("bcrypt");

// importing util functions 

const utils = require("../utils/utils");

exports.signup = (req,res) => {
        
    const {firstName, lastName, email, password, contactNumber} = req.body;

    // check if the email already exists in the database

    User.findOne({email: email})
    .then(user => {
        if(user !== null) { 
            res.status(409).json({
            message: "Try any other email, this email is already registered!"
        });
        return;
    }
        else {
            // check whether email is valid or not
            if(!utils.validateEmail(email)) {
                // send response 
                res.status(400).json({
                    message: "Invalid email-id format!"
                });
                return;

            }

            // check for contact number

            // converting contactNumber to a Number for conctact number validation

            const contact = Number(contactNumber);

            if(isNaN(contact) || contactNumber.length < 10) {
                // contact number is invalid
                res.status(400).json({
                    message: "Invalid contact number!"
                });
                return;
            }

            // email id and contact number are valid

            // creating a hashed password to be stored in database

            const hashedPass = bcrypt.hashSync(password, 10);

            const newUser = new User({...req.body, password: hashedPass});
            newUser.save()
            .then(user => {
                res.status(200).json({
                    user: user,
                    message: "Signup successfull"
                })
            })
            .catch(err => {
                console.log("server error in signing up: ", err);
                res.status(500).json({
                    message: "Internal server error"
                })
            })
        }
    })
    .catch(err => {
        console.log("Server error in finding user for signup: ", err);
        res.status(500).json({
            message: "internal server error"
        })
    })

}