import React, { useEffect } from "react";
import { Outlet, Routes } from "react-router-dom";
import Header from "../Header/header";
import "./Page.css";

function Page({ isOpen, setOpen, themeChange, setTheme }) {
    useEffect(() => {}, [themeChange]);
    return (
        <div className="Page">
            <Header
                isOpen={isOpen}
                setOpen={setOpen}
                themeChange={themeChange}
                setTheme={setTheme}
            ></Header>
            <Outlet></Outlet>
            <Routes></Routes>
        </div>
    );
}
export default Page;
