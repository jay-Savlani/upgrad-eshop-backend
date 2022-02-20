module.exports = (app) => {
    const router = require("express").Router();

    const productController = require("../controllers/product.controller");

    // importing admin auth middleware

    const adminAuth = require("../middlewares/admin.auth");

    app.use("", router);

    // searching for products

    router.get("/products" , productController.searchProduct);
    
    // get product categories

    router.get("/products/categories",  productController.getProductCategories);

    // get particular product by id

    router.get("/products/:id",  productController.getProductById);

    // add a product, requires authentication and authorization

    router.post("/products" , adminAuth , productController.addProduct);

    // update a product

    router.put("/products/:id", adminAuth , productController.updateProductByid);

    // delete a product
    
    router.delete("/products/:id",  adminAuth , productController.deleteProductById);

}