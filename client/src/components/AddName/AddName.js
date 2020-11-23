import axios from "axios";
import React, { useState } from "react";
import Swol from "sweetalert2";

import { connect } from "react-redux";
import { setFriend, loadFriends } from "../../redux/friends/friends.actions";

import "./AddName.scss";

const AddName = ({ auth, name, setFriend, loadFriends }) => {
  const [toggle, setToggle] = useState(false);
  // HANDLE SEARCHING LOGIC FOR LISTING NAMES
  const handleChange = (e) => {
    setFriend(e.target.value);
    console.log(name.toLowerCase());
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/friends/createfriend/${auth.user.id}/${name.trim()}`)
      .then((res) => {
        Swol.fire(`${name.trim()}${res.data}`, "", "success");
      })
      .then((res) => {
        axios
          .get(`/friends/pulldata/${auth.user.id}`)
          .then(() => loadFriends(auth.user.id))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setFriend("");
  };

  return (
    <form className="homepage__names__add__search">
      <h2>{auth.user.name}'s Friends</h2>
      <input
        onChange={handleChange}
        type="Search"
        placeholder="Search/Add Name"
        value={name}
      />
      <button onClick={handleClick}>Add Name</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddName);
