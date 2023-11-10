import Button from "@mui/material/Button";
import axiosClient from "../../../Variable/Api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./MemberProfile.css";

function MemberProfile() {
    document.title = "Member Profile";

    const GET_MEMBER_BY_ID_URL = "Member/GetMemberById";
    const CHANGE_STATUS_URL = "Member/ChangeStatus";

    const [member, setMember] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const id = new URLSearchParams(location.search).get("id");

    const getData = useCallback(() => {
        axiosClient
            .get(`${GET_MEMBER_BY_ID_URL}?id=` + id)
            .then((response) => {
                setMember(response.data);
            })
            .catch((error) => {});
    }, [id]);
    useEffect(() => {
        getData();
    }, [id, getData]);

    function ChangeStatus(id) {
        // Send a POST request to the API endpoint
        showLoadingOverlay();
        setLoading(true);
        axiosClient
            .post(`${CHANGE_STATUS_URL}?id=` + id)
            .then(() => {
                setLoading(false);
                hideLoadingOverlay();
                CustomeAlert.success(
                    `${
                        member.status === 1 ? "Deactivate" : "Activate"
                    } success!`
                );
                getData();
            })
            .catch(() => {
                hideLoadingOverlay();
                CustomeAlert.error(
                    `${member.status === 1 ? "Deactivate" : "Activate"} Error!`
                );
            });
    }

    function BackToList() {
        navigate("/member-manager/member-list");
    }

    function ModifyRole() {
        navigate(`/member-manager/modify-role?id=${id}`);
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

    if (!member) {
        return <div>Loading...</div>;
    }
    return (
        <div className="member-profile-container">
            <div className="container rounded bg-white mt-5 mb-4 ">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <h3
                                className="font-weight-bold mt-3"
                                style={{ textTransform: "uppercase" }}
                            >
                                {member.fullName}
                            </h3>
                            <img
                                className="rounded-circle mt-3"
                                width="200px"
                                height="200px"
                                src={"/img/88129659_p0_master1200.jpg"}
                                alt="avatar"
                            />
                            <span className="text-black-50 mt-3">
                                {member.email}
                            </span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 py-6 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 ">
                                    <label className="labels">Full Name:</label>
                                    <input
                                        type="text"
                                        value={member.fullName}
                                        className="form-control font-weight-bold"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        maxLength={30}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 marginTemp">
                                    <label className="labels">Username:</label>
                                    <input
                                        type="text"
                                        value={member.username}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        maxLength={30}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="labels">Email:</label>
                                <input
                                    type="text"
                                    value={member.email}
                                    className="form-control"
                                    style={{
                                        backgroundColor:
                                            " rgba(220, 220, 220, 0.181)",
                                        border: "none",
                                    }}
                                    disabled
                                />
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6 ">
                                    <label className="labels">
                                        Phone Number:
                                    </label>
                                    <input
                                        type="text"
                                        value={member.phoneNumber}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Status:</label>
                                    <input
                                        type="text"
                                        value={
                                            member.status
                                                ? "Active"
                                                : "Inactive"
                                        }
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                            color: member.status
                                                ? "green"
                                                : "red",
                                        }}
                                        maxLength={30}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">
                                        Date of birth:
                                    </label>
                                    <input
                                        type="date"
                                        value={member.dob.split("T")[0]}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">
                                        Student ID:
                                    </label>
                                    <input
                                        type="text"
                                        value={member.studentID}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="labels">Bank Name:</label>
                                    <input
                                        type="text"
                                        value={member.bankName}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="labels">
                                        Bank Number:
                                    </label>
                                    <input
                                        type="text"
                                        value={member.bankNumber}
                                        className="form-control"
                                        style={{
                                            backgroundColor:
                                                " rgba(220, 220, 220, 0.181)",
                                            border: "none",
                                        }}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_button_cover">
                <div className="detail_button">
                    {member.status ? (
                        <Button
                            id="deactivate"
                            disabled={loading}
                            className="mbButton"
                            color="error"
                            onClick={() => {
                                ChangeStatus(member.id);
                            }}
                            variant="contained"
                        >
                            Deactivate
                        </Button>
                    ) : (
                        <Button
                            id="activate"
                            disabled={loading}
                            className="mbButton"
                            color="success"
                            onClick={() => {
                                ChangeStatus(member.id);
                            }}
                            variant="contained"
                        >
                            Activate
                        </Button>
                    )}
                </div>
                <Button
                    disabled={loading}
                    onClick={() => {
                        ModifyRole();
                    }}
                    variant="contained"
                    style={{ width: "150px" }}
                >
                    Modify Role
                </Button>
                <Button
                    className="mbButton"
                    disabled={loading}
                    id="detail_back"
                    onClick={() => {
                        BackToList();
                    }}
                    variant="outlined"
                    style={{ width: "150px" }}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

export default MemberProfile;
