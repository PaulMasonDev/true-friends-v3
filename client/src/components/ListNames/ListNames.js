import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { loadFriends } from "../../redux/friends/friends.actions";
import "./ListNames.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ContentEditable from "react-contenteditable";

const ListNames = ({ friends, name, auth, loadFriends }) => {
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleDelete = (e) => {
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = e.currentTarget.parentNode.getAttribute("data-name");

    if (
      window.confirm(
        `Are you sure you want to delete ${name} from your list? You will lose all data associated with this person.`
      )
    ) {
      axios
        .delete(`/friends/deletefriend/${auth.user.id}/${friendId}`)
        .then((res) => {
          alert(`${name.trim()} has been deleted.`);
        })
        .catch((err) => console.log(err));
    } else {
      window.alert(`${name} was not deleted.  You are a TRUE FRIEND indeed!`);
    }
    loadFriends(auth.user.id);
  };

  const handleEdit = (e) => {
    const tempName = e.currentTarget.nextElementSibling.textContent;
    const friendId = e.currentTarget.parentNode.getAttribute("data-id");
    const name = prompt(`What do you want to change ${tempName} to?`);
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
              <ContentEditable
                className="inline"
                html={friend.name}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                disabled="true"
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ListNames);
