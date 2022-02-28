const db = require("../models");
const Product = db.product;

// importing utility functions 

const utils = require("../utils/utils");

exports.addProduct = async (req, res) => {

    console.log("Recieved request to add product");
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
    console.log("request recieved to search product");
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


// controller method to get product categories

exports.getProductCategories = (req, res) => {
    // using distinct method of mongoose

    Product.distinct('category')
    .then(categories => {
        // checking if categories is not empty
        if(categories.length !== 0 ) {
            res.status(200).json({
                categories: categories
            })
        }
        // else return not found
        else {
            res.status(404).json({
                message: "Categories not found"
            });
        }
    })
    .catch(err => {
        console.log("Server error in performing distinct operation  ", err);
        res.status(500).json({
            message: "Internal server error"
        })
    })
}

// controller method to get product by id

exports.getProductById = (req,res) => {
    console.log("Recieved request to get product by id");
    const {id} = req.params;

    // search the databse for the id given

    Product.findOne({product_id: id})
    .then(product => {
        // checking if product is null or not
        if(product !== null) {
            res.status(200).json({
                product: product,
                message: "Product fetched successfully"
            })
        }
        // else no product found
        else {
            res.status(404).json({
                message: "No product found!"
            })
        }
    })
    .catch(err => {
        console.log("Server error in finding product by id: ", err);
        res.status(500).json({
            message: "Internal server error"
        })
    })
}

// controller method to update product by id

exports.updateProductByid = (req,res) => {
    console.log("request recieved to update product");
    const {id} = req.params;

    const { name, category, price, description, manufacturer, availableItems, imageUrl } = req.body;

    // creating an update object to take only the values that are necessary

    const updateObject = {
        name: name,
        category: category,
        price: price,
        description: description,
        manufacturer: manufacturer,
        availableItems: availableItems,
        imageUrl: imageUrl
    }

    if(id === undefined) {
        res.status(404).json({
            message: `No Product found`
        });
        return;
    }

    Product.findOneAndUpdate({product_id: id}, updateObject, {new: true})
    .then(product => {
        // checking if product is null or not
        if(product !== null) {
            res.status(200).json({
                product: product,
                message: "Product updated successfully"
            });
        }
        // else product is not found for give id
        else {
            res.status(404).json({
                message: `No Product found for ID - ${id}!`
            })
        }
    })
    .catch(err => {
        console.log("server error in updating a product: ", err);
        res.status(500).json({
            message: "Internal server error"    
        });
    })

    
}

// controller method to delete a product

exports.deleteProductById = (req,res) => {
    const {id} = req.params;

    // delete product

    Product.findOneAndDelete({product_id: id})
    .then(product => {
        // checking if product is null or not
        if(product !== null) {
            res.status(200).json({
                message: `Product with ID - ${id} deleted successfully!`
            });
        }
        // else product is not found for give id
        else {
            res.status(404).json({
                message: `No Product found for ID - ${id}!`
            })
        }
    })
    .catch(err => {
        console.log("server error in deleting a product: ", err);
        res.status(500).json({
            message: "Internal server error"    
        });
    })

}