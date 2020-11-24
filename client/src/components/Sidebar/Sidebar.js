import React from "react";

import "./Sidebar.scss";
import thanksgiving from "./thanksgiving.jpg";
import christmas from "./christmas.jpg";
import placeholder from "./placeholder.jpg";

const Sidebar = () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  // TESTING
  // month = 12;
  // day = 26;
  return (
    <div className="Sidebar">
      <img
        src={
          month === 1 && day === 1
            ? placeholder //New Years 1/1
            : month === 1 && day > 1
            ? placeholder // Martin Luther Jan 20
            : (month === 1 && day > 20) || (month === 2 && day < 15)
            ? placeholder //Valentines Dat 2/14
            : month === 2 && day < 18
            ? placeholder // Presidents day monday February 17
            : (month === 2 && day > 17) || (month === 3 && day < 18)
            ? placeholder //St patricks 3/17
            : (month === 3 && day > 17) || (month === 4 && day < 13)
            ? placeholder //Easter April 12
            : //Mother's Day 5/10
            //Memorial Day May 25
            //Father's June 21
            //Independence 7/4
            //Labor sept 7
            //Halloween 10/31
            //veterans 11/11
            month === 11 && day < 27 //Thanksgiving 11/26
            ? thanksgiving
            : (month === 11 && day > 26) || (month === 12 && day < 26) //Christmas 12/25
            ? christmas
            : placeholder
        }

        //New Years 12/31
      />
      {console.log("MONTH: ", month)}
      {console.log("DAY: ", day)}
    </div>
  );
};

export default Sidebar;
