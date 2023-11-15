import React, { useState } from "react";
import axiosClient from "../../../Variable/Api/api";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./CreateFinance.css";
import CustomeAlert from "../../Member/Alert/CustomeAlert";

function CreateIncome() {
  document.title = "Create Income";

  const ADD_INCOME_URL = "Finance/AddIncome";
  const ADD_OUTCOME_URL = "Finance/AddOutcome";
  const navigate = useNavigate();

  const location = useLocation();

  let outcome = location.state?.outcome;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: outcome || "",
    billCode: "",
    type: outcome ? "outcome" : "income",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl =
      formData.type === "income" ? ADD_INCOME_URL : ADD_OUTCOME_URL;

    if(formData.title === "") {CustomeAlert.error("Title is required"); return;}
    if(formData.amount < 10000) {CustomeAlert.error("Amount is less than 10k"); return;}

    axiosClient
      .post(apiUrl, formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Create Successfully !!!",
          showConfirmButton: true,
        }).then(() => {
          navigate("/financial-manager/finance-list");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Create Unsuccessfully !!!",
          showConfirmButton: true,
        });
      });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;

    // Validate if the entered value is a non-negative number
    if (name === "amount") {
      let newValue = Math.max(0, parseInt(value, 0));
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, type: value });
  };

  //====================================================================

  return (
    <div>
      <form onSubmit={handleSubmit} className="create_form">
        <div style={{ color: "#1976d2" }}>
          <h4 style={{ textAlign: "center" }}>CREATE FINANCE</h4>
          <hr></hr>
        </div>
        <div className="type_in">
          <label htmlFor="title" className="  finance_form_input">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Finance Title"
            onChange={handleChange}
            className="form_input"
            required
          />
          <br />

          <label htmlFor="description" className="finance_form_input">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            placeholder="Finance Description"
            onChange={handleChange}
            className="form_input"
          />
          <br />

          <div className="amount_bill">
            <label
              htmlFor="amount"
              className="finance_form_input"
              id="input_amount"
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={10000}
              value={formData.amount}
              placeholder="Finance Amount"
              onChange={handleChange}
              className="form_input"
              pattern="[0-9]"
              required
            />

            <label
              htmlFor="billCode"
              className="finance_form_input"
              id="input_billCode"
            >
              Bill Code:
            </label>
            <input
              type="text"
              id="billCode"
              name="billCode"
              value={formData.billCode}
              maxLength={10}
              placeholder="Max 10 digits"
              onChange={handleChange}
              className="form_input"
            />
          </div>
        </div>

        <div className="radio_in_out">
          <div className="radio_in">
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={formData.type === "income"}
              onChange={handleTypeChange}
            />
            <label htmlFor="income" className="radio_in_label">
              Income
            </label>
          </div>

          <div className="radio_out">
            <input
              type="radio"
              id="outcome"
              name="type"
              value="outcome"
              checked={formData.type === "outcome"}
              onChange={handleTypeChange}
            />
            <label htmlFor="outcome" className="radio_out_label">
              Outcome
            </label>
          </div>
        </div>
        <div className="finance_group_button">
          <Button onClick={handleSubmit} variant="contained">
            CREATE
          </Button>
          <Button variant="outlined">
            <Link
              to="/financial-manager/finance-list"
              style={{ textDecoration: "none" }}
            >
              BACK
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateIncome;
