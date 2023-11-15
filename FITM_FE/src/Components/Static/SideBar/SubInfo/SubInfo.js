import React from "react";
import "./SubInfo.css";
import { Link } from "react-router-dom";

function SubInfo({setSelectedChoice}) {
    const onClickIcon = ()=>{
        setSelectedChoice(null);
    }
    return (
        <div className="sideBar_sub-info">
            <Link to="/"><img src="/IMG/logo FIT.png" alt="logo" onClick={onClickIcon}></img></Link>
        </div>
    );
}
export default SubInfo;
