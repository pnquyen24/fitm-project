import React, { useEffect, useState } from "react";
import { Outlet, Routes } from "react-router-dom";
import Header from "../Header/header";
import "./Page.css";

function Page({ isOpen, setOpen ,  themeChange, setTheme }) {
  let [input, setInput] = useState("");
  let [noti, setNoti] = useState("");
  let [Click, setClick] = useState("");
  useEffect(() => {
    if (input.length < 8) {
      setNoti("chưa hợp lệ");
    } else setNoti("hợp lệ");
  }, [input]);

  useEffect(()=>{},[themeChange])
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