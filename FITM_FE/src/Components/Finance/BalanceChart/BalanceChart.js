import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import Button from "@mui/material/Button";
import * as XLSX from 'xlsx';
import "./BalanceChart.css"
import { FormControl, Select, MenuItem } from '@mui/material';
import { LineChart } from "@mui/x-charts/LineChart";

function BalanceChart() {
    const [Data, setData] = useState(null);
    const [startDate, setStartDate] = useState(new Date("2023-10-01"));
    const [endDate, setEndDate] = useState(new Date("2023-10-31"));
    const [tempStartDate, setTempStartDate] = useState(new Date("2023-10-01"));
    const [tempEndDate, setTempEndDate] = useState(new Date("2023-10-31"));
    let [dataCategory, setDataCategory] = useState('Balance');

    const handleDataCategoryChange = (event) => {
        setDataCategory(event.target.value);
        dataCategory = event.target.value;
        if (event.target.value === "Income") getIncome(); 
        else if (event.target.value === "Outcome") getOutcome();
        else if (event.target.value === "Balance") getBalance();
    };

    function getIncome() {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("https://localhost:7226/apis/Finance/GetAcceptedIncomeByTime", {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function getOutcome() {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("https://localhost:7226/apis/Finance/GetAcceptedOutcomeByTime", {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function getBalance() {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("https://localhost:7226/apis/Finance/GetBalanceByDate", {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
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
          XLSX.utils.book_append_sheet(wb, ws, 'balance_data');
          XLSX.writeFile(wb, 'balance_data.xlsx');
          // Tiếp tục xử lý dữ liệu
        } else {
          alert("Data is null");
       }
      };


    function isValidDate(dateString) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dateString)) {
            return false;
        }
        const dateObject = new Date(dateString);
        return !isNaN(dateObject.getTime());
    }

    function apllyDate(tempStart, tempEnd) {
        if (tempStart >= tempEnd) {
            CustomeAlert.warning(`Not valid date: startDate cannot later or equal than endDate`);
            setTempStartDate(startDate);
            setEndDate(endDate);
            return;
        }
        setStartDate(tempStart);
        setEndDate(tempEnd);
        if (dataCategory=== "Income") getIncome(); 
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
    const selectedSeries = dataCategory != null ? seriesOptions[dataCategory] : seriesOptions["Balance"];
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
                        value={tempEndDate.toISOString().split("T")[0]}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (isValidDate(inputValue)) {
                                setTempEndDate(new Date(inputValue));
                            } else {
                                CustomeAlert.warning("Not a valid date");
                            }
                        }}
                    />
                <Button style={{marginLeft:"10px"}} className="balance-apply-button" ex={{}} onClick={() => apllyDate(tempStartDate, tempEndDate)} variant="contained"  color="info">Apply</Button>
                <Button style={{marginLeft : "20px",fontSize:"12px",height:"70%"}} ex={{}} onClick={handleDownloadBalance} variant="contained" color="success" >Download As Excel</Button>
                <div className="balance-select-button" rx={{}}>
                    <FormControl variant="outlined" className="select-button" rx={{}}>
                        <Select value={dataCategory} onChange={handleDataCategoryChange}>
                            <MenuItem value="Balance">Balance</MenuItem>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Outcome">Outcome</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="chart-container">
            {Data? (
                <LineChart
                    width={1200}
                    height={670}
                    series={[
                        {
                            data: Data.map((entry) => entry.balance / 1000),
                            label: selectedSeries.label,
                            lineColor: selectedSeries.lineColor,
                            color: selectedSeries.color,
                        }
                    ]}
                    xAxis={[
                        {
                            scaleType: "point",
                            data: Data.map((entry,index) =>
                                new Date(entry.modifiedTime).toLocaleDateString(undefined, {
                                    month: "2-digit",
                                    day: "2-digit"
                                })),
                            tickSize: 2
                        },
                    ]}
                />
            ) : (
                <div className="balance-waiting">
                    <h3>Loading.....</h3>
                </div>
            )}
            </div>
        </div>
    );
}

export default BalanceChart;
