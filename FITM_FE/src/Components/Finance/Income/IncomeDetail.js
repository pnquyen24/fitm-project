import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import {getStatusStyle} from "../SupportFunctions/SupportFunction";
import "./IncomeDetail.css";

function IncomeDetail() {
  document.title = "Income Datail ";

  const [income, setIncome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempIncome, setTempIncome] = useState(null);
  const error= useState(null);
  const location = useLocation();
  const incomeId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    axios
      .get(`https://localhost:7226/apis/Finance/GetIncome?id=` + incomeId)
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
    axios
      .post(
        `https://localhost:7226/apis/Finance/ChangeIncomeStatus?id=${incomeId}`
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

  const handleSubmit = () => {
    const updateData = {
      id: incomeId,
      title: tempIncome.title,
      description: tempIncome.description,
      amount: tempIncome.amount,
      billCode: tempIncome.billCode,
    };

    axios
      .put(
        "https://localhost:7226/apis/Finance/UpdateIncome?id=" + incomeId,
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
            <div>
              <h4>Income Detail</h4>
            </div>

            <div className="each_row_info">
              <label className="span_title">ID: </label>{" "}
              <span className="span_info">{income.id}</span>
            </div>

            <div className="each_row_info">
              <label className="span_title">Title: </label>
              <lable className="span_info">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempIncome.title}
                    onChange={(e) =>
                      setTempIncome({ ...tempIncome, title: e.target.value })
                    }
                  />
                ) : (
                  income.title
                )}
              </lable>
            </div>

            <div className="each_row_info">
              <label className="span_title">Description: </label>
              <lable className="span_info">
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
              </lable>
            </div>

            <div>
              <div className="each_row_info">
                <label className="span_title">Created Time: </label>
                <label className="span_info">
                  {formatDate(income.createdTime)}
                </label>{" "}
                <br></br>
              </div>

              <div className="each_row_info">
                <label className="span_title">Modified Time: </label>
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
                        const numericInput = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setTempIncome({ ...tempIncome, amount: numericInput });
                      }}
                    />
                  ) : (
                    income.amount
                  )}
                </label>
              </div>
              <div className="billCode">
                <label className="bill_title">Bill Code: </label>
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
              <label style={getStatusStyle(income.financeStatus)}>
                {getStatusLabel(income.financeStatus)}
              </label>
            </div>

            <div className="visiting_card_button">
              <div>
                {/* Submit button */}
                {isEditing && (
                  <button onClick={handleSubmit}>
                    <i></i> Update
                  </button>
                )}
              </div>

              <button
                onClick={toggleEditing}
                style={{
                  display: income.financeStatus === 0 ? "block" : "none",
                }}
              >
                {income.financeStatus === 0 && <i></i>}
                {income.financeStatus === 0 &&
                  (isEditing ? "Cancel" : "Update")}
              </button>

              {!isEditing && (
                <Link to="/financial-manager/finance-list">
                  <button className="detail_back">
                    <span>Back to List</span>
                  </button>
                </Link>
              )}

              <div className="detail_send">
                {income.financeStatus === 0 && (
                  <button onClick={IncomeSend}>Send</button>
                )}
              </div>
            </div>
          </div>
        </div>
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
}

export default IncomeDetail;
