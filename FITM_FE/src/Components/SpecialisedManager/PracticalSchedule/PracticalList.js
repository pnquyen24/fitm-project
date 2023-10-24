import { useEffect } from "react";
import {
    fetchPracticals,
    selectAllPracticals,
} from "../../../Variable/Redux/Slice/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import PaginationTable from "../../Member/Table/PaginationTable/PaginationTable";
import moment from "moment/moment";

function PracticalList() {
    let index = 0;

    const dispatch = useDispatch();
    const schedules = useSelector(selectAllPracticals);

    useEffect(() => {
        dispatch(fetchPracticals());
    }, [dispatch]);

    function createData(id, title, room, startDate, endDate) {
        index++;
        const start = moment(startDate).format("DD/MM/YYYY HH:mm");
        const end = moment(endDate).format("DD/MM/YYYY HH:mm");
        return {
            index,
            id,
            title,
            room,
            startDate: start,
            endDate: end,
            attendance: id,
        };
    }

    const columns = [
        { id: "index", label: "#" },
        { id: "title", label: "Title" },
        { id: "room", label: "Room" },
        { id: "startDate", label: "Start Date" },
        { id: "endDate", label: "End Date" },
        { id: "attendance", label: "Attendance" },
    ];

    const rows = schedules.map((row) => {
        return createData(
            row.id,
            row.title,
            row.room,
            row.startDate,
            row.endDate
        );
    });

    return (
        <Paper sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
            <PaginationTable rows={rows} columns={columns} />
        </Paper>
    );
}

export default PracticalList;
