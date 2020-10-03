const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, minlength: 5},
},
 {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);


