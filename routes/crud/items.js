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

// UPDATE item name route
router.put("/updateitem/:itemId/:item", (req, res) => {
  const itemId = req.params.itemId;
  const item = req.params.item;
  console.log("itemId: ", itemId, "item: ", item);
  Item.findByIdAndUpdate(itemId, { name: item })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});

// DELETE item route
router.delete("/deleteitem/:holidayId/:itemId", (req, res) => {
  const holidayId = req.params.holidayId;
  const itemId = req.params.itemId;
  console.log("holidayId: ", holidayId, "itemId: ", itemId);
  Holiday.findByIdAndUpdate(holidayId, { $pull: { items: itemId } })
    .then(() => Item.findByIdAndRemove(itemId))
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});

module.exports = router;
