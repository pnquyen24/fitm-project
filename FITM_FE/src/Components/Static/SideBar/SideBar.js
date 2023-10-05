import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Color } from '../../../Variable/Color/Color';
import Choice from './Choices/Choice';
import './SideBar.css';
import SubInfo from './SubInfo/SubInfo';

function SideBar({isOpen, setOpen}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  
  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };
  const choices = [
    { Title: 'Member Management', Icon: 'person-outline', Link: "member-manager/member-list"},
    { Title: 'Change Info Requests', Icon: 'checkbox-outline', Link: "member-manager/request-edit-info-list" },
    { Title: 'Report Instrument', Icon: 'warning-outline', Link: "/home/profile" },
    { Title: 'Plan', Icon: 'calendar-outline' , Link: "/home/profile"},
    { Title: 'Add show', Icon: 'add-circle-outline', Link: "/home/profile" },
    { Title: 'Music List', Icon: 'musical-notes-outline', Link: "/home/music list" },
    ]; 
  useEffect(() => {
  },[Color])

  return (
    <div className={`sideBar ${isOpen ? "open" : ""}`}  style={{backgroundColor: Color.color2}}>
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