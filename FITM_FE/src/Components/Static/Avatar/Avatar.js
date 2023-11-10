import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Avatar.css";

function Avatar({ scale = 1 }) {
  var height = scale * 45;
  var width = scale * 45;
  const [isHide, setHide] = useState(true);

  const handleUserClick = () => {
    if (isHide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  function deleteTokenFromLocalStorage() {
    try {
      localStorage.removeItem("token");
      // Redirect to the login page using the Navigate hook.
      window.location.href = "/";

    } catch (error) {
    }
  }

  return (
    <div className="user" onClick={handleUserClick}>
      <div
        className="avatar"
        style={{
          backgroundImage: `url('/IMG/main_avt.png')`,
          backgroundSize: '120%',
          backgroundPosition: "center center",
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></div>
      <ul className={`user-dropDown ${isHide ? "hide" : ""}`}>
        <Link to="/profile" className="link-reatjs">
          <li>View profile</li>
        </Link>
        <Link to="/changepassword" className="link-reatjs">
          <li>Change Password</li>
        </Link>
        <li onClick={deleteTokenFromLocalStorage}>
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default Avatar;
