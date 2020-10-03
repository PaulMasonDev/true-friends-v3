import React from 'react'
import { Link } from 'react-router-dom';
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

export default Header;