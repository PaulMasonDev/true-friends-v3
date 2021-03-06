import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { connect } from "react-redux";
import { loadItems, setItem, setItemId } from "../../redux/items/items.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./HolidayDisplay.scss";

const HolidayDisplay = ({ items, loadItems, setItem, holidays, setItemId }) => {
  useEffect(() => {
    if (items.holidayId) {
      loadItems(items.holidayId);
    }
  }, []);
  const handleItemClick = (e) => {
    const itemId = e.currentTarget.parentNode.getAttribute("data-id");
    const itemName = e.currentTarget.parentNode.getAttribute("data-name");
    setItemId(itemId, itemName);
    // loadItems(itemId);
  };
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const createItem = (e) => {
    axios
      .post(`/items/createitem/${items.holidayId}/${items.itemName}`)
      .then((res) => {
        loadItems(items.holidayId);
      })
      .catch((err) => console.log(err));
  };

  const handleItemEdit = async (e) => {
    const tempItem = e.currentTarget.nextElementSibling.textContent.trim();
    const itemId = e.currentTarget.parentNode.getAttribute("data-id");
    const { value: item } = await Swal.fire({
      title: `What do you want to change the item, "${tempItem}" to?`,
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You didn't type anything.";
        }
      },
    });
    if (item) {
      Swal.fire(`Item changed to ${item}`, "", "success");
    }
    if (item === undefined) return;
    axios
      .put(`/items/updateitem/${itemId}/${item}`)
      .then((res) => {
        axios
          .get(`/items/pulldata/${items.holidayId}`)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    loadItems(items.holidayId);
  };

  const handleItemDelete = (e) => {
    const itemId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.parentNode.getAttribute("data-name");
    console.log(
      "itemId: ",
      itemId,
      "name: ",
      name,
      "holidayId: ",
      items.holidayId
    );

    Swal.fire({
      title: `Are you sure you want to delete ${items.holidayName}'s ${name} from your list? You will lose all data associated with this item.`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/items/deleteitem/${items.holidayId}/${itemId}`)
          .then((res) => {})
          .catch((err) => console.log(err));
        Swal.fire(
          "Deleted!",
          `${items.holidayName}'s ${name.trim()} has been deleted.`,
          "success"
        );
        loadItems(items.holidayId);
      } else {
        Swal.fire(
          "Phew!",
          `${items.holidayName}'s ${name} was not deleted.  You are a TRUE FRIEND indeed!`,
          "info"
        );
      }
    });
  };

  return (
    <div className="homepage__info__occasionInfo">
      {items.holidayName ? (
        <div>
          <h2>
            {holidays.friendName}'s {items.holidayName} Items
          </h2>
          <input
            type="text"
            placeholder="Enter a new item"
            onChange={handleItemChange}
          />
          <button onClick={createItem}>Add Item</button>
          <ul>
            {items.items.map((item) => (
              <li key={item._id} data-id={item._id} data-name={item.name}>
                <FontAwesomeIcon
                  className="inline icon"
                  icon={faTrashAlt}
                  onClick={handleItemDelete}
                />
                <FontAwesomeIcon
                  className="inline icon blue"
                  icon={faPencilAlt}
                  onClick={handleItemEdit}
                />
                <span onClick={handleItemClick}>{item.name} </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  holidays: state.holidays,
});

const mapDispatchToProps = (dispatch) => ({
  loadItems: (holidayId) => dispatch(loadItems(holidayId)),
  setItem: (item) => dispatch(setItem(item)),
  setItemId: (itemId, itemName) => dispatch(setItemId(itemId, itemName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HolidayDisplay);
