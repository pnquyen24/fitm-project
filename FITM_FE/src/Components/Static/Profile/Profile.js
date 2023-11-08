import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./Profile.css";

function Profile({ memberId }) {
    document.title = "Profile";

    const [member, setMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempMember, setTempMember] = useState(null);

    useEffect(() => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get(`https://localhost:7226/apis/Member/Get`)
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
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .post(
                "https://localhost:7226/apis/RequestEditInfo/Post",
                requestData
            )
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
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src="{member.avatar}"
                                alt="avatar"
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
                        <div className="p-3 py-4 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Your Profile</h4>
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
                                        member.email
                                    )}
                                </div>

                                <div className="col-md-6 marginTemp">
                                    <label className="labels">
                                        Phone Number:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempMember.phoneNumber}
                                            className="form-control"
                                            maxLength={10}
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
                                        member.bankNumber
                                    )}
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="labels">
                                            Date of birth:
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={
                                                    tempMember.dob.split("T")[0]
                                                }
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
                                            member.dob.split("T")[0]
                                        )}
                                    </div>

                                    <div className="col-md-6">
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
                                                        studentID:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            member.studentID
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="labels">
                                            Bank Name:
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempMember.bankName}
                                                className="form-control"
                                                maxLength={15}
                                                onChange={(e) =>
                                                    setTempMember({
                                                        ...tempMember,
                                                        bankName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            member.bankName
                                        )}
                                    </div>

                                    <div className="col-md-6">
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
                                                        bankNumber:
                                                            numericInput,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            member.bankNumber
                                        )}
                                    </div>

                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-end sm_cl  align-items-center experience float-right">
                                            {/* Submit button */}
                                            {isEditing && (
                                                <button
                                                    onClick={handleSubmit}
                                                    className="border px-3 p-1 add-experience float-right"
                                                >
                                                    <i className="fa fa-plus"></i>{" "}
                                                    Request
                                                </button>
                                            )}
                                            <button
                                                onClick={toggleEditing}
                                                className="border px-3 p-1 add-experience float-right"
                                            >
                                                <i className="fa fa-plus"></i>{" "}
                                                {isEditing
                                                    ? "Cancel"
                                                    : "Edit Profile"}
                                            </button>
                                        </div>
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
