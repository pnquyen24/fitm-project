import axiosClient from "../../../Variable/Api/api";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import "./IncomeDetail.css";

function IncomeDetail() {
    document.title = "Income Detail ";

    const GET_INCOME_URL = "Finance/GetIncome";
    const CHANGE_INCOME_STATUS_URL = "Finance/ChangeIncomeStatus";
    const UPDATE_INCOME_URL = "Finance/UpdateIncome";

    const [income, setIncome] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempIncome, setTempIncome] = useState(null);
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

    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempIncome(income);
        }
    };

    //============================================================
    const IncomeSend = () => {
        axiosClient
            .post(`${CHANGE_INCOME_STATUS_URL}?id=${incomeId}`)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Send Request Successfully !!!",
                    showConfirmButton: true,
                }).then(() => {
                    navigate("/financial-manager/finance-list");
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessfully !!!",
                    showConfirmButton: true,
                });
            });
    };

    //============================================================

    const handleSubmit = () => {
        const updateData = {
            id: incomeId,
            title: tempIncome.title,
            description: tempIncome.description,
            amount: tempIncome.amount,
            billCode: tempIncome.billCode,
        };

        axiosClient
            .put(`${UPDATE_INCOME_URL}?id=` + incomeId, updateData)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Update Successfully !!!",
                    showConfirmButton: true,
                }).then(() => {
                    navigate("/financial-manager/finance-list");
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Update Unsuccessfully !!!",
                    showConfirmButton: true,
                });
            });
    };

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

    if (!income) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="visiting_card">
                <div>
                    <div>
                        <div style={{ color: "#1976d2" }}>
                            <h4 style={{ textAlign: "center" }}>
                                INCOME DETAIL
                            </h4>
                            <hr></hr>
                        </div>

                        <div className="each_row_info">
                            <label className="span_title">ID: </label>{" "}
                            <span className="span_info">{income.id}</span>
                        </div>

                        <div className="each_row_info">
                            <label className="span_title">Title: </label>
                            <label className="span_info">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={tempIncome.title}
                                        onChange={(e) =>
                                            setTempIncome({
                                                ...tempIncome,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    income.title
                                )}
                            </label>
                        </div>

                        <div className="each_row_info">
                            <label className="span_title">Description: </label>
                            <label className="span_info">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={tempIncome.description}
                                        onChange={(e) =>
                                            setTempIncome({
                                                ...tempIncome,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    income.description
                                )}
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

                        <div className="amount_billCode">
                            <div>
                                <label className="span_title">Amount: </label>
                                <label className="span_info">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.amount}
                                            onChange={(e) => {
                                                const numericInput =
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                setTempIncome({
                                                    ...tempIncome,
                                                    amount: numericInput,
                                                });
                                            }}
                                        />
                                    ) : (
                                        income.amount
                                    )}
                                </label>
                            </div>
                            <div
                                className="billCode"
                                style={{ marginLeft: "30px" }}
                            >
                                <label className="bill_title">Bill Code:</label>
                                <label className="span_info">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.billCode}
                                            maxLength={10}
                                            onChange={(e) =>
                                                setTempIncome({
                                                    ...tempIncome,
                                                    billCode: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        income.billCode
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="finance_status">
                            <label>
                                {getStatusLabel(income.financeStatus)}
                            </label>
                        </div>

                        <div className="visiting_card_button">
                            <div>
                                {/* Submit button */}
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleSubmit}
                                    >
                                        <i></i> Update
                                    </Button>
                                )}
                            </div>

                            <Button
                                variant="contained"
                                color={isEditing ? "error" : "success"}
                                onClick={toggleEditing}
                                style={{
                                    display:
                                        income.financeStatus === 0
                                            ? "block"
                                            : "none",
                                }}
                            >
                                {income.financeStatus === 0 && <i></i>}
                                {income.financeStatus === 0 &&
                                    (isEditing ? "Cancel" : "Update")}
                            </Button>

                            <div>
                                {income.financeStatus === 0 && (
                                    <Button
                                        onClick={IncomeSend}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Send
                                    </Button>
                                )}
                            </div>

                            {!isEditing && (
                                <Link to="/financial-manager/finance-list">
                                    <Button variant="outlined">Back</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomeDetail;
