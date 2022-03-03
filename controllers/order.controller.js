const db = require("../models");
const Order = db.order;
const Address = db.address;
const Product = db.product;
const User = db.user;

// controller method to create an order

exports.createOrder = async (req, res) => {
    console.log("recieved request to create order");
    const { userEmail, productId, addressId, quantity } = req.body;


    if (!userEmail || !productId || !addressId || !userEmail) {
        res.status(400).json({
            message: "Please provide all details"
        });
        return;
    }

    // declaring object id counterparts of productId, userId, addressId

    let userObjectId = "";
    let addressObjectId = "";

    // searching for user in the databse

    User.findOne({email: userEmail})
    .then(user => {
        // check if user is not null
        if(user !== null) {
            userObjectId = user._id;
        }
        // else user is not found
        else {
            res.status(404).json({
                message: `No user found for email - ${userEmail}!`
            });
            return;
        }
    })
    .catch(err => {
        console.log('server error inside order controller, searching user: ', err);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
    })

    // search if address exists in the database

    Address.findOne({ address_id: addressId })
        .then(address => {
            // check if address is null
            if (address === null) {
                res.status(404).json({
                    message: `No Address found for ID - ${addressId}!`
                });
                return;
            }
            // take _id value and store
            else {
                addressObjectId = address._id;
            }
        })
        .catch(err => {
            console.log('server error inside order controller, searching address: ', err);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        })
    
        // calculating total number of order documents

        const count = await Order.find({}).count();

    // checking for product in the database and performing business logic

    Product.findOne({ _id: productId })
        .then(product => {
            // checking if product is not null
            if (product !== null) {
                // prodouct is found

                // storing product _id

                // comparing product stock and quantity

                if ((product.availableItems - quantity) >= 0) {
                    // stock is available to carry out the order

                    // calculating total amount 

                    const amount = product.price * quantity;

                    // creating new order document

                    const newOrder = new Order({
                        user: userObjectId,
                        address: addressObjectId,
                        product: productId,
                        quantity: quantity,
                        amount: amount,
                        order_id: count + 1
                    });

                    // saving new order

                    newOrder.save()
                        .then(order => {
                            // checking if order is not null 
                            if (order !== null) {
                                // send response to client and update product stock

                                // populate the order document with respective references
                                order.populate([{
                                    path: "user"
                                },
                                {
                                    path: "address",
                                    populate: {path: "user"}
                                },
                                {
                                    path: "product"
                                }
                                    
                                ])
                               
                                .then(orderPopulated => {
                                    res.status(200).json({
                                        order: orderPopulated,
                                        message: "Order created successfully!"
                                    });
                                })
                                
                                // update product stock and save
                                product.availableItems = product.availableItems - quantity;
                                product.save();
                                return;
                            }
                        })
                        .catch(err => {
                            console.log('Server error in saving new Order: ', err);
                            res.status(500).json({
                                message: "Internal Server Error"
                            });
                            return;
                        })
                }
                // else product is out of stock
                else {
                    res.status(406).json({
                        message: `Product with ID - ${productId} is currently out of stock!`
                    });
                    return;
                }
            }
            // else product is not found in the databse
            else {
                res.status(400).json({
                    message: `No Product found for ID - ${productId}!`
                });
                return;
            }
        })

}