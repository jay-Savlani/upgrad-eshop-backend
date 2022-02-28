const db = require("../models");
const Address = db.address;
const User = db.user;

exports.addAddress = async (req, res) => {
    console.log("Request recieved to add address");
    const { name, contactNumber, street, landmark, city, state, zipcode, userEmail } = req.body;

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

    // counting number of documents in address collection

    const count = await Address.find({}).count();

    // data to be saved in address databse
    const addressData = {
        name: name,
        contactNumber: contactNumber,
        street: street,
        landmark: landmark,
        city: city,
        state: state,
        zipcode: zipcode,

    }


    const newAddress = new Address({ ...addressData, address_id: count + 1 });
    newAddress.save()
        .then(address => {
            if (address !== null) {
                
                // finding user and saving address id in user 
                User.findOne({email: userEmail})
                .then(user => {
                    user.address.push(address._id);
                    user.save();

                    // saving user id in the address

                    address.user = user._id;
                    address.save();

                    // sending populate address as the response

                    address.populate('user')
                    .then(address => {
                        res.status(200).json({
                            address: address,
                            message: "Address added successfully"
                        })
                    })
                })
                .catch(err => {
                    console.log("error in finding user while saving new address: ", err);
                    res.status(404).json({
                        message: `no user found to save address to`
                    })
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

// // address controller method to fetch address based on user id

// exports.fetchAddress = async (req, res) => {
//     const { id } = req.params;

//     // query user collection based on user_id

//     let userObjectId = "";

//     await User.findOne({user_id: id})
//     .then(user => {
//         // check if user is null or not
//         if(user !== null) {
//             userObjectId = user._id;
//             console.log("user _id: ", userObjectId);
//         }
//         else {
//             res.status(404).json({
//                 message: `user with id  - ${id} not found`
//             });
//             return;
//         }
//     })
//     .catch(err => {
//         console.log("server error in finding user in address controller: ", err)
//         res.status(500).json({
//             message: "Internal Server Error"
//         });
//         return;
//     })

//     // populate address data and then match user id

//     Address.findOne({user: userObjectId}).populate('user')
//         .then(address => {
//             console.log(address);
//             // checking if address is null or not
//             if (address !== null) {
//                 res.status(200).json({
//                     address: address,
//                     message: "Address fetched successfully!"
//                 });
//             }
//             // else no address found
//             else {
//                 res.status(404).json({
//                     message: `No Address found for user id - ${id}`
//                 });
//             }
//         })
//         .catch(err => {
//             console.log("server error in getting address: ", err);
//             res.status(500).json({
//                 message: "Internal Server Error"
//             });
//         })
// }



