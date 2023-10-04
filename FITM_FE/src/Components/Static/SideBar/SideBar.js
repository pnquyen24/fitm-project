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
//<ion-icon name="person-outline"></ion-icon>
  const choices = [
    { Title: 'Member Management', Icon: 'person-outline', Link: "/profile"},
    { Title: 'Change Info Requests', Icon: 'checkbox-outline', Link: "/profile" },
    { Title: 'Report Instrument', Icon: 'warning-outline', Link: "/profile" },
    { Title: 'Plan', Icon: 'calendar-outline' , Link: "/profile"},
    { Title: 'Add showw', Icon: 'add-circle-outline', Link: "/profile" },
    { Title: 'Music List', Icon: 'musical-notes-outline', Link: "/music" },

    


  ];

    return (
        <div className={`sideBar ${isOpen ? "open" : ""}`} style={{backgroundColor:Color.color2}}>
            <SubInfo></SubInfo>
            {choices.map((choice, index) => (
                <Choice
                    key={index}
                    Title={choice.Title}
                    Icon={choice.Icon}
                    isOpen={isOpen}
                    isSelected={selectedChoice === index}
                    onClick={() => handleChoiceClick(index)}
                ></Choice>
            ))}
        </div>
    );
}

export default SideBar;
