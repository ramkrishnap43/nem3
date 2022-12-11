const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  Title: String,
  Note: String,
  Tags: String,
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
