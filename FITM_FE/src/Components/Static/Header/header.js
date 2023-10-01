import React from "react";
import "./header.css";
import Notification from "./Notification/Notification";
import Avatar from "../Avatar/Avatar";
import {Color} from "../../../Variable/Color/Color";

function Header({isOpen, setOpen}) {
  var noti = 10;
  const avatarStyle = {
    backgroundImage: `url('/IMG/Capthanhdat_old_cyber_king_with_body_and_head_626afbe6-9b92-4ad7-bfcf-4c8af2629a9c.png')`,
  };

  const handleMenuButton = () => {
      if (isOpen) {setOpen(false);}
      else {setOpen(true);}
  }

  return (
    <div className="header" style={{backgroundColor: Color.color2}}>
      <div className="header-left">
        <button className="menu" onClick={handleMenuButton}>
          <ion-icon name="menu-outline" style={{ color: Color.color5}}></ion-icon>
        </button>
      </div>

      <div className="header-right">
        <Notification Noti={noti}></Notification>
        <Avatar scale = {1} ></Avatar>
        {/* <button className="logout">
          Log Out <ion-icon name="log-out-outline"></ion-icon>
        </button> */}
      </div>
    </div>
  );
}

export default Header;
