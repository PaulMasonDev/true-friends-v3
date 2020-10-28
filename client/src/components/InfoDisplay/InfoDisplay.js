import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setHoliday,
  setDate,
  loadHolidays,
} from "../../redux/holidays/holidays.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import "./InfoDisplay.scss";

const InfoDisplay = ({ holidays, setHoliday, setDate, loadHolidays }) => {
  useEffect(() => {
    if (holidays.friendId) {
      loadHolidays(holidays.friendId);
    }
  }, []);
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

  const handleHolidayEdit = (e) => {
    const tempHoliday = e.currentTarget.nextElementSibling.textContent;
    const holidayId = e.currentTarget.parentNode.getAttribute("data-id");
    const holiday = prompt(`What do you want to change ${tempHoliday} to?`);

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
  // const handleDateEdit = (e) => {
  //   const tempDate = e.currentTarget.nextElementSibling.textContent;
  //   const holidayId = e.currentTarget.parentNode.getAttribute("data-id");
  //   const date = prompt(
  //     `What do you want to change the date of ${tempDate} to?`
  //   );

  //   axios
  //     .put(`/holidays/updatedate/${holidayId}/${date}`)
  //     .then((res) => {
  //       axios
  //         .get(`/holidays/pulldata/${holidays.friendId}`)
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  //   loadHolidays(holidays.friendId);
  // };
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

    if (
      window.confirm(
        `Are you sure you want to delete ${holidays.friendName}'s ${name} from your list? You will lose all data associated with this holiday.`
      )
    ) {
      axios
        .delete(`/holidays/deleteholiday/${holidays.friendId}/${holidayId}`)
        .then((res) => {
          alert(`${holidays.friendName}'s ${name.trim()} has been deleted.`);
        })
        .catch((err) => console.log(err));
    } else {
      window.alert(
        `${holidays.friendName}'s ${name} was not deleted.  You are a TRUE FRIEND indeed!`
      );
    }
    loadHolidays(holidays.friendId);
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
                <span>{holiday.name} </span>
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
      ) : (
        <h2>Friend's Holidays</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  holidays: state.holidays,
});

const mapDispatchToProps = (dispatch) => ({
  setHoliday: (holiday) => dispatch(setHoliday(holiday)),
  setDate: (date) => dispatch(setDate(date)),
  loadHolidays: (friendId) => dispatch(loadHolidays(friendId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoDisplay);
