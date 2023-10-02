import React, { useState, useEffect } from "react";
import "./Page.css";
import Header from "../Header/header";
import { Outlet } from "react-router-dom";

function Page({ isOpen, setOpen }) {
    let [input, setInput] = useState("");
    let [noti, setNoti] = useState("");
    useEffect(() => {
        if (input.length < 8) {
            setNoti("chưa hợp lệ");
        } else setNoti("hợp lệ");
    }, [input]);

    return (
        <div className="Page">
            <Header isOpen={isOpen} setOpen={setOpen}></Header>
            <div id="swal2-container">
                <Outlet></Outlet>
            </div>
        </div>
    );
}
export default Page;