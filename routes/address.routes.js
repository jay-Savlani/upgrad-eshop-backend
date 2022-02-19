module.exports = (app) => {
    const router = require("express").Router();

    const addressController = require("../controllers/address.controller");

    // importing auth middleware

    const auth = require("../middlewares/auth");

    app.use("", router);

    // using auth middleware in adding address

    router.post("/addresses", auth  , addressController.addAddress);

}