import React from "react";
import "./Theme.css";
import { useState } from "react";
import { Color, setColor } from "../../../../Variable/Color/Color";

function Theme({ Noti = 1 , themeChange, setTheme}) {
  const [isHide, setHide] = useState(true);

  const themes = [
    { Theme: "Fire on sky", BGR: "#f0f8ff", Color: "red", ColorCode: 2 },
    { Theme: "Little Start", BGR: "#01011d", Color: "white", ColorCode: 1 },
    { Theme: "Cloudy Day", BGR: "#f0f8ff", Color: "#696cff", ColorCode: 0 },
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
        {/**/}
        {themes.map((theme, index) => (
          <div
            key={index}
            className="theme-choice"
            style={{ backgroundColor: theme.BGR, color: theme.Color }}
            onClick={() => handleThemeChoice(theme.ColorCode)} 
          >
            <ion-icon
              name="planet-outline"
              style={{ color: theme.Color }}
            ></ion-icon>
            <p> {theme.Theme}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Theme;
