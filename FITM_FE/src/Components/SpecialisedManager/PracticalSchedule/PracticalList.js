import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaginationTable from "../../Member/Table/PaginationTable/PaginationTable";
import {
    fetchPracticals,
    selectAllPracticals,
} from "../../../Variable/Redux/Slice/scheduleSlice";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import moment from "moment/moment";

function PracticalList() {
    let index = 0;

    const dispatch = useDispatch();
    const schedules = useSelector(selectAllPracticals);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPracticals());
    }, [dispatch]);

    function createData(id, title, room, date, startTime, endTime) {
        index++;
        return {
            index,
            id,
            title,
            room,
            date: moment(date).format("DD-MM-YYYY"),
            startTime: startTime.replace(/:\d{2}$/, ""),
            endTime: endTime.replace(/:\d{2}$/, ""),
            attendance: (
                <Button variant="contained" onClick={() => handleClick(id)}>
                    Attendance
                </Button>
            ),
        };
    }

    const columns = [
        { id: "index", label: "#" },
        { id: "title", label: "Title" },
        { id: "room", label: "Room" },
        { id: "date", label: "Date" },
        { id: "startTime", label: "Start Time" },
        { id: "endTime", label: "End Time" },
        { id: "attendance", label: "Attendance" },
    ];

    const rows = schedules.map((row) => {
        return createData(
            row.id,
            row.title,
            row.room,
            row.date,
            row.startTime,
            row.endTime
        );
    });

    function handleClick(id) {
        navigate("./attendancePractical", {
            state: {
                scheduleId: id,
            },
        });
    }

    return (
        <>
            <Paper sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
                <PaginationTable rows={rows} columns={columns} />
            </Paper>
        </>
    );
}

export default PracticalList;
