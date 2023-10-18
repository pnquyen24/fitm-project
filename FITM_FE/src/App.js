import "./App.css";
import SideBar from "./Components/Static/SideBar/SideBar";
import React, { useState } from 'react';
import Page from "./Components/Static/Content/Page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Components/Static/Profile/Profile";
import {Color} from "./Variable/Color/Color";

function App() {

  const [isOpen, setOpen] = useState(false);
  const [themeChange, setTheme] = useState(true);

  return (
    <div className="App" style={{backgroundColor: Color.color1}}>

      <SideBar isOpen={isOpen} setOpen={setOpen} themeChange={themeChange}  ></SideBar>
      <Page isOpen={isOpen} setOpen={setOpen}  themeChange={themeChange} setTheme={setTheme} ></Page>
    </div>
  );
}

export default App;