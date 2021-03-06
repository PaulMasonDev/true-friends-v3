import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadFriends } from "../../redux/friends/friends.actions";
import "./ListNames.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {
  loadHolidays,
  setFriendId,
} from "../../redux/holidays/holidays.actions";
import { text } from "@fortawesome/fontawesome-svg-core";

const ListNames = ({
  friends,
  name,
  auth,
  loadFriends,
  setFriendId,
  loadHolidays,
}) => {
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleDelete = (e) => {
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.parentNode.getAttribute("data-name");

    Swal.fire({
      title: `Are you sure you want to delete ${name} from your list? You will lose all data associated with this person.`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/friends/deletefriend/${auth.user.id}/${friendId}`)
          .then((res) => {})
          .catch((err) => console.log(err));
        Swal.fire(
          "Deleted!",
          `${name.trim()} has been deleted. Be sure to refresh the list.`,
          "success"
        );
        loadFriends(auth.user.id);
      } else {
        Swal.fire(
          "Phew!",
          `${name} was not deleted.  You are a TRUE FRIEND indeed!`,
          "info"
        );
      }
    });
    loadFriends(auth.user.id);
  };

  const handleEdit = async (e) => {
    const tempName = e.currentTarget.nextElementSibling.textContent.trim();
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const { value: name } = await Swal.fire({
      title: `What do you want to change the name, "${tempName}" to?`,
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You didn't return anything.";
        }
      },
    });
    if (name) {
      Swal.fire(`Name changed to ${name}`, "", "success");
    }
    if (name === undefined) return;
    console.log(name);
    axios
      .put(`/friends/updatefriend/${friendId}/${name}`)
      .then((res) => {
        axios
          .get(`/friends/pulldata/${auth.user.id}`)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    loadFriends(auth.user.id);
  };

  const handleNameClick = (e) => {
    console.log(
      "friendName",
      e.currentTarget.parentNode.getAttribute("data-name")
    );
    console.log("friendId", e.currentTarget.parentNode.getAttribute("data-id"));
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const friendName = e.currentTarget.parentNode.getAttribute("data-name");
    setFriendId(friendId, friendName);
    loadHolidays(friendId);
  };

  return (
    <div className="homepage__names__list">
      <ul>
        {filteredFriends.map((friend) => {
          return (
            <li key={friend._id} data-id={friend._id} data-name={friend.name}>
              <FontAwesomeIcon
                className="inline icon"
                icon={faTrashAlt}
                onClick={handleDelete}
              />
              <FontAwesomeIcon
                className="inline icon blue"
                icon={faPencilAlt}
                onClick={handleEdit}
              />
              <span className="inline" onClick={handleNameClick}>
                {friend.name}
              </span>
            </li>
          );
        })}
      </ul>

      {/* <div>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.friends.name,
  friends: state.friends.friends,
  auth: state.auth,
  holidays: state.holidays,
});

const mapDispatchToProps = (dispatch) => ({
  loadFriends: (userId) => dispatch(loadFriends(userId)),
  setFriendId: (friendId, friendName) =>
    dispatch(setFriendId(friendId, friendName)),
  loadHolidays: (friendId) => dispatch(loadHolidays(friendId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListNames);
