import React from "react";
import "./Notification.css";
import { useState } from "react";
import { Color } from "../../../../Variable/Color/Color";

function Notification({ Noti = 1 }) {
    const [isHide, setHide] = useState(true);

    const handleNotiClick = () => {
        if (isHide) {
            setHide(false);
        }
        else { setHide(true); }
    }

  return (
    <div className="notification-cover" onClick={handleNotiClick}>
      <div className="notification">
        <ion-icon name="notifications-circle-outline" style={{ color: Color.color5}}></ion-icon>
        {Noti != 0 ? <p className="numNotification">{Noti}</p> : ""}
      </div>
      <ul className={`noti-dropDown ${isHide ? "hide" : ""}` } style={{ backgroundColor: Color.color5}}>
        <li>Tạm thời chưa có gì</li>
      </ul>
    </div>
  );
}
export default Notification;
