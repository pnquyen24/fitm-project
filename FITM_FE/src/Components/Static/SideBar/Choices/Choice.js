import React from "react";
import "./Choice.css";

function Choice({ Title, Icon, isOpen, SendTo = "", isSelected, onClick }) {
    const choiceClassName = `choice ${isSelected ? "selected" : ""} ${isOpen ? "open" : ""}`;

    return (
        <div className={choiceClassName} onClick={onClick}>
            <ion-icon name={Icon}></ion-icon>
            <span>{Title}</span>
        </div>
    );
}

export default Choice;
