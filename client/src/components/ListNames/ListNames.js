import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { loadFriends, deleteFriend } from "../../redux/friends/friends.actions";
import "./ListNames.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import ContentEditable from "react-contenteditable";

const ListNames = ({ friends, name, auth, loadFriends, deleteFriend }) => {
  const [focusedName, setFocusedName] = useState("");
  // const [checkClass, setCheckClass] = useState("check inline icon hidden");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleDelete = (e) => {
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.parentNode.getAttribute("data-name");

    deleteFriend(auth.user.id, friendId, name);
    loadFriends(auth.user.id);
  };

  const handleFocus = (e) => {
    // setCheckClass("check inline icon visible");
  };

  const handleBlur = (e) => {
    // setCheckClass("check inline icon hidden");
  };

  const handleConfirm = (e) => {
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.previousElementSibling.textContent;
    console.log("NAME", name);

    axios
      .put(`/friends/updatefriend/${friendId}/${name}`)
      .then((res) => {
        axios
          .get(`/friends/pulldata/${auth.user.id}`)
          .then(() => loadFriends(auth.user.id))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
              <ContentEditable
                className="inline"
                html={friend.name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled="true"
              />
              <FontAwesomeIcon
                className="check inline icon green"
                icon={faCheck}
                onClick={handleConfirm}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.friends.name,
  friends: state.friends.friends,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  loadFriends: (userId) => dispatch(loadFriends(userId)),
  deleteFriend: (userId, friendId, name) =>
    dispatch(deleteFriend(userId, friendId, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListNames);
