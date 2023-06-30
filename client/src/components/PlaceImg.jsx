import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <div className={className}>
      <img src={place} alt="" />
    </div>
  );
};

export default PlaceImg;
