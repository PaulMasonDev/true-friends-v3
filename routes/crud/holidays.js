const express = require("express");
const Friend = require("../../models/Friend");
const Holiday = require("../../models/Holiday");
const User = require("../../models/User");
const router = express.Router();

// CREATE Friend Route
// router.post("/createfriend/:id/:name", (req, res) => {
//   const id = req.params.id;
//   const name = req.params.name;

//   const newFriend = new Friend({
//     name: name,
//   });
//   newFriend
//     .save()
//     .then((friend) => {
//       User.findByIdAndUpdate(id, { $push: { friends: newFriend } })
//         .then((response) => res.send(" has been successfully added."))
//         .catch((err) => console.log(err.message));
//     })
//     .catch((err) => console.log(err.message));
// });

// READ friend route
router.get("/pulldata/:id", (req, res) => {
  const id = req.params.id;

  Friend.findById(id)
    .then(async (foundFriend) => {
      const newArr = [];
      await Promise.all(
        foundFriend.holidays.map(async (holiday) => {
          await Holiday.findById(holiday._id)
            .then((foundHoliday) => {
              newArr.push(foundfoundHoliday);
              // newArr.sort((a, b) => {
              //   if (a.name < b.name) {
              //     return -1;
              //   }
              //   if (a.name > b.name) {
              //     return 1;
              //   }
              //   return 0;
              // });
            })
            .catch((err) => console.log(err));
        })
      );
      res.json(newArr);
    })
    .catch((err) => console.log(err));
});

// UPDATE friend route
// router.put("/updatefriend/:friendid/:name", (req, res) => {
//   const friendId = req.params.friendid;
//   const name = req.params.name;

//   Friend.findByIdAndUpdate(friendId, { name: name })
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });

// DELETE friend route
// router.delete("/deletefriend/:userid/:friendid", (req, res) => {
//   const userId = req.params.userid;
//   const friendId = req.params.friendid;

//   User.findByIdAndUpdate(userId, { $pull: { friends: friendId } })
//     .then(() => Friend.findByIdAndRemove(friendId))
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });
module.exports = router;
