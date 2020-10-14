const express = require("express");
const User = require("../../../models/User");
const router = express.Router();

router.get('/pulldata/:id', (req, res) => {
  User.findById(req.params.id)
    .then(response => {
      res.json(response.friends);
    } )
    .catch(err=>console.log(err));
})

router.post('/addfriend/:id/:name', (req, res) => {
  const id = req.params.id;
  const name = req.params.name
  
  User.findByIdAndUpdate(id, { $push: {friends: {name: name}}})
    .catch(err => console.log(err.message))
  // User.update(
  //   { _id: req.params.id },
  //   { $push: { friends: req.params.name }},
  // ).catch(err => console.log(err));
  
  // User.findById(req.params.id)
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err));
});

module.exports = router;