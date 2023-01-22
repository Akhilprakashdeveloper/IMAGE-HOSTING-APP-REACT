const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  apikey: String,
});

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
