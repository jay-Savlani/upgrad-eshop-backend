module.exports = (app) => {
    const router = require("express").Router();

    const productController = require("../controllers/product.controller");

    app.use("", router);

    // searching for products

    router.get("/products" , productController.searchProduct);

    router.get("/products/categories",  /* contoller method */);

    router.get("/products/:id",  /* contoller method */);

    // add a product

    router.post("/products" , productController.addProduct);

    router.put("/products/:id",  /* contoller method */);
    
    router.delete("/products/:id",  /* contoller method */);

}