import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import {getStatusStyle} from "../SupportFunctions/SupportFunction";
import Swal from "sweetalert2";

function OutcomeRequestDetail() {
  const [outcome, setOutcome] = useState(null);
  const isEditing = useState(false);
  const [tempOutcome, setTempOutcome] = useState(null);
  const error = useState(null);
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
    axios
      .post(
        `https://localhost:7226/apis/Finance/AcceptOutcomeRequest?id=${outcomeId}`
      )
      .then((response) => {
        Swal.fire({
          title: "Finance Report Accepted !!!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/financial-manager/finance-request-list";
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
    axios
      .post(
        `https://localhost:7226/apis/Finance/DenyOutcomeRequest?id=${outcomeId}`
      )
      .then((response) => {
        Swal.fire({
          title: "Finance Report Denied !!!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/financial-manager/finance-request-list";
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
              <div>
                <h4>Outcome Detail</h4>
              </div>

              <div className="id_title">
                <div className="each_row_info">
                  <label className="span_title">ID: </label>{" "}
                  <span className="span_info">{outcome.id}</span>
                </div>

                <div>
                  <div>
                    <label className="title">Title: </label>
                    <lable className="span_info">
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempOutcome.title}
                          onChange={(e) =>
                            setTempOutcome({
                              ...tempOutcome,
                              title: e.target.value,
                            })
                          }
                        />
                      ) : (
                        outcome.title
                      )}
                    </lable>
                  </div>
                </div>
              </div>

              <div className="each_row_info">
                <label className="span_title">Description: </label>
                <lable className="span_info">
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
                </lable>
              </div>

              <div>
                <div className="each_row_info">
                  <label className="span_title">Created Time: </label>
                  <label className="span_info">
                    {formatDate(outcome.createdTime)}
                  </label>{" "}
                  <br></br>
                </div>

                <div className="each_row_info">
                  <label className="span_title">Modified Time: </label>
                  <label className="span_info">
                    {formatDate(outcome.modifiedTime)}
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
                <div className="billCode">
                  <label className="bill_title">Bill Code: </label>
                  <label className="span_info">
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
                <label style={getStatusStyle(outcome.financeStatus)}>
                  {getStatusLabel(outcome.financeStatus)}
                </label>
              </div>

              <div className="in_request_card_button">
                {!isEditing && (
                  <Link to="/financial-manager/finance-request-list">
                    <button className="detail_back">
                      <span>Back to List</span>
                    </button>
                  </Link>
                )}
                <div>
                  {outcome.financeStatus === 1 ? (
                    <div>
                      <button
                        onClick={() => {
                          AcceptOutcomeRequest();
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          DenyOutcomeRequest();
                        }}
                      >
                        Deny
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
}

export default OutcomeRequestDetail;
