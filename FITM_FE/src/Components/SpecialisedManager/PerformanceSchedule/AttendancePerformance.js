import AttendanceTable from "../../Member/Table/AttendanceTable/AttendanceTable";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";

function AttendancePerformance() {
    const location = useLocation();

    let members = location.state.data.members;
    let performanceId = location.state.data.performanceId;

    let index = 0;

    const columns = [
        { id: "index", label: "#" },
        { id: "studentId", label: "Student ID" },
        { id: "fullName", label: "Full Name" },
        {
            id: "attendance",
            label: "Attendance",
        },
    ];

    const rows = members?.map((member) => {
        return createData(
            member.id,
            member.studentID,
            member.fullName,
            member.attendance
        );
    });

    function createData(memberId, studentId, fullName, attendance) {
        index++;
        attendance = attendance === 2 ? "true" : "false";
        return { index, memberId, studentId, fullName, attendance };
    }

    function handleChange(e, index) {
        rows[index - 1].attendance = e.target.value;
    }

    const dataToUpdate = {
        performanceId,
    };

    function handleSubmit(e) {
        e.preventDefault();
        dataToUpdate.members = rows.map((row) => ({
            id: row.memberId,
            attendance: row.attendance === "true" ? 2 : 1,
        }));

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        axios
            .put(
                "https://localhost:7226/apis/PerformanceSchedule/AttendancePerformance",
                dataToUpdate,
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => CustomeAlert.success("Saved successfully!"))
            .catch(() => {
                CustomeAlert.error("Save failed!");
            });
    }

    return (
        <Card sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
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

export default AttendancePerformance;
