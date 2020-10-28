import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loadItems, setItem } from "../../redux/items/items.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./HolidayDisplay.scss";

const HolidayDisplay = ({ items, loadItems, setItem }) => {
  useEffect(() => {
    if (items.holidayId) {
      loadItems(items.holidayId);
    }
  }, []);

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
  const handleItemDelete = (e) => {};
  const handleItemEdit = (e) => {};

  return (
    <div className="homepage__info__occasionInfo">
      {items.holidayName ? (
        <div>
          <h2>{items.holidayName}'s items</h2>
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
                <span>{item.name} </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Holiday's Items</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch) => ({
  loadItems: (holidayId) => dispatch(loadItems(holidayId)),
  setItem: (item) => dispatch(setItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HolidayDisplay);
