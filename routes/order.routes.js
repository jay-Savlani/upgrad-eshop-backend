module.exports = (app) => {
    const router = require("express").Router();

    const orderController = require("../controllers/order.controller");

    app.use("", router);

    // route to create an order
    
    router.post("/orders" ,orderController.createOrder);

}