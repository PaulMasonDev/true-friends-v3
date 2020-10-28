const express = require("express");
const Friend = require("../../models/Friend");
const Holiday = require("../../models/Holiday");
const Item = require("../../models/Item");
const User = require("../../models/User");
const router = express.Router();

// CREATE Holiday Route
router.post("/createitem/:holidayId/:itemName", (req, res) => {
  const holidayId = req.params.holidayId;
  const itemName = req.params.itemName;

  const newItem = new Item({
    name: itemName,
  });
  newItem
    .save()
    .then((item) => {
      Holiday.findByIdAndUpdate(holidayId, { $push: { items: newItem } })
        .then((response) => res.send(" has been successfully added"))
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
});

// READ Item route
router.get("/pulldata/:holidayId", (req, res) => {
  const holidayId = req.params.holidayId;

  Holiday.findById(holidayId)
    .then(async (foundHoliday) => {
      const newArr = [];
      await Promise.all(
        foundHoliday.items.map(async (item) => {
          await Item.findById(item._id)
            .then((foundItem) => {
              newArr.push(foundItem);
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

// // UPDATE holiday name route
// router.put("/updateholiday/:holidayId/:holiday", (req, res) => {
//   const holidayId = req.params.holidayId;
//   const holiday = req.params.holiday;
//   console.log("holidayId: ", holidayId, "holiday: ", holiday);

//   Holiday.findByIdAndUpdate(holidayId, { name: holiday })
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });

// // UPDATE holiday date route
// // router.put("/updateholiday/:holidayId/:date", (req, res) => {
// //   const holidayId = req.params.holidayId;
// //   const date = req.params.date;
// //   console.log("holidayId: ", holidayId, "date: ", date);

// //   Holiday.findByIdAndUpdate(holidayId, { date: date })
// //     .then((response) => console.log(response))
// //     .catch((err) => console.log(err));
// // });

// // DELETE holiday route
// router.delete("/deleteholiday/:friendId/:holidayId", (req, res) => {
//   const friendId = req.params.friendId;
//   const holidayId = req.params.holidayId;

//   console.log("friendId: ", friendId, "holidayId: ", holidayId);
//   Friend.findByIdAndUpdate(friendId, { $pull: { holidays: holidayId } })
//     .then(() => Holiday.findByIdAndRemove(holidayId))
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });

module.exports = router;
