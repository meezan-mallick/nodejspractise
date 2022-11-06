const mongoose = require("mongoose");
const { stringify } = require("querystring");

let mySchema = mongoose.Schema;

//define schema
let myUserSchema = new mySchema({
  firstName: { type: String, required: [true, "first name is required.."] },
  lastName: String,
  email: String,
  Number: String,
});

const tableName = "users";

let userData = mongoose.model(tableName, myUserSchema);

module.exports = userData;
