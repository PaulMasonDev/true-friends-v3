import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setHoliday,
  setDate,
  loadHolidays,
} from "../../redux/holidays/holidays.actions";
import { loadItems, setHolidayId } from "../../redux/items/items.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import "./InfoDisplay.scss";
import { loadFriends } from "../../redux/friends/friends.actions";

const InfoDisplay = ({
  auth,
  holidays,
  setHoliday,
  setDate,
  loadHolidays,
  loadItems,
  setHolidayId,
}) => {
  useEffect(() => {
    if (holidays.friendId) {
      loadHolidays(holidays.friendId);
    }
  }, []);
  const handleHolidayClick = (e) => {
    console.log(
      "holidayName",
      e.currentTarget.parentNode.getAttribute("data-name")
    );
    console.log(
      "holidayId",
      e.currentTarget.parentNode.getAttribute("data-id")
    );
    const holidayId = e.currentTarget.parentNode.getAttribute("data-id");
    const holidayName = e.currentTarget.parentNode.getAttribute("data-name");
    setHolidayId(holidayId, holidayName);
    loadItems(holidayId);
  };
  const handleHolidayChange = (e) => {
    setHoliday(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const createHoliday = () => {
    const date = new Date(holidays.holidayDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + (date.getDate() + 1)).slice(-2);
    const completedDate = [month, day, date.getFullYear()].join("-");
    axios
      .post(
        `/holidays/createholiday/${holidays.friendId}/${holidays.holidayName}/${completedDate}`
      )
      .then((res) => {
        loadHolidays(holidays.friendId);
      })
      .catch((err) => console.log(err));
  };

  const handleHolidayEdit = async (e) => {
    const tempHoliday = e.currentTarget.nextElementSibling.textContent.trim();
    const holidayId = e.currentTarget.parentNode.getAttribute("data-id");
    const { value: holiday } = await Swal.fire({
      title: `What do you want to change the holiday, "${tempHoliday}" to?`,
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You didn't type anything.";
        }
      },
    });
    if (holiday) {
      Swal.fire(`Holiday changed to ${holiday}`, "", "success");
    }
    if (holiday === undefined) return;
    axios
      .put(`/holidays/updateholiday/${holidayId}/${holiday}`)
      .then((res) => {
        axios
          .get(`/holidays/pulldata/${holidays.friendId}`)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    loadHolidays(holidays.friendId);
  };

  const handleDelete = (e) => {
    const holidayId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.parentNode.getAttribute("data-name");
    console.log(
      "holidayId: ",
      holidayId,
      "name: ",
      name,
      "friendId: ",
      holidays.friendId
    );
    Swal.fire({
      title: `Are you sure you want to delete ${holidays.friendName}'s ${name} from your list? You will lose all data associated with this holiday.`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/holidays/deleteholiday/${holidays.friendId}/${holidayId}`)
          .then((res) => {})
          .catch((err) => console.log(err));
        Swal.fire(
          "Deleted!",
          `${holidays.friendName}'s ${name.trim()} has been deleted.`,
          "success"
        );
        loadHolidays(holidays.friendId);
      } else {
        Swal.fire(
          "Phew!",
          `${holidays.friendName}'s ${name} was not deleted.  You are a TRUE FRIEND indeed!`,
          "info"
        );
      }
    });
  };
  return (
    <div className="homepage__info__display">
      {holidays.friendName ? (
        <div>
          <h2>{holidays.friendName}'s Holidays</h2>
          <input
            type="text"
            placeholder="Enter a new holiday"
            onChange={handleHolidayChange}
          />
          <input type="date" onChange={handleDateChange} />
          <button onClick={createHoliday}>Add Holiday</button>
          <ul>
            {holidays.holidays.map((holiday) => (
              <li
                key={holiday._id}
                data-id={holiday._id}
                data-name={holiday.name}
              >
                <FontAwesomeIcon
                  className="inline icon"
                  icon={faTrashAlt}
                  onClick={handleDelete}
                />
                <FontAwesomeIcon
                  className="inline icon blue"
                  icon={faPencilAlt}
                  onClick={handleHolidayEdit}
                />
                <span onClick={handleHolidayClick}>{holiday.name} </span>
                {/* <FontAwesomeIcon
                  className="inline icon blue"
                  icon={faPencilAlt}
                  onClick={handleDateEdit}
                /> */}
                <span>{holiday.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  holidays: state.holidays,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setHoliday: (holiday) => dispatch(setHoliday(holiday)),
  setDate: (date) => dispatch(setDate(date)),
  loadHolidays: (friendId) => dispatch(loadHolidays(friendId)),
  loadItems: (holidayId) => dispatch(loadItems(holidayId)),
  setHolidayId: (holidayId, holidayName) =>
    dispatch(setHolidayId(holidayId, holidayName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoDisplay);
