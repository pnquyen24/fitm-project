import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import Swal from "sweetalert2";
import "./OutcomeDetail.css";
import Button from "@mui/material/Button";
import axios from "axios";

function OutcomeDetail() {
  document.title = "OutCome Detail";
  const [outcome, setOutcome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempOutcome, setTempOutcome] = useState(null);

  const location = useLocation();
  const outcomeId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      axios
        .get(`https://localhost:7226/apis/Finance/GetOutcome?id=` + outcomeId)
      .then((response) => {
        setOutcome(response.data);
      })
      .catch((error) => {});
  }, [outcomeId]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempOutcome(outcome);
    }
  };

  //============================================================
  const OutcomeSend = () => {
    axios
      .post(
        `https://localhost:7226/apis/Finance/ChangeOutcomeStatus?id=${outcomeId}`
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Send Request Successfully !!!",
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "/financial-manager/finance-list";
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

  const handleSubmit = () => {
    const updateData = {
      id: outcomeId,
      title: tempOutcome.title,
      description: tempOutcome.description,
      amount: tempOutcome.amount,
      billCode: tempOutcome.billCode,
    };

    axios
      .put(
        "https://localhost:7226/apis/Finance/UpdateOutcome?id=" + outcomeId,
        updateData
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Update Successfully !!!",
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "/financial-manager/finance-list";
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

  if (!outcome) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="visiting_card">
        <div>
          <div>
            <div style={{ color: "#1976d2" }}>
              <h4 style={{ textAlign: "center" }}>OUTCOME DETAIL</h4>
              <hr></hr>
            </div>

            <div className="each_row_info">
              <label htmlFor="ID" className="span_title">
                ID:{" "}
              </label>{" "}
              <span className="span_info">{outcome.id}</span>
            </div>

            <div className="each_row_info">
              <label htmlFor="Title" className="span_title">
                Title:{" "}
              </label>
              <label htmlFor="Title" className="span_info">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempOutcome.title}
                    onChange={(e) =>
                      setTempOutcome({ ...tempOutcome, title: e.target.value })
                    }
                  />
                ) : (
                  outcome.title
                )}
              </label>
            </div>

            <div className="each_row_info">
              <label htmlFor="" className="span_title">
                Description:{" "}
              </label>
              <label htmlFor="" className="span_info">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempOutcome.description}
                    onChange={(e) =>
                      setTempOutcome({
                        ...tempOutcome,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  outcome.description
                )}
              </label>
            </div>

            <div>
              <div className="each_row_info">
                <label htmlFor="CreatedTime" className="span_title">
                  Created Time:{" "}
                </label>
                <label htmlFor="CreatedTime" className="span_info">
                  {formatDate(outcome.createdTime)}
                </label>{" "}
                <br></br>
              </div>

              <div className="each_row_info">
                <label htmlFor="ModifiedTime" className="span_title">
                  Modified Time:{" "}
                </label>
                <label htmlFor="ModifiedTime" className="span_info">
                  {formatDate(outcome.modifiedTime)}
                </label>
              </div>
            </div>

            <div className="amount_billCode">
              <div>
                <label htmlFor="Amount" className="span_title">
                  Amount:{" "}
                </label>
                <label htmlFor="Amount" className="span_info">
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempOutcome.amount}
                      onChange={(e) => {
                        const numericInput = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setTempOutcome({
                          ...tempOutcome,
                          amount: numericInput,
                        });
                      }}
                    />
                  ) : (
                    outcome.amount
                  )}
                </label>
              </div>
              <div className="billCode" style={{ marginLeft: "30px" }}>
                <label htmlFor="BillCode" className="bill_title">
                  Bill Code:{" "}
                </label>
                <label htmlFor="BillCode" className="span_info">
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempOutcome.billCode}
                      onChange={(e) =>
                        setTempOutcome({
                          ...tempOutcome,
                          billCode: e.target.value,
                        })
                      }
                    />
                  ) : (
                    outcome.billCode
                  )}
                </label>
              </div>
            </div>

            <div className="finance_status">
              <label htmlFor="Status">
                {getStatusLabel(outcome.financeStatus)}
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
                  display: outcome.financeStatus === 0 ? "block" : "none",
                }}
              >
                {outcome.financeStatus === 0 && <i></i>}
                {outcome.financeStatus === 0 &&
                  (isEditing ? "Cancel" : "Update")}
              </Button>

              <div>
                {outcome.financeStatus === 0 && (
                  <Button
                    onClick={OutcomeSend}
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

export default OutcomeDetail;
