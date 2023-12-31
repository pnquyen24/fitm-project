import React, { useState, useEffect } from "react";
import axiosClient from "../../../Variable/Api/api";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import "./BalanceChart.css";
import { FormControl, Select, MenuItem } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

function BalanceChart() {
  const GET_ACCEPTED_INCOME_BY_TIME_URL = "Finance/GetAcceptedIncomeByTime";
  const GET_ACCEPTED_OUTCOME_BY_TIME_URL = "Finance/GetAcceptedOutcomeByTime";
  const GET_BALANCE_BY_DATE_URL = "Finance/GetBalanceByDate";

  const today = new Date();
  today.setDate(today.getDate() - 30);
  const [Data, setData] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState(today);
  const [tempEndDate, setTempEndDate] = useState(new Date());
  let [dataCategory, setDataCategory] = useState("Balance");
  const navigate = useNavigate();

  const handleDataCategoryChange = (event) => {
    setDataCategory(event.target.value);
    dataCategory = event.target.value;
    if (event.target.value === "Income") getIncome();
    else if (event.target.value === "Outcome") getOutcome();
    else if (event.target.value === "Balance") getBalance();
  };

  function getIncome() {
    axiosClient
      .get(GET_ACCEPTED_INCOME_BY_TIME_URL, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          CustomeAlert.error("Data is null");
          window.location.reload();
        } else setData(response.data);
      })
      .catch((error) => {
        CustomeAlert.error("Data is null");
      });
  }
  function getOutcome() {
    axiosClient
      .get(GET_ACCEPTED_OUTCOME_BY_TIME_URL, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          CustomeAlert.error("Data is null");
          window.location.reload();
        } else setData(response.data);
      })
      .catch((error) => {
        CustomeAlert.error("Data is null");
      });
  }
  function getBalance() {
    axiosClient
      .get(GET_BALANCE_BY_DATE_URL, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        CustomeAlert.error("Data is null");
      });
  }

  useEffect(() => {
    if (dataCategory === "Income") {
      getIncome();
    } else if (dataCategory === "Outcome") {
      getOutcome();
    } else if (dataCategory === "Balance") {
      getBalance();
    }
  }, [startDate, endDate]);

  const handleDownloadBalance = () => {
    if (Data.length !== 0) {
      const ws = XLSX.utils.json_to_sheet(Data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "balance_data");
      XLSX.writeFile(wb, "balance_data.xlsx");
    } else {
      CustomeAlert.error("Data is null");
    }
  };

  let responsiveWidth = 0.8 * window.innerWidth;
  let responsiveHeight = 0.8 * window.innerHeight;

  function isValidDate(dateString) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) {
      return false;
    }
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  }

  function applyDate(tempStart, tempEnd) {
    const maxEndDate = new Date(tempStart);
    maxEndDate.setDate(maxEndDate.getDate() + 31); // Tính toán ngày kết thúc tối đa

    if (tempStart >= tempEnd) {
      CustomeAlert.warning(
        `Not valid date: startDate cannot be later or equal to endDate`
      );
      setTempStartDate(startDate);
      setTempEndDate(endDate);
      return;
    }
    if (tempEnd > maxEndDate) {
      CustomeAlert.warning(`Not valid date: Out of range (1 month)`);
      setTempStartDate(tempStart);
      setTempEndDate(maxEndDate);
      return;
    }

    setStartDate(tempStart);
    setEndDate(tempEnd);

    if (dataCategory === "Income") getIncome();
    else if (dataCategory === "Outcome") getOutcome();
    else if (dataCategory === "Balance") getBalance();
  }

  const seriesOptions = {
    Income: {
      label: "Income (K)",
      lineColor: "green",
      color: "green",
    },
    Outcome: {
      label: "Outcome (K)",
      lineColor: "red",
      color: "red",
    },
    Balance: {
      label: "Balance (K)",
      lineColor: "orange",
      color: "orange",
    },
  };
  const selectedSeries =
    dataCategory != null
      ? seriesOptions[dataCategory]
      : seriesOptions["Balance"];
  return (
    <div className="balance-container">
      <div className="balance-buttons-container">
        <label>Start Date:</label>
        <input
          type="date"
          value={tempStartDate.toISOString().split("T")[0]}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (isValidDate(inputValue)) {
              setTempStartDate(new Date(inputValue));
            } else {
              CustomeAlert.warning("Not a valid date");
            }
          }}
        />
        <label>End Date:</label>
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={tempEndDate.toISOString().split("T")[0]}
          onChange={(e) => {
            const inputValue = e.target.value;
            const maxDate = new Date().toISOString().split("T")[0];
            if (isValidDate(inputValue) && inputValue <= maxDate) {
              setTempEndDate(new Date(inputValue));
            } else {
              CustomeAlert.warning("Not a valid date (or later than today)");
            }
          }}
        />
        <Button
          className="mx-2"
          onClick={() => applyDate(tempStartDate, tempEndDate)}
          variant="contained"
          color="info"
        >
          Apply
        </Button>
        <Button
          className="mx-2"
          onClick={handleDownloadBalance}
          variant="contained"
          color="success"
        >
          Download As Excel
        </Button>
        <Link
          to={{
            pathname: "/financial-manager/balance-chart-details",
            search: `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
          }}
        >
          <Button
            color="warning"
            variant="contained"
            className="mx-2"
          >
            <span>Detail</span>
          </Button>
        </Link>
        <Link to="/financial-manager/finance-list">
          <Button
            color="secondary"
            variant="contained"
            className="mx-2"
          >
            <span>Back</span>
          </Button>
        </Link>
        <FormControl size="small">
          <Select value={dataCategory} onChange={handleDataCategoryChange}>
            <MenuItem value="Balance">Balance</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Outcome">Outcome</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="finance-chart">
        <div className="chart-container">
          {Data ? (
            <LineChart
              width={responsiveWidth}
              height={responsiveHeight}
              series={[
                {
                  data: Data.map((entry) => entry.balance / 1000),
                  label: selectedSeries.label,
                  lineColor: selectedSeries.lineColor,
                  color: selectedSeries.color,
                },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: Data.map((entry, index) =>
                    new Date(entry.modifiedTime).toLocaleDateString(undefined, {
                      month: "2-digit",
                      day: "2-digit",
                    })
                  ),
                },
              ]}
            />
          ) : (
            <div className="balance-waiting">
              <h3>Loading</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceChart;
