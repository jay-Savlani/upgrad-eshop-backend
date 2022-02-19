const db = require("../models");
const Address = db.address;

exports.addAddress = (req, res) => {
    const { name, contactNumber, street, landmark, city, state, zipcode, user } = req.body;

    // validating zip code

    const zip = Number(zipcode);

    if (isNaN(zip) || zipcode.length !== 6) {
        // contact number is invalid
        res.status(400).json({
            message: "Invalid zip code!"
        });
        return;
    }

    // validating contact number

    const contact = Number(contactNumber);

    if (isNaN(contact) || contactNumber.length < 10) {
        // contact number is invalid
        res.status(400).json({
            message: "Invalid contact number!"
        });
        return;
    }

    // adding address to the database

    const newAddress = new Address(req.body);
    newAddress.save()
    .then(address => {
        if(address !== null) {
            // sending address in response
            address.populate("user")
            .then(addressPopulated => {
                res.status(200).json({
                    address: addressPopulated,
                    message: "Address added successfully!"
                })
            })
            .catch(err => {
                console.log("server error in populating address with user: ", err);
                res.status(500).json({
                    message: "Internal Server Error"
                });
            })
            
        }
        // else 
        else {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    })
    .catch(err => {
        console.log("server error in adding address to the databse: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    })
}