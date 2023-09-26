import React, { useState } from "react";
import "./Avatar.css";
import { Link, useNavigate } from "react-router-dom";

function Avatar({ scale = 1 }) {
  var height = scale * 45;
  var width = scale * 45;
  const [isHide, setHide] = useState(true);
  const navigate = useNavigate();

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
      navigate("/login");
    } catch (error) {
      console.log("loi");
      console.log(error);
    }
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

        <li> <Link to="/home/profile" className="link-reatjs" >Profile</Link> </li>
        <li> <Link to="/home/changepassword"  className="link-reatjs">Change Password</Link></li>
        <li>
          <button onClick={deleteTokenFromLocalStorage}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default Avatar;
