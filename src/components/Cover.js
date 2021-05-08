import React from "react";
import coverPicture from "../assets/header-image.jpg";

const Cover = (props) => {
  const title = props.data.name;
  const description = props.data.description;
  return (
    <div className="cover wrapper">
      <div className="left-cover">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className="right-cover">
        <img src={coverPicture} alt="" />
      </div>
    </div>
  );
};

export default Cover;
