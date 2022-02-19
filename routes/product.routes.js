module.exports = (app) => {
    const router = require("express").Router();

    const productController = require("../controllers/product.controller");

    app.use("", router);

    router.get("/products" , /* contoller method */);

    router.get("/products/categories",  /* contoller method */);

    router.get("/products/:id",  /* contoller method */);

    router.post("/products" , /* contoller method */);

    router.put("/products/:id",  /* contoller method */);
    
    router.delete("/products/:id",  /* contoller method */);

}