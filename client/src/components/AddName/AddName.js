import axios from "axios";
import React from "react";

import { connect } from "react-redux";
import { setFriend, loadFriends } from "../../redux/friends/friends.actions";

import "./AddName.scss";

const AddName = ({ auth, name, setFriend, loadFriends }) => {
  // HANDLE SEARCHING LOGIC FOR LISTING NAMES
  const handleChange = (e) => {
    setFriend(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/friends/addfriend/${auth.user.id}/${name.trim()}`)
      .then((res) => {
        alert(`${name.trim()}${res.data}`);
        setFriend("");
        loadFriends(auth.user.id);
      })
      .catch((err) => console.log(err));
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddName);
