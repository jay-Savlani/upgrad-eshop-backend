const db = require("../models");
const Product = db.product;

// importing utility functions 

const utils = require("../utils/utils");

exports.addProduct = async (req, res) => {


    const { name, category, price, description, manufacturer, availableItems, imageUrl } = req.body;

    // validating price

    const numberPrice = Number(price);
    if (isNaN(numberPrice)) {
        res.status(400).send({
            message: "Price should be a number"
        });
        return;
    }

    // validating available items

    const numAvailablePrice = Number(availableItems);
    if (isNaN(numAvailablePrice)) {
        res.status(400).send({
            message: "Available items should be a number"
        });
        return;
    }

    // saving product

    // counting number of documents in products collection

    const count = await Product.find({}).count();



    const newProduct = new Product({ ...req.body, product_id: count + 1 });

    newProduct.save()
        .then(product => {
            if (product !== null) {
                res.status(200).json({
                    product: product,
                    message: "Product added sucessfully"
                });
            }
            else {
                res.status(500).json({
                    message: "Internal server error"
                });
            }
        })
        .catch(err => {
            console.log("Server error in saving product: ", err);
            res.status(500).json({
                message: "Internal server error"
            });
        })


}


exports.searchProduct = (req, res) => {
    const { category, direction, name, sortBy } = req.query;

    // check if direction has any other vlaue other than asc or desc
    if (direction) {
        if (direction !== "asc" && direction !== "desc") {
            res.status(400).json({
                message: "Invalid direction parameter"
            });
            return;
        }
    }

    
    // building sort criteria 

    const sortCriteria = utils.buildProductSortCriteria(direction, sortBy);

    // building filter criteria

    const filter = utils.buildFindProductFilter(name, category);

    // finding documents based of criterial

    Product.find(filter)
        .sort(sortCriteria)
        .then(products => {
            // check if products array is null or not
            if (products.length !== null) {
                res.status(200).json({
                    products: products
                });

            }
            // else products array is empty
            else {
                res.status(404).json({
                    message: "No products found!"
                })
            }
        })
        .catch(err => {
            console.log("Server error in finding products and sorting: ", err);
            res.status(500).json({
                message: "Interal Server Error"
            })
        })

}