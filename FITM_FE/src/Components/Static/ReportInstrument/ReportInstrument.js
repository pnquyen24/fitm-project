import "./ReportInstrument.css";
import axiosClient from "../../../Variable/Api/api";
import { useState, useEffect } from "react";

function InstrumentReport() {
    document.title = "Instrument Report";

    const GET_URL = "Member/Get";
    const CREATE_INSTRUMENT_REPORT_URL =
        "InstrumentReportControl/CreateIstrumentReport";

    const [member, setMember] = useState(null);

    useEffect(() => {
        axiosClient
            .get(GET_URL)
            .then((response) => {
                setMember(response.data);
            })
            .catch((error) => {});
    }, []);

    let [InstrumentId, setInstrumentId] = useState("");
    let [ReportDetail, setReportDetail] = useState("");

    const handleIdInput = (e) => {
        setInstrumentId(e.target.value);
    };
    const handleDetailInput = (e) => {
        setReportDetail(e.target.value);
    };

    const SendReport = async () => {
        let Report = {
            instrumentID: InstrumentId,
            memberID: member.studentID,
            desciption: ReportDetail,
        };

        await axiosClient
            .post(CREATE_INSTRUMENT_REPORT_URL, Report)
            .then((response) => {})
            .catch((error) => {});
    };
    return (
        <div className="instrumentReport-Cover">
            <h2
                style={{
                    borderBottom: "solid 3px pink",
                    paddingBottom: "15px",
                }}
            >
                Report Instrument
            </h2>
            <div className="instrumentReport-main">
                <div className="instrumentReport-first">
                    <div className="InstrumentIdCover">
                        <input
                            type="text"
                            className="InstrumentId"
                            value={InstrumentId}
                            onChange={(e) => {
                                handleIdInput(e);
                            }}
                            required
                        ></input>
                        <h6>Instrument ID</h6>
                    </div>
                    <h5 className="verify-instrument">
                        {" "}
                        Verify :
                        <ion-icon
                            name="checkmark-circle"
                            style={{ color: "green" }}
                        ></ion-icon>{" "}
                        Exist
                    </h5>
                    <h5>Type : Đàn Tranh</h5>
                    <h5 className="verify-instrument">
                        Status :{" "}
                        <ion-icon
                            name="layers"
                            style={{ color: "rgb(0, 195, 255)" }}
                        ></ion-icon>{" "}
                        Available
                    </h5>
                </div>
                <div className="instrumentReport-second">
                    <div className="Instrument-Report-Detail-Cover">
                        <textarea
                            className="InstrumentReport-detail"
                            required
                            value={ReportDetail}
                            onChange={(e) => {
                                handleDetailInput(e);
                            }}
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
