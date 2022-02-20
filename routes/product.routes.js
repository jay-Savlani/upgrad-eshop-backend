module.exports = (app) => {
    const router = require("express").Router();

    const productController = require("../controllers/product.controller");

    app.use("", router);

    // searching for products

    router.get("/products" , productController.searchProduct);
    
    // get product categories

    router.get("/products/categories",  productController.getProductCategories);

    // get particular product by id

    router.get("/products/:id",  productController.getProductById);

    // add a product

    router.post("/products" , productController.addProduct);

    // update a product

    router.put("/products/:id",  productController.updateProductByid);
    
    router.delete("/products/:id",  productController.deleteProductById);

}