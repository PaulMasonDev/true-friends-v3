const express = require("express");
const Friend = require("../../models/Friend");
const Holiday = require("../../models/Holiday");
const User = require("../../models/User");
const router = express.Router();

// CREATE Holiday Route
router.post(
  "/createholiday/:friendId/:holidayName/:holidayDate",
  (req, res) => {
    const friendId = req.params.friendId;
    const holidayName = req.params.holidayName;
    const holidayDate = req.params.holidayDate;

    const newHoliday = new Holiday({
      name: holidayName,
      date: holidayDate,
    });

    newHoliday
      .save()
      .then((holiday) => {
        Friend.findByIdAndUpdate(friendId, { $push: { holidays: newHoliday } })
          .then((response) => res.send(" has been successgully added"))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  }
);

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
              newArr.push(foundHoliday);
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

// UPDATE holiday name route
router.put("/updateholiday/:holidayId/:holiday", (req, res) => {
  const holidayId = req.params.holidayId;
  const holiday = req.params.holiday;
  console.log("holidayId: ", holidayId, "holiday: ", holiday);

  Holiday.findByIdAndUpdate(holidayId, { name: holiday })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});

// UPDATE holiday date route
// router.put("/updateholiday/:holidayId/:date", (req, res) => {
//   const holidayId = req.params.holidayId;
//   const date = req.params.date;
//   console.log("holidayId: ", holidayId, "date: ", date);

//   Holiday.findByIdAndUpdate(holidayId, { date: date })
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });

// DELETE holiday route
router.delete("/deleteholiday/:friendId/:holidayId", (req, res) => {
  const friendId = req.params.friendId;
  const holidayId = req.params.holidayId;

  console.log("friendId: ", friendId, "holidayId: ", holidayId);
  Friend.findByIdAndUpdate(friendId, { $pull: { holidays: holidayId } })
    .then(() => Holiday.findByIdAndRemove(holidayId))
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});
module.exports = router;
