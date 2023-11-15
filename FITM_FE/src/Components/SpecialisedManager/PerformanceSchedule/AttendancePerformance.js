import AttendanceTable from "../../Member/Table/AttendanceTable/AttendanceTable";
import { Button, Card, CardActions, CardHeader, Typography } from "@mui/material";
import axiosClient from "../../../Variable/Api/api";
import { useLocation } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import { useNavigate } from "react-router-dom";

function AttendancePerformance() {
    document.title = "Attendance Performance";

    const ATTENDANCE_PERFORMANCE_URL =
        "PerformanceSchedule/AttendancePerformance";

    const location = useLocation();
    const navigate = useNavigate();

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

        axiosClient
            .put(ATTENDANCE_PERFORMANCE_URL, dataToUpdate)
            .then((response) => CustomeAlert.success("Saved successfully!"))
            .catch(() => {
                CustomeAlert.error("Save failed!");
            });
    }

    function handleBack(){
        navigate("/performance")
    }

    return (
        <Card sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
            <CardHeader
                title={
                    <Typography variant="body1">
                        Attendance Performance
                    </Typography>
                }
                action={
                    <CardActions>
                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleBack}>
                            Back
                        </Button>
                    </CardActions>
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
