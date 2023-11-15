import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInstruments,
    getInstruments,
    toggleModalInstrument,
} from "../../../Variable/Redux/Slice/instrumentSlice";
import {
    Button,
    Card,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import ModalInstrument from "./ModalInstrument";
import CollapsibleTable from "./CollapsibleTable";
import { Edit } from "@mui/icons-material";

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
    ];

    const rows = instruments.map((row) => {
        return createData(row.id, row.name, row.count, row.itemIds);
    });

    function createData(id, name, count, itemIds) {
        index++;
        const items = itemIds.map((item) => {
            return {
                ...item,
                action: (
                    <IconButton
                        onClick={() => handleUpdate(item.id, item.status)}
                    >
                        <Edit color="primary" />
                    </IconButton>
                ),
            };
        });
        return {
            index,
            id,
            name,
            count,
            items,
        };
    }

    function handleCreate() {
        setIsEdit(false);
        dispatch(toggleModalInstrument(true));
    }

    function handleUpdate(id, status) {
        setInstrumentInfo({ id, status });
        setIsEdit(true);
        dispatch(toggleModalInstrument(true));
    }

    return (
        <>
            <ModalInstrument instrumentInfo={instrumentInfo} isEdit={isEdit} />
            <Card sx={{ width: "96%", marginTop: "2%", overflow: "hidden" }}>
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
                <CollapsibleTable rows={rows} columns={columns} />
            </Card>
        </>
    );
}

export default Instrument;
