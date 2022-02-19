const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

// using dotenv 
require("dotenv").config();

// initializing express

const app = express();

// using middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// checking request

app.get("/", (req,res) => {
    res.send('Welcome to upGrad Eshop');
});

app.listen(process.env.PORT, () => console.log(`Server is listening on PORT ${process.env.PORT}`) );


