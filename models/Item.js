const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: String,
  customUrl: [],
});

module.exports = Item = mongoose.model("items", ItemSchema);
