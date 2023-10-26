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
    { Title: 'Member Management', Icon: 'person-outline', Link: "/member-manager/member-list"},
    { Title: 'Change Info Requests', Icon: 'checkbox-outline', Link: "/member-manager/request-edit-info-list" },
    { Title: 'Report Instrument', Icon: 'warning-outline', Link: "/profile" },
    { Title: 'Plan', Icon: 'list-circle-outline' , Link: "/profile"},
    { Title: 'Add show', Icon: 'add-circle-outline', Link: "/profile" },
    { Title: 'Practical Schedule', Icon: 'calendar-outline', Link: "/practicalSchedule" },
    { Title: 'Music List', Icon: 'musical-notes-outline', Link: "/music-list" },
    { Title: 'Instrument Report', Icon: 'warning-outline', Link: "/report-instrument" },
    { Title: 'Instrument Report Management', Icon: 'file-tray-full-outline', Link: "/instrument-report-management" },
    { Title: 'Instrument', Icon: 'file-tray-full', Link: "/instrument" },


    ]; 
  useEffect(() => {
  },[Color])

  return (
    <div className={`sideBar ${isOpen ? "open" : ""}`}  style={{backgroundColor: Color.color2}}>
      <SubInfo></SubInfo>
      {choices.map((choice, index) => (
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