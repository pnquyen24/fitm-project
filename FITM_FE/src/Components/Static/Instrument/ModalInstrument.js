import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createInstruments,
    getIsModalInstrumentOpen,
    toggleModalInstrument,
    updateInstruments,
} from "../../../Variable/Redux/Slice/instrumentSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import CustomeTextField from "../../Member/Input/CustomeTextField";
import CustomeFCLabel from "../../Member/Label/CustomeFCLabel";

function ModalInstrument({ instrumentInfo, isEdit }) {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsModalInstrumentOpen);

    const intialValues = {
        id: null,
        name: "",
        shortName: "",
        status: 0,
    };

    const [formInstrument, setFormInstrument] = useState(intialValues);

    useEffect(() => {
        if (isEdit) {
            setFormInstrument({
                id: instrumentInfo?.id,
                status: instrumentInfo?.status,
            });
        }
    }, [instrumentInfo, isEdit]);

    function handleClose() {
        dispatch(toggleModalInstrument(false));
    }

    function resetAndCloseModal() {
        setFormInstrument({
            name: "",
            shortName: "",
        });
        handleClose();
    }

    const handleInput = (name, e) => {
        let value;
        switch (name) {
            case "status":
                value = parseInt(e.target.value);
                break;
            case "name":
            case "shortName":
                value = e.target.value;
                break;
            default:
                value = e.target.value;
                break;
        }
        setFormInstrument({
            ...formInstrument,
            [name]: value,
        });
    };

    function handleCreate() {
        const newInstrument = {
            shortName: formInstrument.shortName,
            name: formInstrument.name,
        };
        dispatch(createInstruments(newInstrument));
        resetAndCloseModal();
    }

    function handleUpdate() {
        const newInstrument = {
            id: formInstrument.id,
            status: formInstrument.status,
        };
        dispatch(updateInstruments(newInstrument));
        resetAndCloseModal();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            handleUpdate();
        } else {
            handleCreate();
        }
    }

    return (
        <>
            <Dialog
                id="instrument-dialog"
                open={isOpen}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        {isEdit ? (
                            <Grid item xs={12}>
                                <InputLabel>Status</InputLabel>
                                <RadioGroup
                                    name="status"
                                    value={String(formInstrument.status)}
                                    onChange={(e) => handleInput("status", e)}
                                    row
                                >
                                    <CustomeFCLabel
                                        value="0"
                                        control={<Radio />}
                                        label="New"
                                    />
                                    <CustomeFCLabel
                                        value="1"
                                        control={<Radio />}
                                        label="Broken"
                                    />
                                    <CustomeFCLabel
                                        value="2"
                                        control={<Radio />}
                                        label="Fixed"
                                    />
                                </RadioGroup>
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12}>
                                    <Stack>
                                        <InputLabel>Full Name</InputLabel>
                                        <CustomeTextField
                                            name="name"
                                            placeholder="Full Name"
                                            size="small"
                                            type="text"
                                            onChange={(e) =>
                                                handleInput("name", e)
                                            }
                                            value={formInstrument.name}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack>
                                        <InputLabel>Short Name</InputLabel>
                                        <CustomeTextField
                                            name="shortName"
                                            placeholder="Short Name"
                                            size="small"
                                            type="text"
                                            onChange={(e) =>
                                                handleInput("shortName", e)
                                            }
                                            value={formInstrument.shortName}
                                        />
                                    </Stack>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ paddingLeft: 3, paddingRight: 3 }}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            color="success"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            {isEdit ? "Update" : "Create"}
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Exit
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ModalInstrument;
