import Button from "@mui/material/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./MemberProfile.css";

function MemberProfile() {
  document.title = "Member Profile";

    const [member, setMember] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(location.search).get("id");

    const getData = useCallback(() => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("https://localhost:7226/apis/Member/GetMemberById?id=" + id)
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
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .post("https://localhost:7226/apis/Member/ChangeStatus?id=" + id)
            .then(() => {
                CustomeAlert.success(
                    `${
                        member.status === 1 ? "Deactivate" : "Activate"
                    } success!`
                );
                getData();
            })
            .catch(() => {
                CustomeAlert.error(
                    `${member.status === 1 ? "Deactivate" : "Activate"} Error!`
                );
            });
    }

    function BackToList() {
        navigate("/member-manager/member-list");
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
                            <div
                                className="main-avatar "
                                width="150px"
                            />
                            <span className="font-weight-bold">
                                {member.fullName}
                            </span>
                            <span className="text-black-50">
                                {member.email}
                            </span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 py-6 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">
                                    {member.username.split(".", 1)}'s Profile
                                </h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 ">
                                    <label className="labels">Full Name:</label>
                                    <p className="backgroundTemp">
                                        {member.fullName}
                                    </p>
                                </div>
                                <div className="col-md-6 marginTemp">
                                    <label className="labels">Username:</label>
                                    <p className="backgroundTemp">
                                        {member.username}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 ">
                                <label className="labels">Email:</label>
                                {member.email}
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6 ">
                                    <label className="labels">
                                        Phone Number:
                                    </label>
                                    {member.bankNumber}
                                </div>
                                <div className="col-md-6 ">
                                    <label className="labels">Status:</label>{" "}
                                    {member.status}
                                    <label
                                        className="status"
                                        style={{
                                            color: member.status
                                                ? "green"
                                                : "red",
                                        }}
                                    >
                                        {member.status ? "Active" : "Inactive"}
                                    </label>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">
                                        Date of birth:
                                    </label>
                                    {new Date(member.dob).toLocaleDateString()}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">
                                        Student ID:
                                    </label>
                                    {member.studentID}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Bank Name:</label>
                                    {member.bankName}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">
                                        Bank Number:
                                    </label>
                                    {member.bankNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_button_cover">
                <Button
                    className=" mbButton"
                    id="detail_back"
                    onClick={() => {
                        BackToList();
                    }}
                    variant="outlined"
                    style={{ width: "150px" }}
                >
                    Back to List
                </Button>

                <div className="detail_button">
                    {member.status ? (
                        <Button
                            id="deactivate"
                            className="mbButton"
                            onClick={() => {
                                ChangeStatus(member.id);
                            }}
                            variant="outlined"
                        >
                            {" "}
                            Deactivate{" "}
                        </Button>
                    ) : (
                        <Button
                            id="activate"
                            className="mbButton"
                            onClick={() => {
                                ChangeStatus(member.id);
                            }}
                            variant="outlined"
                        >
                            {" "}
                            Activate{" "}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MemberProfile;
