import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import axiosClient from "../../../Variable/Api/api";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./RequestDetail.css";

function RequestDetail() {
    document.title = "Request Detail";

    const GET_COMPARE_REQUEST_URL = "RequestEditInfo/GetCompareRequest";
    const ACCEPT_REQUEST_URL = "RequestEditInfo/AcceptRequest";
    const DENY_REQUEST_URL = "RequestEditInfo/DenyRequest";

    const [compareData, setCompareData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const getData = useCallback(() => {
        axiosClient
            .get(`${GET_COMPARE_REQUEST_URL}?id=${id}`)
            .then((response) => {
                setCompareData(response.data);
            })
            .catch((error) => {
            });
    }, [id]);

    useEffect(() => {
        getData();
    }, [id, getData, compareData.status]);

    function BackToList() {
        navigate("/member-manager/request-edit-info-list");
    }

    function AcceptRequest(id) {
        document.getElementById("denyButton").disabled = true;
        document.getElementById("acceptButton").disabled = true;
        showLoadingOverlay();
        // Send a POST request to the API endpoint
        axiosClient
            .post(`${ACCEPT_REQUEST_URL}?id=` + id)
            .then((response) => {
                document.getElementById("denyButton").disabled = false;
                document.getElementById("acceptButton").disabled = false;
                hideLoadingOverlay();
                CustomeAlert.success(`Accepted successfully!`);
                getData();
            })
            .catch((error) => {
                document.getElementById("denyButton").disabled = false;
                document.getElementById("acceptButton").disabled = false;
                hideLoadingOverlay();
                CustomeAlert.error(`Accepted Error!`);
            });
    }

    function DenyRequest(id) {
        // Send a POST request to the API endpoint
        document.getElementById("denyButton").disabled = true;
        document.getElementById("acceptButton").disabled = true;
        showLoadingOverlay();
        axiosClient
            .post(`${DENY_REQUEST_URL}?id=` + id)
            .then((response) => {
                document.getElementById("denyButton").disabled = false;
                document.getElementById("acceptButton").disabled = false;
                hideLoadingOverlay();
                CustomeAlert.success(`Denied successfully!`);
                getData();
            })
            .catch((error) => {
                document.getElementById("denyButton").disabled = false;
                document.getElementById("acceptButton").disabled = false;
                hideLoadingOverlay();
                CustomeAlert.error(`Denied Error!`);
            });
    }

    function convertStatus(status) {
        if (status === 0)
            return <Chip label="Pending" color="warning" size="small"></Chip>;
        if (status === 1)
            return <Chip label="Accepted" color="success" size="small"></Chip>;
        if (status === 2)
            return <Chip label="Denied" color="error" size="small"></Chip>;
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

    return (
        <div className="container_request_detail">
            <TableContainer component={Paper} className="TableContainerDetail">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Attribute</TableCell>
                            <TableCell>Old Value</TableCell>
                            <TableCell>New Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>{compareData.oldStudentID}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        compareData.newStudentID ===
                                        compareData.oldStudentID
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newStudentID}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>
                                {compareData.oldDOB
                                    ? new Date(
                                          compareData.oldDOB
                                      ).toLocaleDateString()
                                    : ""}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        new Date(
                                            compareData.oldDOB
                                        ).toLocaleDateString() ===
                                        new Date(
                                            compareData.newDOB
                                        ).toLocaleDateString()
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newDOB
                                    ? new Date(
                                          compareData.newDOB
                                      ).toLocaleDateString()
                                    : ""}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{compareData.oldEmail}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        compareData.oldEmail ===
                                        compareData.newEmail
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newEmail}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>{compareData.oldPhoneNumber}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        compareData.oldPhoneNumber ===
                                        compareData.newPhoneNumber
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newPhoneNumber}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bank Name</TableCell>
                            <TableCell>{compareData.oldBankName}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        compareData.oldBankName ===
                                        compareData.newBankName
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newBankName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bank Number</TableCell>
                            <TableCell>{compareData.oldBankNumber}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        compareData.oldBankNumber ===
                                        compareData.newBankNumber
                                            ? "black"
                                            : "red",
                                }}
                            >
                                {compareData.newBankNumber}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                {convertStatus(compareData.status)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="buttons-container">
                <Button
                    id="acceptButton"
                    style={{
                        display:
                            compareData.status === 1 || compareData.status === 2
                                ? "none"
                                : "block",
                    }}
                    className="buttons accept-button"
                    onClick={() => {
                        AcceptRequest(id);
                    }}
                    variant="outlined"
                >
                    Accepted
                </Button>
                <Button
                    id="denyButton"
                    style={{
                        display:
                            compareData.status === 1 || compareData.status === 2
                                ? "none"
                                : "block",
                    }}
                    className="buttons deny-button"
                    onClick={() => {
                        DenyRequest(id);
                    }}
                    variant="outlined"
                >
                    Denied
                </Button>
                <Button
                    className="buttons"
                    onClick={() => {
                        BackToList();
                    }}
                    variant="outlined"
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

export default RequestDetail;
