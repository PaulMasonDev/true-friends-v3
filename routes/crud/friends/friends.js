const express = require("express");
const router = express.Router();

router.get('/pulldata/:id', (req, res) => {
  User.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err=>console.log(err));
})

module.exports = router;