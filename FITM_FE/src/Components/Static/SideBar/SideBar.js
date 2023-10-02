import React, { useState } from 'react';
import './SideBar.css';
import SubInfo from './SubInfo/SubInfo';
import Choice from './Choices/Choice';
import { Link } from 'react-router-dom'; 

function SideBar({isOpen, setOpen}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  
  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };
//<ion-icon name="calendar-outline"></ion-icon> <ion-icon name="add-circle-outline"></ion-icon>
  const choices = [
    { Title: 'Add Member', Icon: 'person-add-outline', Link: "/home/profile"},
    { Title: 'Member list', Icon: 'people-outline', Link: "/home/member-manager/memberList"},
    { Title: 'Change Info Requests', Icon: 'checkbox-outline', Link: "/home/profile" },
    { Title: 'Report Instrument', Icon: 'warning-outline', Link: "/home/profile" },
    { Title: 'Plan', Icon: 'calendar-outline' , Link: "/home/profile"},
    { Title: 'Add show', Icon: 'add-circle-outline', Link: "/home/profile" },


    ];

  return (
    <div className= {`sideBar ${isOpen ? "open" : ""}`}>
      <SubInfo></SubInfo>
      {choices.map((choice, index) => (
        <Link key={index} to={choice.Link} className="sidebar-link"> 
          <Choice
            Title={choice.Title}
            Icon={choice.Icon}
            isOpen={isOpen}
            isSelected={selectedChoice === index}
            onClick={() => handleChoiceClick(index)}
          ></Choice>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;