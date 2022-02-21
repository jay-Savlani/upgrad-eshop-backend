const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

// using dotenv to access env variables
require("dotenv").config();

// initializing express

const app = express();

// using middlewares
// using cors to allow cross origin requests
// using bodyParse to allow json and url encoded data in post requests

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// requiring routes
require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

// checking request

app.get("/", (req,res) => {
    res.send('Welcome to upGrad Eshop');
});

// connecting to database
const db = require("./models");

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connection to database successfull.");
})
.catch(() => {
    console.log("Failed to connect to database");
})

app.listen(process.env.PORT, () => console.log(`Server is listening on PORT ${process.env.PORT}`) );


