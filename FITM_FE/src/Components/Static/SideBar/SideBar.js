import React, { useState, useEffect } from 'react';
import './SideBar.css';
import SubInfo from './SubInfo/SubInfo';
import Choice from './Choices/Choice';
import {Color} from '../../../Variable/Color/Color';
function SideBar({isOpen, setOpen}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  

 

  useEffect(() => {
  },[Color])

  
  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };
//<ion-icon name="musical-notes-outline"></ion-icon>
  const choices = [
    { Title: 'Add Member', Icon: 'person-add-outline', Link: "/home/profile"},
    { Title: 'Change Info Requests', Icon: 'checkbox-outline', Link: "/home/profile" },
    { Title: 'Report Instrument', Icon: 'warning-outline', Link: "/home/profile" },
    { Title: 'Plan', Icon: 'calendar-outline' , Link: "/home/profile"},
    { Title: 'Add showw', Icon: 'add-circle-outline', Link: "/home/profile" },
    { Title: 'Music List', Icon: 'musical-notes-outline', Link: "/home/music list" },

    


  ];

  return (
    <div className= {`sideBar ${isOpen ? "open" : ""}`} style={{backgroundColor: Color.color2}}>
      <SubInfo></SubInfo>
      {choices.map((choice, index) => (
        <Choice
          key={index}
          Title={choice.Title}
          Icon={choice.Icon}
          isOpen = {isOpen}
          isSelected={selectedChoice === index}
          onClick={() => handleChoiceClick(index)}
        ></Choice>
      ))}
    </div>
  );
}

export default SideBar;
