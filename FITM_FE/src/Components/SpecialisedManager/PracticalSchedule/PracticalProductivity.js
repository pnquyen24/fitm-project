import { useEffect, useState } from "react";
import PaginationTable from "../../Member/Table/PaginationTable/PaginationTable";
import { FormControl, MenuItem, Paper, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getPracticalProductivity,
    getProductivityList,
} from "../../../Variable/Redux/Slice/attendancePracticalSlice";

function PracticalProductivity() {
    let index = 0;

    const months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];
    const years = ["2023", "2024", "2025", "2026"];

    const dispatch = useDispatch();
    const list = useSelector(getPracticalProductivity);

    useEffect(() => {
        dispatch(getProductivityList());
    }, [dispatch]);

    function createData(studentId, fullName, totalPresentPractices) {
        index++;
        return {
            index,
            id: studentId,
            studentId,
            fullName,
            totalPresentPractices,
        };
    }

    const columns = [
        { id: "index", label: "#" },
        { id: "studentId", label: "Student ID" },
        { id: "fullName", label: "Full Name" },
        { id: "totalPresentPractices", label: "Total Present Practices" },
    ];

    const rows = list.map((row) => {
        return createData(
            row.studentId,
            row.fullName,
            row.totalPresentPractices
        );
    });

    return (
        <>
            <Paper sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
                <PaginationTable rows={rows} columns={columns} />
            </Paper>
        </>
    );
}

export default PracticalProductivity;
