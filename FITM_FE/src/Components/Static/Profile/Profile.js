import axiosClient from "../../../Variable/Api/api";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./Profile.css";

function Profile({ memberId }) {
    document.title = "Profile";

    const GET_URL = "Member/Get";
    const POST_URL = "RequestEditInfo/Post";

    const [member, setMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempMember, setTempMember] = useState(null);

    useEffect(() => {
        axiosClient
            .get(GET_URL)
            .then((response) => {
                setMember(response.data);
                setTempMember(response.data);
            })
            .catch((error) => {});
    }, [memberId]);

    // Function to toggle editing mode for all rows
    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempMember(member);
        }
    };

    // Function to check if an email is valid
    function isValidEmail(checkEmail) {
        // Regular expression for a simple email format check
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(checkEmail)) {
            CustomeAlert.warning(`Invalid email format: ${checkEmail}`);
            return false;
        }
        return emailRegex.test(checkEmail);
    }

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Function to handle form submission
    const handleSubmit = () => {
        if (!isValidEmail(tempMember.email)) {
            return;
        }
        // Prepare the data to be sent in the request
        const requestData = {
            studentID: tempMember.studentID,
            dob: tempMember.dob,
            phoneNumber: tempMember.phoneNumber,
            bankName: tempMember.bankName,
            bankNumber: tempMember.bankNumber,
            email: tempMember.email,
        };

        // Send a POST request to the API endpoint
        axiosClient
            .post(POST_URL, requestData)
            .then((response) => {
                CustomeAlert.success("Send request success!");
            })
            .catch((error) => {
                CustomeAlert.error("Send request Error!");
            });
    };

    if (!member) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="container rounded bg-white mt-4 mb-4 profile-cover">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <h3 className="font-weight-bold">
                                {member.fullName}
                            </h3>
                            <img
                                className="rounded-circle mt-5"
                                width="200px"
                                height="200px"
                                src={"/img/88129659_p0_master1200.jpg"}
                                alt="avatar"
                            />
                            <span className="text-black-50 mt-5">
                                {member.email}
                            </span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 py-4 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">
                                    {isEditing ? "Edit Profile" : "Profile"}
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
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">Email:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.email}
                                            className="form-control"
                                            maxLength={30}
                                            onChange={(e) => {
                                                setTempMember({
                                                    ...tempMember,
                                                    email: e.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={member.email}
                                            className="form-control"
                                            style={{
                                                backgroundColor:
                                                    " rgba(220, 220, 220, 0.181)",
                                                border: "none",
                                            }}
                                            maxLength={30}
                                            disabled
                                        />
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="labels">
                                        Phone Number:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.phoneNumber}
                                            className="form-control"
                                            maxLength={11}
                                            onChange={(e) => {
                                                const numericInput =
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                setTempMember({
                                                    ...tempMember,
                                                    phoneNumber: numericInput,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={member.phoneNumber}
                                            style={{
                                                backgroundColor:
                                                    " rgba(220, 220, 220, 0.181)",
                                                border: "none",
                                            }}
                                            className="form-control"
                                            disabled
                                        />
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="labels">
                                        Date of birth:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={tempMember.dob.split("T")[0]}
                                            className="form-control"
                                            max={getCurrentDate()}
                                            onChange={(e) =>
                                                setTempMember({
                                                    ...tempMember,
                                                    dob: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={member.dob.split("T")[0]}
                                            className="form-control"
                                            style={{
                                                backgroundColor:
                                                    " rgba(220, 220, 220, 0.181)",
                                                border: "none",
                                            }}
                                            disabled
                                        />
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="labels">
                                        Student ID:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.studentID}
                                            className="form-control"
                                            maxLength={10}
                                            onChange={(e) =>
                                                setTempMember({
                                                    ...tempMember,
                                                    studentID: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
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
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="labels">Bank Name:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.bankName}
                                            className="form-control"
                                            maxLength={15}
                                            onChange={(e) =>
                                                setTempMember({
                                                    ...tempMember,
                                                    bankName: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
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
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="labels">
                                        Bank Number:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.bankNumber}
                                            className="form-control"
                                            maxLength={20}
                                            onChange={(e) => {
                                                const numericInput =
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                setTempMember({
                                                    ...tempMember,
                                                    bankNumber: numericInput,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={member.bankNumber}
                                            style={{
                                                backgroundColor:
                                                    " rgba(220, 220, 220, 0.181)",
                                                border: "none",
                                            }}
                                            className="form-control"
                                            disabled
                                        />
                                    )}
                                </div>

                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-end sm_cl  align-items-center experience float-right">
                                        {/* Submit button */}
                                        {isEditing && (
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmit}
                                                className="float-right"
                                            >
                                                <i className="fa fa-plus"></i>{" "}
                                                Request
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            onClick={toggleEditing}
                                            className="float-right"
                                        >
                                            <i className="fa fa-plus"></i>{" "}
                                            {isEditing ? "Cancel" : "Edit"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
