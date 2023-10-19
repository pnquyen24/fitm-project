import axios from "axios";
import { useState, useEffect } from "react";
import "./InstrumentReport.css";

function InstrumentReport ({ id, instrumentId, userId, description }){
    let [decision,setDecision]= useState("");

    useEffect(() => {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
    
      }, []);
    
      const deleteReport = () => {
        axios
          .delete(`https://localhost:7226/apis/InstrumentReportControl/DeleteReport/${id}`)
          .then((response) => {
          })
          .catch((error) => {});
      };

    return (
        <div className="InstrumentReport-cover">
            <p className = "name content"><ion-icon name="person-circle-outline" style={{ padding: "0 5px 0 0" }}></ion-icon>  {userId}</p>
            <p className = "id content"><strong>Instrument ID</strong> : {instrumentId}</p>
            <div className = "instrument"> <p className = " content"> <strong>Type</strong> : Đàn Bầu </p> <p className = "status content"><strong>Status</strong> : Activating </p> </div>
            <span className = "descripton"> {description}</span>
            
            <div className = "deco"><ion-icon name="cog-outline" ></ion-icon></div>
            
            <div className = "button" >
                <button className = "deny" onClick={()=>{
                    setDecision('d')
                    deleteReport()
                    }} > <div className={decision==="d"?"expanded expand ":"expand"}></div>     <ion-icon name="close-circle-outline"></ion-icon></button>
                <button className = "accept"  onClick={()=>{
                    setDecision('a')
                    deleteReport()
                
                }}>  <div className={decision=='a'?"expanded expand":"expand"}></div>    <ion-icon name="checkmark-circle-outline"></ion-icon></button>

            </div>
        </div>
    )
}
export default InstrumentReport;