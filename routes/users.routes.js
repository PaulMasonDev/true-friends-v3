const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

router.route('/add').post((req, res) => {
  const username = req.body.username;

  User.create({username: username})
    .then(res => console.log('USER ADDED'))
    .catch(err => console.log(err));
  
  res.end();
});

module.exports = router;
