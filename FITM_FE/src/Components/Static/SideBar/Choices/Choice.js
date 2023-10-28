import React from "react";
import { Link } from "react-router-dom";
import { Color } from "../../../../Variable/Color/Color";
import "./Choice.css";

function Choice({
    Title,
    Icon,
    isOpen,
    _Link,
    SendTo = "",
    isSelected,
    onClick,
}) {
    const choiceClassName = `choice ${isSelected ? "selected" : ""} ${
        isOpen ? "open" : ""
    }`;

    return (
        <Link to={_Link} style={{ textDecoration: "none" }}>
            <div
                className={choiceClassName}
                onClick={onClick}
                style={{ color: Color.color5 }}
            >
                <ion-icon
                    name={Icon}
                    style={{ color: Color.color5 }}
                ></ion-icon>
                <span>{Title}</span>
                <style>
                    {`
                        .selected {
                            background-color: ${Color.color4};
                        }
                    `}
                </style>
            </div>
        </Link>
    );
}

export default Choice;
