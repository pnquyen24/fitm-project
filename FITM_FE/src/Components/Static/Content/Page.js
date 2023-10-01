import React, { useState, useEffect } from "react";
import "./Page.css";
import Header from "../Header/header";
import { click } from "@testing-library/user-event/dist/click";
import Schedule from "../../Member/Shedule/Schedule";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import InputInfo from "../../Member/Input/InputInfo";
import ChangePassword from "../ChangePassword/ChangePassword";
import Profile from "../Profile/Profile";
import RequestEditInfo from "../RequestEditInfo/RequestEditInfo";

function Page({ isOpen, setOpen }) {
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
      <Header isOpen={isOpen} setOpen={setOpen}></Header>
      <Outlet></Outlet>
    <Routes>
   

    </Routes>
       
    </div>
  );
}
export default Page;



function Change(){
  return <h1> change </h1>
}