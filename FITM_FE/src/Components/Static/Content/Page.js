import React, { useState, useEffect } from "react";
import "./Page.css";
import Header from "../Header/header";
import { Outlet } from "react-router-dom";

function Page({ isOpen, setOpen ,  themeChange, setTheme }) {
  let [input, setInput] = useState("");
  let [noti, setNoti] = useState("");
  let [Click, setClick] = useState("");
  useEffect(() => {
    if (input.length < 8) {
      setNoti("chưa hợp lệ");
    } else setNoti("hợp lệ");
  }, [input]);

  return (
    <div className="Page">
      <Header isOpen={isOpen} setOpen={setOpen}  themeChange={themeChange} setTheme={setTheme}  ></Header>
      <Outlet></Outlet>
    <Routes>
   

    </Routes>
       
    </div>
  );
}
export default Page;