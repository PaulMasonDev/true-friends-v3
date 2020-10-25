import axios from "axios";
import React from "react";

import { connect } from "react-redux";
import {
  setFriend,
  createFriend,
  loadFriends,
} from "../../redux/friends/friends.actions";

import "./AddName.scss";

const AddName = ({ auth, name, setFriend, createFriend, loadFriends }) => {
  // HANDLE SEARCHING LOGIC FOR LISTING NAMES
  const handleChange = (e) => {
    setFriend(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    createFriend(auth.user.id, name);
    setFriend("");
    loadFriends(auth.user.id);
  };

  return (
    <form className="homepage__names__add__search">
      <input
        onChange={handleChange}
        type="Search"
        placeholder="Enter Name"
        value={name}
      />
      <button onClick={handleClick}>ADD NAME</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  name: state.friends.name,
});

const mapDispatchToProps = (dispatch) => ({
  setFriend: (friend) => dispatch(setFriend(friend)),
  loadFriends: (userId) => dispatch(loadFriends(userId)),
  createFriend: (userId, name) => dispatch(createFriend(userId, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddName);
