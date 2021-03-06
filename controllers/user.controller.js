const db = require("../models");
const User = db.user;

// requiring bcrypt algorithm to store hashed password in database
const bcrypt = require("bcrypt");

// requiring jsonwebtoken to generate an access token
const jwt = require("jsonwebtoken");

// importing util functions 

const utils = require("../utils/utils");

exports.signup = async (req,res) => {
    console.log("request recieved to sign up user");
        
    const {firstName, lastName, email, password, contactNumber} = req.body;

    // check if the email already exists in the database

    // count the number of users 

    const count = await User.find({}).count();

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

            // saving new user

            const newUser = new User({...req.body, password: hashedPass, userName: `${firstName} ${lastName}`, user_id: count + 1});
            newUser.save()
            .then(user => {
                res.status(200).json({
                    user: user,
                    message: "Signup successfull! Please login"
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

    console.log("request received to login")

    const {email, password} = req.body;



    if(!utils.validateEmail(email)) {
        // send response 
        res.status(400).json({
            message: "Invalid email-id format!"
        });
        return;

    }

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

            const token = jwt.sign({username: user.userName, role: user.role}, "hash77", {expiresIn: "10h"})

            // sending token to response header

            res.setHeader("x-auth-token", token);
            res.setHeader("x-heelo" , "helloworld");

            res.status(200).json({
                email: email,
                name: user.userName,
                isAuthenticated: true,
                message: "Login Successfull!",
                role: user.role
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

// fetch addresses based on user email 

exports.getUserAddresses = (req, res) => {
    console.log("request recieved to get user address");
    // console.log("req body is", req.body);
    const {email} = req.body;

    // query user data based on email

    User.findOne({email: email})
    .then(user => {
        // checking if user is null or not

        if(user !== null) {
            // populate user send address
            user.populate('address')
            .then(userPopulated => {
               
                res.status(200).json({
                    addresses: userPopulated.address,
                    message: "Addresses fetched successfully"
                });
            })
            
        }
        // else user is not found
        else {
            res.status(404).json({
                message: "user not found"
            });
        }
    })
    .catch(err => {
        console.log("server error in find user with email: ", err);
        res.status(500).json({
            message: "Internal server error"
        })
    })
}