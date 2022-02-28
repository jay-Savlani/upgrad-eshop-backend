module.exports = (app) => {
    const router = require("express").Router();

    const userController = require("../controllers/user.controller");

    app.use("", router);

    router.post("/users" , userController.signup);

    router.post("/auth", userController.auth );

    router.post("/user/addresses" , userController.getUserAddresses );

}