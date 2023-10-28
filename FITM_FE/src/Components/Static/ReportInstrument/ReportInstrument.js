import "./ReportInstrument.css";
import axios from "axios";
import { useState, useEffect } from "react";


function InstrumentReport() {
    const [member, setMember] = useState(null);

  useEffect(() => {
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    axios.get(`https://localhost:7226/apis/Member/Get`)
            .then(response => {
                setMember(response.data);
            })
            .catch(error => {
            });
  }, []);

    let [InstrumentId, setInstrumentId] = useState("");
    let [ReportDetail, setReportDetail] = useState("");

    const handleIdInput= (e)=>{
        setInstrumentId(e.target.value);
    }
    const handleDetailInput= (e)=>{
        setReportDetail(e.target.value);
    }

    const SendReport = async () => {
        let Report = {
            
                instrumentID: InstrumentId,
                memberID: member.studentID,
                desciption: ReportDetail
               };
    
        await axios
          .post(`https://localhost:7226/apis/InstrumentReportControl/CreateIstrumentReport`, Report)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("lỗi lòi mắt em ơi")
          });
      };
  return (
    <div className="instrumentReport-Cover">
       <h2 style={{ borderBottom : "solid 3px pink" , paddingBottom : '15px'}}>Report Instrument</h2>
      <div className="instrumentReport-main">
      <div className="instrumentReport-first">
     
     <div className="InstrumentIdCover">
       <input type="text" className="InstrumentId"
       value={InstrumentId}
       onChange={(e) => {handleIdInput(e)}}
        required></input>
       <h6>Instrument ID</h6>
     </div>
     <h5 className="verify-instrument"> Verify : 
       <ion-icon
         name="checkmark-circle"
         style={{ color: "green" }}
       ></ion-icon>{" "}
       Exist
     </h5>
     <h5>Type  : Đàn Tranh</h5>
     <h5 className="verify-instrument" >Status : <ion-icon name="layers" style={{ color: "rgb(0, 195, 255)" }} ></ion-icon> Available</h5>
   </div>
   <div className="instrumentReport-second">
     <div className="Instrument-Report-Detail-Cover">
       <textarea className="InstrumentReport-detail" required
       value={ReportDetail}
       onChange={(e) => {handleDetailInput(e)}}
       ></textarea>

       <h6>Instrument Report Detail</h6>
     </div>
   </div>

      </div>
      <div className="InstrumentReport-buttons">
        <button className="Submit-Report" onClick={SendReport}>
          <ion-icon name="paper-plane-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}
export default InstrumentReport;
