import React, { useState } from "react";

import classes from "./BackgroundVideo.module.css";
import Friends1 from "./Friends1.mp4";
import Friends2 from "./Friends2.mp4";
import Friends3 from "./Friends3.mp4";
import Friends4 from "./Friends4.mp4";
import Friends5 from "./Friends5.mp4";
import Friends6 from "./Friends6.mp4";

const BackgroundVideo = () => {
  const [videos, setVideos] = useState([
    Friends1,
    Friends2,
    Friends3,
    Friends4,
    Friends5,
    Friends6,
  ]);
  const [randVidIdx, setRandVidIdx] = useState(
    Math.floor(Math.random() * videos.length)
  );

  return (
    <div className={classes.Container}>
      <video autoPlay="autoplay" loop="loop" muted className={classes.Video}>
        <source src={videos[randVidIdx]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header className={classes.BackgroundVideo__header}>
        <h1>Welcome to True Friends</h1>
        <button>Are you a True Friend?</button>
      </header>
      <footer className={classes.BackgroundVideo__footer}>
        Copyright &copy; 2020 True Friends
      </footer>
      {console.log(randVidIdx)}
    </div>
  );
};

export default BackgroundVideo;
