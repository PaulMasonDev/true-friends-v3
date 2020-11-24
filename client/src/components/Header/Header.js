import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth/auth.actions";

import "./Header.scss";

const Header = ({ auth, logoutUser }) => {
  return (
    <div className="header">
      {auth.isAuthenticated ? (
        <h3>
          <Link to="/home">
            You are a true friend,{" "}
            <span style={{ color: "lightblue" }}>{auth.user.name}</span>
          </Link>
        </h3>
      ) : (
        <h1>
          <Link to="/home">TRUE FRIENDS</Link>
        </h1>
      )}

      <ul>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
        {!auth.isAuthenticated ? (
          <div>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/register">REGISTER</Link>
            </li>
          </div>
        ) : (
          <li>
            <p onClick={logoutUser}>LOGOUT</p>
          </li>
        )}
      </ul>
    </div>
  );
};

// Connect function passes in two arguments and is a Higher Order Component. Passing first the value we created with the mapStateToProps and then the Component that will use the state.

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
