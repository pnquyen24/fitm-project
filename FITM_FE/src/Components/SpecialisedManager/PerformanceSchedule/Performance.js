import PerformanceItem from "./PerformanceItem";
import { Grid } from "@mui/material";
// import { styled } from "@mui/material/styles";
import "./Performance.css";
import axiosClient from "../../../Variable/Api/api";
import React, { useEffect, useState } from "react";

function Performance() {
    document.title = "Home";

    const VIEW_PERFORMANCE_URL = "PerformanceSchedule/ViewPerformance";

    let [performances, setPerformances] = useState([]);

    useEffect(() => {
        axiosClient
            .get(VIEW_PERFORMANCE_URL)
            .then((response) => {
                setPerformances(response.data);
            })
            .catch((error) => {});
    }, []);

    const imageDefault =
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // const Img = styled('img')({
    //     display: 'block',
    //     maxWidth: '100%',
    //     maxHeight: '100%',
    // });

    return (
        <div className="pfm-container">
            <Grid container justifyContent="center" spacing={3}>
                {performances.map((performance, index) => (
                    <PerformanceItem
                        key={index}
                        ID={performance.id}
                        Image={
                            performance.backgroundImg === ""
                                ? imageDefault
                                : performance.backgroundImg
                        }
                        Place={performance.place}
                        Name={performance.name}
                        Date={performance.date}
                        Time={performance.time}
                    ></PerformanceItem>
                ))}
            </Grid>
        </div>
    );
}
export default Performance;
