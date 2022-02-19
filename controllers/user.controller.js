const db = require("../models");
const User = db.user;

// requiring bcrypt algorithm to store hashed password in database
const bcrypt = require("bcrypt");

// requiring jsonwebtoken to generate an access token
const jwt = require("jsonwebtoken");

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

            const newUser = new User({...req.body, password: hashedPass, userName: `${firstName} ${lastName}`});
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

exports.auth = (req,res) => {
    const {email, password} = req.body;

    // checking if email exists in the databse

    User.findOne({email: email})
    .then(user => {
        if(user === null) {
            res.status(401).json({
                message: "This email has not been registered!"
            });
            return;
        }

        // check for password

        if(bcrypt.compareSync(password, user.password)) {
            // password matches 

            // generating an access token using jsonwebtoken

            const token = jwt.sign({username: user.userName}, "hash77", {expiresIn: "10h"})

            // sending token to response header

            res.setHeader("x-auth-token", token);

            res.status(200).json({
                email: email,
                name: user.userName,
                isAuthenticated: true
            });
        }
        // else password is invalid
        else {
            res.status(401).json({
                message: "Invalid Credentials!"
            });
        }
    })
    .catch(err => {
        console.log("server error in finding user:  ", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    })
}