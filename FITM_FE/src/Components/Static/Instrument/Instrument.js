import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInstruments,
    getInstruments,
} from "../../../Variable/Redux/Slice/instrumentSlice";
import { IconButton, Paper, Stack } from "@mui/material";
import PaginationTable from "../../Member/Table/PaginationTable/PaginationTable";
import { Delete, Edit } from "@mui/icons-material";

function Instrument() {
    document.title = "Instrument";

    let index = 0;

    const dispatch = useDispatch();
    const instruments = useSelector(getInstruments);

    useEffect(() => {
        dispatch(getAllInstruments());
    }, [dispatch]);

    const columns = [
        { id: "index", label: "#" },
        { id: "name", label: "Name" },
        { id: "count", label: "Count" },
        { id: "action", label: "Action" },
    ];

    const rows = instruments.map((row) => {
        return createData(row.id, row.name, row.count, row.action);
    });

    function createData(id, name, count) {
        index++;
        return {
            index,
            id,
            name,
            count,
            action: (
                <Stack direction="row" spacing={2}>
                    <IconButton>
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton>
                        <Delete color="error" />
                    </IconButton>
                </Stack>
            ),
        };
    }

    return (
        <>
            <Paper sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
                <PaginationTable rows={rows} columns={columns} />
            </Paper>
        </>
    );
}

export default Instrument;
