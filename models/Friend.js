const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FriendSchema = new Schema({
  name: String,
  holidays: [{ type: mongoose.Schema.Types.ObjectId, ref: "holidays" }],
});

module.exports = Friend = mongoose.model("friends", FriendSchema);
