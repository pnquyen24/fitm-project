import React from "react";
import "./Choice.css";
import { Color } from "../../../../Variable/Color/Color";

function Choice({ Title, Icon, isOpen, SendTo = "", isSelected, onClick }) {
    const choiceClassName = `choice ${isSelected ? "selected" : ""} ${isOpen ? "open" : ""}`;

  return (
    <div className={choiceClassName} onClick={onClick} style={{ color: Color.color5}}>
      <ion-icon name={Icon} style={{ color: Color.color5}} ></ion-icon>
      <span>{Title}</span>
      <style>
      {`
        .selected {
          background-color: ${Color.color4};
        }
      `}
    </style>
    </div>
  );
}

export default Choice;
