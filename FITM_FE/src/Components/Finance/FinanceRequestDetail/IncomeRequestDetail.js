import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import {getStatusStyle} from "../SupportFunctions/SupportFunction";
import Swal from "sweetalert2";
import "./IncomeRequestDetail.css";

function IncomeRequestDetail() {
  document.title = "Income Request Detail";

  const [income, setIncome] = useState(null);
  const isEditing= useState(false);
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
    axios
      .post(
        `https://localhost:7226/apis/Finance/AcceptIncomeRequest?id=${incomeId}`
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
  function DenyIncomeRequest() {
    axios
      .post(
        `https://localhost:7226/apis/Finance/DenyIncomeRequest?id=${incomeId}`
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
  if (!income) {
    return <div>Loading...</div>;
  }

  return (
    <div className="finance-card">
      <div>
        <div className="in_request_card">
          <div>
            <div>
              <div>
                <h4>Income Detail</h4>
              </div>
              <div className="id_title">
                <div className="each_row_info col-md-2">
                  <label className="span_title">ID: </label>{" "}
                  <span className="span_info">{income.id}</span>
                </div>

                <div>
                  <div className="col-md-12">
                    <label className="title">Title: </label>
                    <label className="span_info ">
                      <h5>{income.title}</h5>
                    </label>
                  </div>
                </div>
              </div>

              <div className="each_row_info">
                <label className="span_title">Description: </label>
                <label className="span_info">
                  <h5>{income.description}</h5>
                </label>
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
                    <h5>{income.amount}</h5>
                  </label>
                </div>
                <div className="billCode">
                  <label className="bill_title">Bill Code: </label>
                  <label className="span_info">
                    <h5>{income.billCode}</h5>
                  </label>
                </div>
              </div>

              <div className="finance_status">
                <label style={getStatusStyle(income.financeStatus)}>
                  {getStatusLabel(income.financeStatus)}
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
                  {income.financeStatus === 1 ? (
                    <div>
                      <button
                        onClick={() => {
                          AcceptIncomeRequest();
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          DenyIncomeRequest();
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
        </div>
      </div>
    </div>
  );
}

export default IncomeRequestDetail;
