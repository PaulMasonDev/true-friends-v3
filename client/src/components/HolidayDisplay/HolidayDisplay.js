import React from "react";
import { connect } from "react-redux";

import "./HolidayDisplay.scss";
const HolidayDisplay = ({ items }) => {
  return <div className="homepage__info__occasionInfo"></div>;
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps)(HolidayDisplay);
