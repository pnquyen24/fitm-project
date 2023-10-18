import "./InstrumentReport.css";
import { useState, useEffect } from "react";

function InstrumentReport ({ instrumentId, userId, description }){
    let [decision,setDecision]= useState("");


    return (
        <div className="InstrumentReport-cover">
            <p className = "name content"><ion-icon name="person-circle-outline" style={{ padding: "0 5px 0 0" }}></ion-icon>  Cap Thanh Dat</p>
            <p className = "id content"><strong>Instrument ID</strong> : DB17</p>
            <div className = "instrument"> <p className = " content"> <strong>Type</strong> : Đàn Bầu </p> <p className = "status content"><strong>Status</strong> : Activating </p> </div>
            <span className = "descripton"> Hư gì nhìn thấy ghê lắm luôn</span>
            
            <div className = "deco"><ion-icon name="cog-outline" ></ion-icon></div>
            
            <div className = "button" >
                <button className = "deny" onClick={()=>{setDecision('d')}} > <div className={decision==="d"?"expanded expand ":"expand"}></div>     <ion-icon name="close-circle-outline"></ion-icon></button>
                <button className = "accept"  onClick={()=>{setDecision('a')}}>  <div className={decision=='a'?"expanded expand":"expand"}></div>    <ion-icon name="checkmark-circle-outline"></ion-icon></button>

            </div>
        </div>
    )
}
export default InstrumentReport;