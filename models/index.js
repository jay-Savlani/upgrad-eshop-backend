
const {url} = require("../config/db.config");
const mongoose = require("mongoose");

const User = require("./user.model")(mongoose);
const Address = require("./address.model")(mongoose);

const db = {};

db.url = url;
db.mongoose = mongoose;
db.user = User;
db.address = Address;

module.exports = db;