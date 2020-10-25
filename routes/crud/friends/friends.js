const express = require("express");
const Friend = require("../../../models/Friend");
const User = require("../../../models/User");
const router = express.Router();

router.get("/pulldata/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(async (foundUser) => {
      const newArr = [];
      await Promise.all(
        foundUser.friends.map(async (friend) => {
          await Friend.findById(friend._id)
            .then((foundFriend) => newArr.push(foundFriend.name))
            .catch((err) => console.log(err));
        })
      );
      res.json(newArr);
    })
    .catch((err) => console.log(err));
});

router.post("/addfriend/:id/:name", (req, res) => {
  const id = req.params.id;
  const name = req.params.name;

  const newFriend = new Friend({
    name: name,
  });
  newFriend
    .save()
    .then((friend) => {
      User.findByIdAndUpdate(id, { $push: { friends: newFriend } })
        .then((response) => res.send(" has been successfully added."))
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
