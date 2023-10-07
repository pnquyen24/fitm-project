import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    Stack,
} from "@mui/material";
import {
    createSchedule,
    deleteSchedule,
    getScheduleError,
    updateSchedule,
} from "./scheduleSlice";
import DateTimeInput from "../Member/Input/DateTimeInput";
import CustomeTextField from "../Member/Input/CustomeTextField";
import CustomeAlert from "../Member/Alert/CustomeAlert";

function ModalSchedule({ handleClose, open, eventInfos, isEditCard }) {
    const dispatch = useDispatch();
    const error = useSelector(getScheduleError);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [room, setRoom] = useState();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isEditCard) {
            setTitle(eventInfos?.event?.title);
            setDescription(eventInfos?.event?.extendedProps?.description);
            setStartDate(eventInfos?.event?.startStr);
            setEndDate(eventInfos?.event?.endStr);
            setRoom(eventInfos?.event?.extendedProps?.room);
        } else {
            setTitle("");
            setDescription("");
            setStartDate(eventInfos?.startStr);
            setEndDate(eventInfos?.endStr);
            setRoom();
        }
    }, [eventInfos, isEditCard]);

    function getEvent(title, description, startDate, endDate, room) {
        return {
            title,
            description,
            startDate,
            endDate,
            room,
        };
    }

    function resetAndCloseModal() {
        setTitle("");
        setDescription("");
        setRoom();
        handleClose();
    }

    const handleAddedEvent = async () => {
        try {
            const newSchedule = getEvent(
                title,
                description,
                startDate,
                endDate,
                room
            );
            dispatch(createSchedule(newSchedule));
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    const handleUpdatedEvent = async () => {
        try {
            const updatedSchedule = {
                id: eventInfos.event.id,
                ...getEvent(title, description, startDate, endDate, room),
            };
            dispatch(updateSchedule(updatedSchedule));
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    const handleDeleteEvent = async () => {
        try {
            dispatch(deleteSchedule({ id: Number(eventInfos.event.id) }));
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            scroll={"paper"}
            fullWidth
        >
            <form action="#" autoComplete="off" noValidate="">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    {isEditCard ? "Edit Schedule" : "Add Schedule"}
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                            <Stack
                                spacing={1.25}
                                direction={"column"}
                                useFlexGap={false}
                            >
                                <InputLabel children="Title" />
                                <CustomeTextField
                                    error={isError}
                                    name="Title"
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    placeholder="Title"
                                    required
                                    size="small"
                                    type="text"
                                    value={title}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Stack
                                spacing={1.25}
                                direction={"column"}
                                useFlexGap={false}
                            >
                                <InputLabel children="Room" />
                                <CustomeTextField
                                    error={isError}
                                    name="Room"
                                    onChange={(event) =>
                                        setRoom(parseInt(event.target.value))
                                    }
                                    placeholder="Room"
                                    required
                                    size="small"
                                    type="text"
                                    value={room ? String(room) : ""}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack
                                spacing={1.25}
                                direction={"column"}
                                useFlexGap={false}
                            >
                                <InputLabel children="Description" />
                                <CustomeTextField
                                    multiline
                                    name="Description"
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    placeholder="Description"
                                    rows={3}
                                    size="small"
                                    type="text"
                                    value={description}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                spacing={1.25}
                                direction={"column"}
                                useFlexGap={false}
                            >
                                <InputLabel children="Start Date" />
                                <DateTimeInput
                                    onChange={(event) => setStartDate(event)}
                                    value={dayjs(startDate)}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                spacing={1.25}
                                direction={"column"}
                                useFlexGap={false}
                            >
                                <InputLabel children="End Date" />
                                <DateTimeInput
                                    onChange={(event) => setEndDate(event)}
                                    value={dayjs(endDate)}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Grid
                        container
                        direction={"row"}
                        columns={12}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid>
                            {isEditCard && (
                                <Button
                                    children="Delete"
                                    variant="contained"
                                    onClick={handleDeleteEvent}
                                />
                            )}
                        </Grid>
                        <Grid alignItems="center">
                            <Stack
                                direction="row"
                                spacing={2}
                                useFlexGap={false}
                            >
                                <Button
                                    children="Cancel"
                                    variant="contained"
                                    onClick={handleClose}
                                />
                                <Button
                                    children={isEditCard ? "Update" : "Add"}
                                    variant="contained"
                                    onClick={
                                        isEditCard
                                            ? handleUpdatedEvent
                                            : handleAddedEvent
                                    }
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ModalSchedule;
