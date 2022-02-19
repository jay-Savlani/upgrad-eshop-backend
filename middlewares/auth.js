// authentication middleware for verifying json web token 

const db = require("../models");
const User = db.user; 

// requiring jsonwebtoken
const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {
    // verifying access token
    try{
        const token = req.headers["x-auth-token"];
        // console.log("token in middleware:  ", token);
        jwt.verify(token, "hash77", function(err,decoded){
            if(decoded.username) {
                
                // username is defined
                // search for user in the database
                User.findOne({userName: decoded.username})
                .then(user => {
                    // if user is not null then continue exit middleware and give control to next method
                    if(user !== null) next();
                    // tempered token
                    else {
                        res.status(401).json({
                            message: "Please Login first to access this endpoint!"
                        })
                    }
                })
            }
        })
        
    }
    catch(ex) {
        res.status(401).json({
            message: "Please Login first to access this endpoint!"
        });
    }
} 

