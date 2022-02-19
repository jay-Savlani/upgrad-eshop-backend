module.exports = (app) => {
    const router = require("express").Router();

    const userController = require("../controllers/user.controller");

    app.use("", router);

    router.get("/users" , /* controller method */ );

    router.post("/auth", /* controller method */ );



}