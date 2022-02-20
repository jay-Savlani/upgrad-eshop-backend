module.exports = (app) => {
    const router = require("express").Router();

    const orderController = require("../controllers/order.controller");

    // importing user auth as only users can access this route (not even admins)

    app.use("", router);

    // route to create an order

    const userAuth = require("../middlewares/user.auth");
    
    router.post("/orders", userAuth ,orderController.createOrder);

}