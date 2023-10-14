import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
        if (event.target.value === "Income") { getIncome(); }
        if (event.target.value === "Outcome") getOutcome();
        if (event.target.value === "Balance") getBalance();
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
        getBalance();
        dataCategory = "Blance"; 
    }, [startDate, endDate]);

    function isValidDate(dateString) {
        // Kiểm tra định dạng ngày (YYYY-MM-DD)
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      
        if (!datePattern.test(dateString)) {
          return false;
        }
      
        // Tạo đối tượng Date từ chuỗi
        const dateObject = new Date(dateString);
      
        // Kiểm tra xem đối tượng Date có hợp lệ không
        // và nó không phải là 'Invalid Date'
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
        <div style={{backgroundColor : "rgb(240,248,255)"}}>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <div style={{ margin: "0px 10px 0px 10px" }}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={tempStartDate.toISOString().split("T")[0]}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (isValidDate(inputValue)) {
                              setTempStartDate(new Date(inputValue));
                            } else {
                              CustomeAlert.warning("Ngày không hợp lệ:", inputValue);
                            }
                          }}
                    />
                </div>
                <div style={{ margin: "0px 20px 0px 10px" }}>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={tempEndDate.toISOString().split("T")[0]}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (isValidDate(inputValue)) {
                              setTempEndDate(new Date(inputValue));
                            } else {
                              CustomeAlert.warning("Ngày không hợp lệ:", inputValue);
                            }
                          }}
                    />
                </div>
                <Button style={{ height: "70%", fontSize: "16px", padding: "0px" }} onClick={() => apllyDate(tempStartDate, tempEndDate)} variant="outlined">Apply</Button>
                <div style={{ float: "right", top: "80px", right: "7%", position: "absolute" }}>
                    <FormControl variant="outlined">
                        <Select
                            value={dataCategory}
                            onChange={handleDataCategoryChange}
                        >
                            <MenuItem value="Balance">Balance</MenuItem>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Outcome">Outcome</MenuItem>
                        </Select>
                    </FormControl>
                </div>

            </div>
            {Data ? (
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
                            data: Data.map((entry) =>
                                new Date(entry.modifiedTime).toLocaleDateString(undefined, {
                                    month: "2-digit",
                                    day: "2-digit",
                                })),
                            tickSize : 2
                        },
                    ]}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default BalanceChart;
