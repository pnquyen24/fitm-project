import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchList,
    getAttendancePractical,
    setAttendance,
    updateList,
} from "../../../Variable/Redux/Slice/attendancePracticalSlice";
import {
    Button,
    Card,
    CardHeader,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import BasicTable from "../../Member/Table/BasicTable/BasicTable";
import CustomeFCLabel from "../../Member/Label/CustomeFCLabel";
import { Link as RouterLink } from "react-router-dom";

function AttendancePractical() {
    document.title = "Attendance Practical";

    const dispatch = useDispatch();
    const attendanceList = useSelector(getAttendancePractical);

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

    const rows = attendanceList.map((row) => {
        return createData(row.id, row.studentId, row.fullName, row.attendance);
    });

    function handleChange(e, id) {
        const attendance = e.target.value === "true" ? 2 : 1;
        dispatch(setAttendance({ id, attendance }));
    }

    function createData(id, studentId, fullName, attendance) {
        index++;
        attendance = attendance === 2 ? "true" : "false";
        return {
            index,
            id,
            studentId,
            fullName,
            attendance: (
                <>
                    <RadioGroup
                        row
                        onChange={(e) => handleChange(e, id)}
                        value={attendance}
                    >
                        <CustomeFCLabel
                            value="false"
                            label="Absent"
                            control={<Radio />}
                        />
                        <CustomeFCLabel
                            value="true"
                            label="Present"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </>
            ),
        };
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(updateList(attendanceList));
        } catch {
            CustomeAlert.error("Something error");
        }
        CustomeAlert.success("Success");
    }

    return (
        <Card sx={{ width: "96%", marginTop: "2%", overflow: "hidden" }}>
            <form action="">
                <CardHeader
                    title={
                        <Typography component={"span"} variant="subtitle1">
                            Attendance Table
                        </Typography>
                    }
                    action={
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="../practical"
                            >
                                Back
                            </Button>
                        </Stack>
                    }
                />
                <BasicTable columns={columns} rows={rows} />
            </form>
        </Card>
    );
}

export default AttendancePractical;
