
const {url} = require("../config/db.config");
const mongoose = require("mongoose");

const User = require("./user.model")(mongoose);
const Address = require("./address.model")(mongoose);
const Product = require("./product.model")(mongoose);
const Order = require('./order.model')(mongoose);

const db = {};

db.url = url;
db.mongoose = mongoose;
db.user = User;
db.address = Address;
db.product = Product;
db.order = Order;

module.exports = db;