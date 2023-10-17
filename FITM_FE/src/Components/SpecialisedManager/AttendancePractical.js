import { useEffect } from "react";
import { Paper, Radio, RadioGroup } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomeFCLabel from "../Member/Label/CustomeFCLabel";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchList,
    getAttendanceError,
    getAttendanceStatus,
    selectAllAttendance,
    updateList,
} from "../../Variable/Redux/Slice/attendanceSlice";
import CustomeLoadingButton from "../Member/Button/CustomeLoadingButton";

function AttendancePractical({ scheduleId }) {
    const dispatch = useDispatch();
    const data = useSelector(selectAllAttendance);
    const status = useSelector(getAttendanceStatus);
    // const error = useSelector(getAttendanceError);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchList(16));
        }
    }, [scheduleId, status, dispatch]);

    const columns = [
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
        attendance = attendance ? "true" : "false";
        return { id, studentId, fullName, attendance };
    }

    function handleSubmit(e) {
        e.preventDefault();
        // dispatch(updateList());
    }

    return (
        <Paper sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
            <form action="" onSubmit={handleSubmit}>
                <TableContainer>
                    <Table>
                        {/*stickyHeader*/}
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "attendance") {
                                                return (
                                                    <TableCell key={row.id}>
                                                        <RadioGroup
                                                            row
                                                            defaultValue={
                                                                row.attendance
                                                            }
                                                        >
                                                            <CustomeFCLabel
                                                                value="false"
                                                                label="Absent"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                            <CustomeFCLabel
                                                                value="true"
                                                                label="Present"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                        </RadioGroup>
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell key={column.id}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <CustomeLoadingButton type="submit">Save</CustomeLoadingButton>
            </form>
        </Paper>
    );
}

export default AttendancePractical;
