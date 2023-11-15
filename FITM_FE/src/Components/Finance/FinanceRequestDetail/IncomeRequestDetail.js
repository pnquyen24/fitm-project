import axiosClient from "../../../Variable/Api/api";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import "./IncomeRequestDetail.css";

function IncomeRequestDetail() {
    document.title = "Income Request Detail";

    const GET_INCOME_URL = "Finance/GetIncome";
    const ACCEPT_INCOME_REQUEST_URL = "Finance/AcceptIncomeRequest";
    const DENY_INCOME_REQUEST_URL = "Finance/DenyIncomeRequest";

    const [income, setIncome] = useState(null);
    const isEditing = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const incomeId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        axiosClient
            .get(`${GET_INCOME_URL}?id=` + incomeId)
            .then((response) => {
                setIncome(response.data);
            })
            .catch((error) => {});
    }, [incomeId]);

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

    function AcceptIncomeRequest() {
        showLoadingOverlay();
        axiosClient
            .post(`${ACCEPT_INCOME_REQUEST_URL}?id=${incomeId}`)
            .then((response) => {
                hideLoadingOverlay();
                Swal.fire({
                    title: "Finance Report Accepted !!!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/financial-manager/finance-request-list");
                });
            })
            .catch((error) => {
                hideLoadingOverlay();
                Swal.fire({
                    title: "Error",
                    text: "Accept Unsuccessfully !!!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    }
    function DenyIncomeRequest() {
        showLoadingOverlay();
        axiosClient
            .post(`${DENY_INCOME_REQUEST_URL}?id=${incomeId}`)
            .then((response) => {
                hideLoadingOverlay();
                Swal.fire({
                    title: "Finance Report Denied !!!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                     navigate("/financial-manager/finance-request-list");
                });
            })
            .catch((error) => {
                hideLoadingOverlay();
                Swal.fire({
                    title: "Error",
                    text: "Unsuccessful",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    }
    function showLoadingOverlay() {
        // Create and append an overlay element with a loading spinner
        const overlay = document.createElement("div");
        overlay.className = "loading-overlay";
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }
    
    function hideLoadingOverlay() {
        // Remove the loading overlay
        const overlay = document.querySelector(".loading-overlay");
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }
    if (!income) {
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
                                    INCOME DETAIL
                                </h4>
                                <hr></hr>
                            </div>
                            <div className="id_title">
                                <div className="each_row_info col-md-12">
                                    <label className="span_title">ID: </label>
                                    <span className="span_info">
                                        {income.id}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="title">Title: </label>
                                <label className="span_info ">
                                    <h5>{income.title}</h5>
                                </label>
                            </div>
                            <div className="each_row_info">
                                <label className="span_title">
                                    Description:
                                </label>
                                <label className="span_info">
                                    <h5>{income.description}</h5>
                                </label>
                            </div>

                            <div>
                                <div className="each_row_info">
                                    <label className="span_title">
                                        Created Time:
                                    </label>
                                    <label className="span_info">
                                        {formatDate(income.createdTime)}
                                    </label>
                                    <br></br>
                                </div>

                                <div className="each_row_info">
                                    <label className="span_title">
                                        Modified Time:
                                    </label>
                                    <label className="span_info">
                                        {formatDate(income.modifiedTime)}
                                    </label>
                                </div>
                            </div>

                            <div className="amount_billCode col-md-12">
                                <div className="col-md-6">
                                    <label className="span_title">
                                        Amount:
                                    </label>
                                    <label className="span_info">
                                        <h5>{income.amount}</h5>
                                    </label>
                                </div>
                                <div className="billCode col-md-6">
                                    <label className="span_title">
                                        BillCode:
                                    </label>
                                    <label className="span_info">
                                        <h5>{income.billCode}</h5>
                                    </label>
                                </div>
                            </div>

                            <div className="finance_status">
                                <label>
                                    {getStatusLabel(income.financeStatus)}
                                </label>
                            </div>

                            <div className="in_request_card_button">
                                {!isEditing && (
                                    <Link to="/financial-manager/finance-request-list">
                                        <Button variant="outlined">
                                            <span>Back</span>
                                        </Button>
                                    </Link>
                                )}

                                <div>
                                    {income.financeStatus === 1 ? (
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => {
                                                    AcceptIncomeRequest();
                                                }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    DenyIncomeRequest();
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

export default IncomeRequestDetail;
