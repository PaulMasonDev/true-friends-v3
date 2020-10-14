const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FriendSchema = new Schema({
  name: String,
  occasions: []
});

module.exports = Friend = mongoose.model("friends", UserSchema);