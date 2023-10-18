import React from "react";
import "./Theme.css";
import { useState } from "react";
import { Color, setColor } from "../../../../Variable/Color/Color";

function Theme({ Noti = 1 , themeChange, setTheme}) {
  const [isHide, setHide] = useState(true);

  const themes = [
    { Theme: "Fire on sky", BGR: "#f0f8ff", Color: "red", ColorCode: 2, expandColor: "#ed0b382d"},
    { Theme: "Little Start", BGR: "#01011d", Color: "white", ColorCode: 1 , expandColor: "#689775"},
    { Theme: "Cloudy Day", BGR: "#f0f8ff", Color: "#696cff", ColorCode: 0 , expandColor: "#0bb8ed1c"},
  ];

  const handleThemeClick = () => {
    if (isHide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  const handleThemeChoice = (color) => {
    setColor(color);
    if(!themeChange) setTheme(true)
    else setTheme(false)

  };

  return (
    <div className="theme-cover" onClick={handleThemeClick}>
      <div className="theme">
        <ion-icon
          name="color-filter-outline"
          style={{ color: Color.color5 }}
        ></ion-icon>
      </div>
      <div
        className={`theme-dropDown ${isHide ? "hide" : ""}`}
        style={{ backgroundColor: Color.color5 }}
      >
        {themes.map((theme, index) => {
          return (
          <div
            key={index}
            className="theme-choice"
            style={{ backgroundColor: theme.BGR, color: theme.Color }}
            onClick={(e) => {
              e.stopPropagation();
              handleThemeChoice(theme.ColorCode)
            }} 
          >
            <div className="expand-domain" style={{ backgroundColor: theme.expandColor }}></div>
            <ion-icon
              name="planet-outline"
              style={{ color: theme.Color}}
            ></ion-icon>
            <p> {theme.Theme}</p>
          </div>
        )
        })}
      </div>
    </div>
  );
}
export default Theme;
