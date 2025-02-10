import React from "react";
import "../DisasterCard.css";
import { useNavigate } from "react-router-dom";

const DisasterCard = ({ image, title, redirect }) => {
  const navigate = useNavigate();
  return (
    <div className="card cursor-pointer">
      <img
        src={image}
        alt={title}
        className="card-image rounded-2xl drop-shadow-xl"
      />
      <h3 className="card-title text-xl">{title}</h3>
    </div>
  );
};

export default DisasterCard;
