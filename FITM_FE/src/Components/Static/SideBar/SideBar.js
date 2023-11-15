import React, { useEffect, useState } from "react";
import { Color } from "../../../Variable/Color/Color";
import Choice from "./Choices/Choice";
import "./SideBar.css";
import SubInfo from "./SubInfo/SubInfo";
import { jwtDecode } from "jwt-decode";

function SideBar({ isOpen, setOpen }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };
  const choices = [
    {
      
      Title: "Members",
      Icon: "person-outline",
      Link: "/member-manager/member-list",
      Role: ["Admin","HRM"],
    },
    {
      Title: "Info Requests",
      Icon: "checkbox-outline",
      Link: "/member-manager/request-edit-info-list",
      Role: ["Admin", "HRM"],
    },
    {
      Title: "Schedule",
      Icon: "calendar-outline",
      Link: "/schedule",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Performances",
      //<ion-icon name="footsteps-outline"></ion-icon>
      Icon: "footsteps-outline",
      Link: "/performance",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Practicals",
      Icon: "hand-right-outline",
      Link: "/practical",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Musics",
      Icon: "musical-notes-outline",
      Link: "/music-list",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Finances",
      Icon: "cash-outline",
      Link: "financial-manager/finance-list",
      Role: ["Admin", "HRM"],
    },
    {
      Title: "Finance Requests",
      //<ion-icon name=""></ion-icon>
      Icon: "chatbox-ellipses-outline",
      Link: "financial-manager/finance-request-list",
      Role: ["Admin", "FM"],
    },
    {
      Title: "Report Instrument",
      Icon: "warning-outline",
      Link: "/report-instrument",
      Role: ["Admin", "Member"],
    },
    {
      Title: "Instrument Reports",
      Icon: "file-tray-full-outline",
      Link: "/instrument-report-management",
      Role: ["Admin", "Member"],
    },
    {
      //<ion-icon name="triangle-outline"></ion-icon>
      Title: "Instruments",
      Icon: "triangle-outline",
      Link: "/instrument",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Support Fee",
      Icon: "cash-outline",
      Link: "/support-fee",
      Role: ["Admin", "SM"],
    },
    {
      Title: "Developers",
      Icon: "information-circle-outline",
      Link: "/about-us",
      Role: ["Admin", "Member"],
    },
  ];
  let [Role,setRole]=useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setRole(decoded.Roles);
    console.log(Role)
  }, []);

  return (
    <div
      className={`sideBar ${isOpen ? "open" : ""}`}
      style={{ backgroundColor: Color.color2 }}
    >
      <SubInfo setSelectedChoice={setSelectedChoice}></SubInfo>
      {choices
        .filter((choice) => choice.Role.some((r) => Role.includes(r)))
        .map((choice, index) => (
          <div key={index} className="sidebar-link">
            <Choice
              Title={choice.Title}
              Icon={choice.Icon}
              isOpen={isOpen}
              isSelected={selectedChoice === index}
              onClick={() => handleChoiceClick(index)}
              _Link={choice.Link}
            ></Choice>
          </div>
        ))}
    </div>
  );
}

export default SideBar;
