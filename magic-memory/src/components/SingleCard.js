import React from "react";
import "./SingleCard.css";

export default function SingleCard({
  propCard,
  handleChoice,
  flipped,
  disabled,
}) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(propCard);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={propCard.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
