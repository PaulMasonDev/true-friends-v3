import React, { useEffect } from "react";
import { connect } from "react-redux";

// COMPONENT IMPORTS
import AddName from "../../components/AddName/AddName";
import ListNames from "../../components/ListNames/ListNames";
import InfoDisplay from "../../components/InfoDisplay/InfoDisplay";
import OccasionDisplay from "../../components/OccasionDisplay/OccasionDisplay";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";

import { loadFriends, setFriend } from "../../redux/friends/friends.actions";

import "./Homepage.scss";

const HomePage = ({ auth, loadFriends }) => {
  //LOAD INITIAL USER DATA
  useEffect(() => {
    if (auth.isAuthenticated) {
      loadFriends(auth.user.id);
    }
  }, []);

  // // HANDLE SEARCHING LOGIC FOR LISTING NAMES
  // const handleName = (val) => {
  //   setFriend(val);
  //   // setUserData(TESTDATA.userData)//Not needed. Used to prevent warning
  // }

  // // Functions to handle finding
  // const findFriend = (name) => {
  //   return userData.friends.find(friend => friend.name === name);
  // }

  // const findOccasion = (name, occasion) => {
  //   const foundFriend = userData.friends.find(friend => friend.name === name);
  //   return foundFriend.occasions.find(testOccasion => testOccasion.occasion === occasion);
  // }

  // // HANDLE LOGIC FOR DISPLAYING NAME DETAILS WHEN CLICKING ON SPECIFIC NAME
  // const handleNameClick = (name) => {
  //   const setupDisplayData = findFriend(name);
  //   setDisplayData(setupDisplayData);
  // }

  // // HANDLE LOGIC FOR DISPLAYING OCCASION DETAIL WHEN CLICKING ON SPECIFIC OCCASION
  // const handleOccasionClick = (name, occasion) => {
  //   // THEN GO THROUGH THE OCCASIONS OF THE FRIEND TO FIND A MATCH
  //   const foundOccasion = findOccasion(name, occasion);
  //   setDisplayOccasion(foundOccasion);
  // }

  // // HANDLE LOGIC FOR CLICKING ON AN ITEM
  // const handleDisplayItem = (name, occasion, item) => {
  //   // FIRST FIND THE NAME YOU WANT.
  //   const foundFriend = findFriend(name);
  //   // THEN GO THROUGH THE OCCASIONS OF THE FRIEND TO FIND A MATCH
  //   const foundOccasion = foundFriend.occasions.find(testOccasion => testOccasion.occasion === occasion.occasion);
  //   // THEN GO THROUGH THE ITEMS OF THE FRIEND TO FIND A MATCH
  //   const foundItem = foundOccasion.items.find(testItem => testItem === item);
  //   setDisplayItem(foundItem);
  // }

  return (
    <div>
      <div className="homepage">
        <div className="homepage__names">
          <AddName />
          <ListNames />
        </div>
        <div className="homepage__info">
          {/* <InfoDisplay 
            displayData={displayData}
            handleClick={handleOccasionClick}  
          /> */}
          {/* <OccasionDisplay 
            displayData={displayData}
            displayOccasion={displayOccasion}
            handleClick={handleDisplayItem}
          /> */}
          {/* <ItemDisplay 
            displayItem={displayItem}
          /> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDipatchToProps = (dispatch) => ({
  setFriend: (friend) => dispatch(setFriend(friend)),
  loadFriends: (userId) => dispatch(loadFriends(userId)),
});

export default connect(mapStateToProps, mapDipatchToProps)(HomePage);
