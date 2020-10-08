import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.scss'
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
  return (
      <div className="header">
        <h1>
          <Link to="/">TRUE FRIENDS</Link>
        </h1>
        <ul>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          {
            currentUser ? 
            <li onClick={() => auth.signOut()}>SIGN OUT</li>
            : <li>
                <Link to="/signin">SIGN IN</Link>
              </li>
          } 
        </ul>
      </div>
  );
}

// This is the design pattern we will follow: 1. Create a mapStateToProps value and pass in the state.user.currentUser. This ".user" comes from the root reducer.
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// Connect function passes in two arguments and is a Higher Order Component. Passing first the value we created with the mapStateToProps and then the Component that will use the state.
export default connect(mapStateToProps)(Header);