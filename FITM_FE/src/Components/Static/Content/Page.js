import React, { useState, useEffect } from "react";
import "./Page.css";
import Header from "../Header/header";
import { click } from "@testing-library/user-event/dist/click";
import Schedule from "../../Member/Shedule/Schedule";
import { Link, Route, Routes } from "react-router-dom";
import InputInfo from "../../Member/Input/InputInfo";
import ChangePassword from "../ChangePassword/ChangePassword";

function Page({ isOpen, setOpen }) {
  let [input, setInput] = useState("");
  let [noti, setNoti] = useState("");
  let [Click, setClick] = useState("");
  useEffect(() => {
    console.log("here");
    if (input.length < 8) {
      setNoti("chưa hợp lệ");
    } else setNoti("hợp lệ");
  }, [input]);

  return (
    <div className="Page">
      <Header isOpen={isOpen} setOpen={setOpen}></Header>

      <Link to="/changepassword">text</Link>
      <Link to="/input">Input</Link>


        <Routes>
          <Route path="/changepassword" element={<ChangePassword></ChangePassword>} />
          <Route path="/input" element={<InputInfo></InputInfo>} />

        </Routes>
    </div>
  );
}
export default Page;
