import React, { useEffect } from "react";
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

  const handleItemEdit = (e) => {
    const tempItem = e.currentTarget.nextElementSibling.textContent;
    const itemId = e.currentTarget.parentNode.getAttribute("data-id");
    const item = prompt(`What do you want to change ${tempItem} to?`);
    if (item === null) return;
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

    if (
      window.confirm(
        `Are you sure you want to delete ${items.holidayName}'s ${name} from your list? You will lose all data associated with this item.`
      )
    ) {
      axios
        .delete(`/items/deleteitem/${items.holidayId}/${itemId}`)
        .then((res) => {
          alert(`${items.holidayName}'s ${name.trim()} has been deleted.`);
        })
        .catch((err) => console.log(err));
    } else {
      window.alert(
        `${items.holidayName}'s ${name} was not deleted.  You are a TRUE FRIEND indeed!`
      );
    }
    loadItems(items.holidayId);
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
      ) : (
        <h2>Items</h2>
      )}
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
