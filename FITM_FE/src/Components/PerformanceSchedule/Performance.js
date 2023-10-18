import PerformanceItem from "./PerformanceItem";
import {
    Grid,
    Stack,
    Pagination,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import "./Performance.css"
import axios from "axios";
import React, { useEffect, useState } from "react";

function Performance() {
    let [performances, setPerformances] = useState([]);

    useEffect(() => {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "token"
        )}`;
        axios
            .get("https://localhost:7226/apis/PerformanceSchedule/ViewPerformance")
            .then((response) => {
                setPerformances(response.data);
            })
            .catch((error) => { });
    }, []);

    const imageDefault ="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/340660349_784571749933806_5653287607927274901_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hp791ODD-TIAX8qJiOS&_nc_ht=scontent.fsgn2-4.fna&_nc_e2o=f&oh=00_AfC1piZ6ns0oYsrJ1roMl8_ZJHA2CZm70szVAAYyVU3Jhw&oe=6533C4F1";
    
    const Img = styled('img')({
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <div className="pfm-container">
            <Grid container justifyContent="center" spacing={3}>
                {performances.map((performance, index) => (
                    <PerformanceItem
                        key={index}
                        ID = {performance.id}
                        Image={performance.backgroundImg == "" ? imageDefault : performance.backgroundImg}
                        Place={performance.place}
                        Name={performance.name}
                        Date={performance.date}
                        Time={performance.time}
                    ></PerformanceItem>
                ))}
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-end">
                <Stack spacing={2} style={{ marginTop: '20px' }} >
                    <Pagination count={10} shape="rounded" color="primary" />
                </Stack>
            </Grid>
        </div>
    );
}



export default Performance;
