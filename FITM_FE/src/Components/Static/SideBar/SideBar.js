import React, { useState } from 'react';
import './SideBar.css';
import SubInfo from './SubInfo/SubInfo';
import Choice from './Choices/Choice';

function SideBar({isOpen, setOpen}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  

 

  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };
//<ion-icon name="calendar-outline"></ion-icon> <ion-icon name="add-circle-outline"></ion-icon>
  const choices = [
    { Title: 'Add Member', Icon: 'person-add-outline' },
    { Title: 'Change Info Requests', Icon: 'checkbox-outline' },
    { Title: 'Report Instrument', Icon: 'warning-outline' },
    { Title: 'Plan', Icon: 'calendar-outline' },
    { Title: 'Add showw', Icon: 'add-circle-outline' },


  ];

  return (
    <div className= {`sideBar ${isOpen ? "open" : ""}`}>
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
