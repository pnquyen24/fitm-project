import React from "react";
import "./Notification.css";
import { useState } from "react";

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
                <ion-icon name="notifications-circle-outline"></ion-icon>
                {Noti != 0 ? <p className="numNotification">{Noti}</p> : ""}
            </div>
            <ul className={`noti-dropDown ${isHide ? "hide" : ""}`}>
                <li>Tạm thời chưa có gì</li>
            </ul>
        </div>
    );
}
export default Notification;
