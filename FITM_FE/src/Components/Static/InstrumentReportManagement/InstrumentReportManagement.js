import axiosClient from "../../../Variable/Api/api";
import { useState, useEffect } from "react";
import InstrumentReport from "./InstruReport/InstrumentReport";
import "./InstrumentReportManagement.css";

function InstrumentReportManagement() {
    document.title = "Instrument Report Management";

    const GET_ALL_INSTRUMENT_REPORT_URL =
        "InstrumentReport/GetAllInstrumentReport";

    let [reports, setReports] = useState([]);

    useEffect(() => {
        getAllReports();
    }, []);

    const getAllReports = () => {
        axiosClient
            .get(GET_ALL_INSTRUMENT_REPORT_URL)
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
