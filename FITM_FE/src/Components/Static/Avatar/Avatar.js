import React from "react";
import "./Avatar.css";
import { useState } from 'react';
import { Link } from "react-router-dom";

function Avatar({ scale = 1 }) {
  var height = scale * 45;
  var width = scale * 45;
  const [isHide, setHide] = useState(true);
  const handleUserClick = () => {
    if (isHide) {
      setHide(false);
    }
    else { setHide(true); }
  }
  return (
    <div className="user" onClick={handleUserClick}>
      <div
        className="avatar"
        style={{
          backgroundImage: `url('/IMG/Avatar.png')`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></div>
      <ul className={`user-dropDown ${isHide ? "hide" : ""}`}>
        <li> Profile </li>
        <li> <Link to="/home/profile">ChangePassword</Link></li>
        <li> Log Out</li>


      </ul>
    </div>
  );
}
export default Avatar;
