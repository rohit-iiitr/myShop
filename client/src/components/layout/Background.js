import React from "react";
import "../../styles/Background.css"; // styling below

const Background = () => {
  return (
    <video autoPlay muted loop id="bg-video">
      <source src="/Images/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Background;
