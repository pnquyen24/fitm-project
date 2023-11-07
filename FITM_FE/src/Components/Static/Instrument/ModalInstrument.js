import { useDispatch, useSelector } from "react-redux";
import {
    getIsModalInstrumentOpen,
    toggleModalInstrument,
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

    function handleSubmit() {}

    function handleClose() {
        dispatch(toggleModalInstrument(false));
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
                        <Grid item xs={12}>
                            <Stack>
                                <InputLabel>Full Name</InputLabel>
                                <CustomeTextField
                                    name="title"
                                    placeholder="Full Name"
                                    size="small"
                                    type="text"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack>
                                <InputLabel>Short Name</InputLabel>
                                <CustomeTextField
                                    name="title"
                                    placeholder="Short Name"
                                    size="small"
                                    type="text"
                                />
                            </Stack>
                        </Grid>
                        {isEdit ? (
                            <Grid item xs={12}>
                                <InputLabel>Status</InputLabel>
                                <RadioGroup defaultChecked="new" row>
                                    <CustomeFCLabel
                                        value="new"
                                        control={<Radio />}
                                        label="New"
                                    />
                                    <CustomeFCLabel
                                        value="broken"
                                        control={<Radio />}
                                        label="Broken"
                                    />
                                    <CustomeFCLabel
                                        value="fixed"
                                        control={<Radio />}
                                        label="Fixed"
                                    />
                                </RadioGroup>
                            </Grid>
                        ) : (
                            ""
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
