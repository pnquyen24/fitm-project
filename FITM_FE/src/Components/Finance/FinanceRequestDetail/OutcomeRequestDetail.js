import axiosClient from "../../../Variable/Api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

function OutcomeRequestDetail() {
    document.title = "Outcome Request Detail";

    const GET_OUTCOME_URL = "Finance/GetOutcome";
    const ACCEPT_OUTCOME_REQUEST_URL = "Finance/AcceptOutcomeRequest";
    const DENY_OUTCOME_REQUEST_URL = "Finance/DenyOutcomeRequest";

    const [outcome, setOutcome] = useState(null);
    const isEditing = useState(false);
    const location = useLocation();
    const outcomeId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        axiosClient
            .get(`${GET_OUTCOME_URL}?id=` + outcomeId)
            .then((response) => {
                setOutcome(response.data);
            })
            .catch((error) => {});
    }, [outcomeId]);

    function formatDate(date) {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1;
        const year = formattedDate.getFullYear();

        if (day === 1 && month === 1 && year === 1) {
            return "Not Yet";
        }

        const formattedDateString = `${day < 10 ? "0" + day : day}-${
            month < 10 ? "0" + month : month
        }-${year}`;

        return formattedDateString;
    }

    function AcceptOutcomeRequest() {
        axiosClient
            .post(`${ACCEPT_OUTCOME_REQUEST_URL}?id=${outcomeId}`)
            .then((response) => {
                Swal.fire({
                    title: "Finance Report Accepted !!!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href =
                        "/financial-manager/finance-request-list";
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Accept Unsuccessfully !!!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    }
    function DenyOutcomeRequest() {
        axiosClient
            .post(`${DENY_OUTCOME_REQUEST_URL}?id=${outcomeId}`)
            .then((response) => {
                Swal.fire({
                    title: "Finance Report Denied !!!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href =
                        "/financial-manager/finance-request-list";
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Unsuccessful",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    }

    if (!outcome) {
        return <div>Loading...</div>;
    }

    return (
        <div className="finance-card">
            <div>
                <div className="in_request_card">
                    <div>
                        <div>
                            <div style={{ color: "#1976d2" }}>
                                <h4 style={{ textAlign: "center" }}>
                                    OUTCOME DETAIL
                                </h4>
                                <hr></hr>
                            </div>

                            <div className="id_title">
                                <div className="each_row_info col-md-12">
                                    <label className="span_title">ID: </label>{" "}
                                    <span className="span_info">
                                        {outcome.id}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="title">Title: </label>
                                <label className="span_info ">
                                    <h5>{outcome.title}</h5>
                                </label>
                            </div>
                            <div className="each_row_info">
                                <label className="span_title">
                                    Description:{" "}
                                </label>
                                <label className="span_info">
                                    <h5>{outcome.description}</h5>
                                </label>
                            </div>

                            <div>
                                <div className="each_row_info">
                                    <label className="span_title">
                                        Created Time:
                                    </label>
                                    <label className="span_info">
                                        {formatDate(outcome.createdTime)}
                                    </label>
                                    <br></br>
                                </div>

                                <div className="each_row_info">
                                    <label className="span_title">
                                        Modified Time:
                                    </label>
                                    <label className="span_info">
                                        {formatDate(outcome.modifiedTime)}
                                    </label>
                                </div>
                            </div>

                            <div className="amount_billCode col-md-12">
                                <div className="col-md-6">
                                    <label className="span_title">
                                        Amount:
                                    </label>
                                    <label className="span_info">
                                        <h5>{outcome.amount}</h5>
                                    </label>
                                </div>
                                <div className="billCode col-md-6">
                                    <label className="span_title">
                                        BillCode:
                                    </label>
                                    <label className="span_info">
                                        <h5>{outcome.billCode}</h5>
                                    </label>
                                </div>
                            </div>

                            <div className="finance_status">
                                <label>
                                    {getStatusLabel(outcome.financeStatus)}
                                </label>
                            </div>

                            <div className="in_request_card_button">
                                {!isEditing && (
                                    <Link to="/financial-manager/finance-request-list">
                                        <Button>Back to List </Button>
                                    </Link>
                                )}
                                <div>
                                    {outcome.financeStatus === 1 ? (
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => {
                                                    AcceptOutcomeRequest();
                                                }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    DenyOutcomeRequest();
                                                }}
                                            >
                                                Deny
                                            </Button>
                                            <Link to="/financial-manager/finance-request-list">
                                                <Button variant="outlined">
                                                    Back
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutcomeRequestDetail;
