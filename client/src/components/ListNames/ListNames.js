import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { loadFriends, deleteFriend } from "../../redux/friends/friends.actions";
import "./ListNames.scss";

const ListNames = ({ friends, name, auth, loadFriends, deleteFriend }) => {
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleClick = (e) => {
    // Logic for openning up occasions
  };

  const handleDelete = (e) => {
    const friendId = e.target.parentNode.getAttribute("data-id");
    const name = e.target.parentNode.getAttribute("data-name");

    // axios
    //   .delete(`/friends/deletefriend/${auth.user.id}/${friendId}`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    deleteFriend(auth.user.id, friendId, name);
    loadFriends(auth.user.id);
  };

  return (
    <div className="homepage__names__list">
      <ul>
        {filteredFriends.map((friend) => {
          return (
            <li key={friend._id} data-id={friend._id} data-name={friend.name}>
              <span>Edit</span>
              <span onClick={handleDelete}>Delete</span>
              <span onClick={handleClick}>{friend.name}</span>
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
