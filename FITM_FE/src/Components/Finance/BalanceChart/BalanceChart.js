import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import Button from "@mui/material/Button";
import { LineChart } from "@mui/x-charts/LineChart";

function BalanceChart() {
    const [balanceData, setBalanceData] = useState(null);
    const [startDate, setStartDate] = useState(new Date("2023-10-01"));
    const [endDate, setEndDate] = useState(new Date("2023-10-31"));
    const [tempStartDate,setTempStartDate] = useState(new Date("2023-10-01"));
    const [tempEndDate,setTempEndDate] = useState(new Date("2023-10-31"));

    function getData() {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("https://localhost:7226/apis/Finance/GetBalanceByDate", {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            })
            .then((response) => {
                setBalanceData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getData();
    }, [startDate, endDate]);

    function apllyDate(tempStart, tempEnd){
        if(tempStart >= tempEnd){
            CustomeAlert.error(`Not valid date: startDate cannot later or equal than endDate`);
            setTempStartDate(startDate);
            setEndDate(endDate);
            return;
        }
        setStartDate(tempStart);
        setEndDate(tempEnd);
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <div style={{ margin: "0px 10px 0px 10px" }}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={tempStartDate.toISOString().split("T")[0]}
                        onChange={(e) => setTempStartDate(new Date(e.target.value))}
                    />
                </div>
                <div  style={{ margin: "0px 20px 0px 10px" }}>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={tempEndDate.toISOString().split("T")[0]}
                        onChange={(e) => setTempEndDate(new Date(e.target.value))}
                    />
                </div>
                <Button style={{height : "70%",fontSize: "16px", padding: "0px"} } onClick={()=>apllyDate(tempStartDate,tempEndDate)} variant="outlined">Apply</Button>
            </div>
            {balanceData ? (
                <LineChart
                    width={1200}
                    height={670}
                    series={[
                        {
                            data: balanceData.map((entry) => entry.balance / 1000),
                            label: "Balance (in K)",
                            lineColor: "blue",
                        },
                    ]}
                    xAxis={[
                        {
                            scaleType: "point",
                            data: balanceData.map((entry) =>
                                new Date(entry.modifiedTime).toLocaleDateString(undefined, {
                                    month: "2-digit",
                                    day: "2-digit",
                                })
                            ),
                        },
                    ]}
                    tooltip={{
                        renderTooltip: ({ value }) => `${value}K`, // Format dữ liệu tooltip
                    }}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default BalanceChart;
