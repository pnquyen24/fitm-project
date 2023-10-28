import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchList,
    getAttendancePractical,
    updateList,
} from "../../../Variable/Redux/Slice/attendancePracticalSlice";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import AttendanceTable from "../../Member/Table/AttendanceTable/AttendanceTable";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../Member/Breadcrumb/Breadcrumb";

function AttendancePractical() {
    const dispatch = useDispatch();
    const data = useSelector(getAttendancePractical);

    const location = useLocation();

    let index = 0;
    let scheduleId = location.state?.scheduleId;

    useEffect(() => {
        dispatch(fetchList(scheduleId));
    }, [dispatch, scheduleId]);

    const columns = [
        { id: "index", label: "#" },
        { id: "studentId", label: "Student ID" },
        { id: "fullName", label: "Full Name" },
        {
            id: "attendance",
            label: "Attendance",
        },
    ];

    const rows = data.map((row) => {
        return createData(row.id, row.studentId, row.fullName, row.attendance);
    });

    function createData(id, studentId, fullName, attendance) {
        index++;
        attendance = attendance === 2 ? "true" : "false";
        return { index, id, studentId, fullName, attendance };
    }

    function handleChange(e, index) {
        rows[index - 1].attendance = e.target.value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dataToUpdate = rows.map((row) => {
            return {
                id: row.id,
                attendance: row.attendance === "true" ? 2 : 1,
            };
        });
        try {
            dispatch(updateList(dataToUpdate));
        } catch {
            CustomeAlert.error("Something error");
        }
        CustomeAlert.success("Success");
    }

    return (
        <Card sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
            <Breadcrumb />
            <CardHeader
                title={
                    <Typography component={"span"} variant="subtitle1">
                        Attendance Table
                    </Typography>
                }
                action={
                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>
                }
            />

            <AttendanceTable
                columns={columns}
                rows={rows}
                handleChange={handleChange}
            />
        </Card>
    );
}

export default AttendancePractical;
