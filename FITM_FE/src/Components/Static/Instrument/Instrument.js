import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteInstruments,
    getAllInstruments,
    getInstruments,
    toggleModalInstrument,
} from "../../../Variable/Redux/Slice/instrumentSlice";
import {
    Button,
    Card,
    CardHeader,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import PaginationTable from "../../Member/Table/PaginationTable/PaginationTable";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import { Delete, Edit } from "@mui/icons-material";
import ModalInstrument from "./ModalInstrument";

function Instrument() {
    document.title = "Instrument";

    let index = 0;

    const dispatch = useDispatch();
    const instruments = useSelector(getInstruments);

    const [instrumentInfo, setInstrumentInfo] = useState();
    const [isEdit, setIsEdit] = useState();

    useEffect(() => {
        dispatch(getAllInstruments());
    }, [dispatch]);

    const columns = [
        { id: "index", label: "#" },
        { id: "name", label: "Name" },
        { id: "count", label: "Count" },
        { id: "items", label: "Item Ids" },
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
                    <IconButton onClick={handleUpdate(id)}>
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={handleDelete(id)}>
                        <Delete color="error" />
                    </IconButton>
                </Stack>
            ),
        };
    }

    function handleCreate() {
        setIsEdit(false);
        dispatch(toggleModalInstrument(true));
    }

    function handleUpdate(instrument) {
        setInstrumentInfo(instrument);
        setIsEdit(true);
        dispatch(toggleModalInstrument(true));
    }

    function handleDelete(instrumentId) {
        CustomeAlert.confirm("Are you sure delete it?", "Delete", "No").then(
            (result) => {
                if (result.isConfirmed) {
                    dispatch(deleteInstruments(instrumentId));
                }
            }
        );
    }

    return (
        <>
            <ModalInstrument instrumentInfo={instrumentInfo} isEdit={isEdit} />
            <Card sx={{ width: "96%", marginTop: 3, overflow: "hidden" }}>
                <CardHeader
                    title={
                        <Typography component={"span"} variant="subtitle1">
                            Instrument Table
                        </Typography>
                    }
                    action={
                        <Button variant="contained" onClick={handleCreate}>
                            Create
                        </Button>
                    }
                />
                <PaginationTable rows={rows} columns={columns} />
            </Card>
        </>
    );
}

export default Instrument;
