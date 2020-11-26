import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// COMPONENT IMPORTS
import AddName from "../../components/AddName/AddName";
import ListNames from "../../components/ListNames/ListNames";
import InfoDisplay from "../../components/InfoDisplay/InfoDisplay";
import HolidayDisplay from "../../components/HolidayDisplay/HolidayDisplay";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";

import { loadFriends, setFriend } from "../../redux/friends/friends.actions";

import "./Homepage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = ({ isAuthenticated, userId, loadFriends }) => {
  //LOAD INITIAL USER DATA
  useEffect(() => {
    if (isAuthenticated) {
      loadFriends(userId);
    }
  }, []);

  return (
    <div>
      <div className="Home">
        <Sidebar />
        {isAuthenticated ? (
          <div className="homepage">
            <div className="homepage__names">
              <AddName />
              <ListNames />
            </div>
            <div className="homepage__info">
              <InfoDisplay />
            </div>
            <div className="homepage__holiday">
              <HolidayDisplay />
            </div>
            <div className="homepage__item">
              <ItemDisplay />
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ color: "#000" }}>
              Please &nbsp;
              <Link to="/login" style={{ color: "#000" }}>
                login
              </Link>
              &nbsp; or &nbsp;
              <Link to="/register" style={{ color: "#000" }}>
                register
              </Link>
            </h2>
          </div>
        )}
        <Sidebar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.user.id,
});

const mapDipatchToProps = (dispatch) => ({
  setFriend: (friend) => dispatch(setFriend(friend)),
  loadFriends: (userId) => dispatch(loadFriends(userId)),
});

export default connect(mapStateToProps, mapDipatchToProps)(HomePage);
