import React from "react";
import { connect } from "react-redux";
import "./Splash.scss";

import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
const Splash = () => {
  return (
    <div className="Splash">
      <BackgroundVideo />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(Splash);
