const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HolidaySchema = new Schema({
  name: String,
  date: Date,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "items" }],
});

module.exports = Holiday = mongoose.model("holidays", HolidaySchema);
