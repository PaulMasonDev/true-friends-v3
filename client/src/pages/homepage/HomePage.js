import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// COMPONENT IMPORTS
import AddName from "../../components/AddName/AddName";
import ListNames from "../../components/ListNames/ListNames";
import InfoDisplay from "../../components/InfoDisplay/InfoDisplay";
import OccasionDisplay from "../../components/OccasionDisplay/OccasionDisplay";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";

import { loadFriends, setFriend } from "../../redux/friends/friends.actions";

import "./Homepage.scss";

const HomePage = ({ isAuthenticated, userId, loadFriends }) => {
  //LOAD INITIAL USER DATA
  useEffect(() => {
    if (isAuthenticated) {
      loadFriends(userId);
    }
  }, []);

  return (
    <div>
      <div className="homepage">
        <div className="homepage__names">
          <AddName />
          <ListNames />
        </div>
        <div className="homepage__info">
          <InfoDisplay />
          {/* <OccasionDisplay 
            displayData={displayData}
            displayOccasion={displayOccasion}
            handleClick={handleDisplayItem}
          /> */}
        </div>
        <div className="homepage__item">
          {/* <ItemDisplay 
            displayItem={displayItem}
          /> */}
        </div>
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
