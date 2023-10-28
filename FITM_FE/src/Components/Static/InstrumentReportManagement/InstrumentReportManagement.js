import axios from "axios";
import { useState, useEffect } from "react";
import InstrumentReport from "./InstruReport/InstrumentReport";
import "./InstrumentReportManagement.css";

function InstrumentReportManagement() {
  let [reports, setReports] = useState([]);

  useEffect(() => {
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;

    getAllReports();
  }, []);

  const getAllReports = () => {
    axios
      .get("https://localhost:7226/apis/InstrumentReportControl/GetAllInstrumentReport")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {});
  };

  return (
    <div className="InstrumentReportManagement-cover">
      {reports.map((report, index) => (
        
        <InstrumentReport
          key={index}
          id={report.id}
          instrumentId={report.instrumentID}
          userId={report.memberID}
          description={report.desciption}
          
        ></InstrumentReport>
      ))}
    </div>
  );
}
export default InstrumentReportManagement;
