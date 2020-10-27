import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./InfoDisplay.scss";

const InfoDisplay = () => {
  useEffect(() => {}, []);

  return (
    <div className="homepage__info__display">
      {/* <h2>{name}</h2>
      <ul>
        {occasions
          ? occasions.map((occasion) => {
              return (
                <li
                  key={occasion.id}
                  onClick={handleOccasionClick}
                  data-occasion={occasion.occasion}
                >
                  {occasion.occasion}
                </li>
              );
            })
          : ""}
      </ul> */}

      <div className="homepage__info__addOccasion"></div>
      <div className="homepage__info__addDate"></div>
      <div className="homepage__info__addButton"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  holidays: state.holidays,
});
export default connect(mapStateToProps)(InfoDisplay);
