import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    Stack
} from "@mui/material";
import { createSchedule, updateSchedule, deleteSchedule } from "./ScheduleApi";
import DateTimeInput from "../Member/Input/DateTimeInput";
import CustomeTextField from "../Member/Input/CustomeTextField";

function ModalSchedule({ handleClose, open, eventInfos, isEditCard }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(eventInfos?.startStr);
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

    const handleInput = (event) => {
        const text = event.target.value;
        if (text.length === 0) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    const handleAddedEvent = async () => {
        try {
            const calendarApi = eventInfos.view.calendar;
            const eventCalendar = {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                room: room,
                backgroundColor: "#1677ff",
                textColor: "#ffffff",
            };
            calendarApi.addEvent(await createSchedule(eventCalendar));
        } catch (error) {
            // error
            console.log("Error!");
        } finally {
            setTitle("");
            setDescription("");
            setRoom();
            handleClose();
        }
    };

    const handleUpdatedEvent = async () => {
        try {
            const calendarApi = eventInfos.view.calendar;

            const eventCalendarUpdated = {
                id: eventInfos.event.id,
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                room: room,
                backgroundColor: "#1677ff",
                textColor: "#ffffff",
            };

            const currentEvent = calendarApi.getEventById(eventInfos.event.id);

            if (currentEvent) {
                currentEvent.setProp("title", title);
                currentEvent.setExtendedProp("description", description);
                currentEvent.setExtendedProp("room", room);
                currentEvent.setProp("backgroundColor", "#1677ff");
                currentEvent.setProp("textColor", "#ffffff");
            }

            await updateSchedule(eventCalendarUpdated);
        } catch (error) {
            // error
            console.log("Error!");
        } finally {
            setTitle("");
            setDescription("");
            setRoom();
            handleClose();
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteSchedule({ id: eventInfos.event.id });
            eventInfos.event.remove();
        } catch (error) {
            // error
            console.log("Error!");
        } finally {
            setTitle("");
            setDescription("");
            setRoom();
            handleClose();
        }
    };

    return (
        <Dialog open={Boolean(open)} onClose={handleClose} scroll={"paper"} fullWidth>
            <form action="#" autoComplete="off" noValidate="">
                <DialogTitle sx={{ m: 0, p: 2 }}>{isEditCard ? "Edit Schedule" : "Add Schedule"}</DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                                <InputLabel children="Title" />
                                <CustomeTextField
                                    error={isError}
                                    name="Title"
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Title"
                                    required
                                    size="small"
                                    type="text"
                                    value={title}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                                <InputLabel children="Room" />
                                <CustomeTextField
                                    error={isError}
                                    name="Room"
                                    onChange={(event) => setRoom(parseInt(event.target.value))}
                                    placeholder="Room"
                                    required
                                    size="small"
                                    type="text"
                                    value={room ? String(room) : ""}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                                <InputLabel children="Description" />
                                <CustomeTextField
                                    multiline
                                    name="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Description"
                                    rows={3}
                                    size="small"
                                    type="text"
                                    value={description}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                                <InputLabel children="Start Date" />
                                <DateTimeInput
                                    onChange={(event) => setStartDate(event)}
                                    value={dayjs(startDate)}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
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
                    <Grid container direction={"row"} columns={12} alignItems="center" justifyContent="space-between">
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
                            <Stack direction="row" spacing={2} useFlexGap={false}>
                                <Button
                                    children="Cancel"
                                    variant="contained"
                                    onClick={handleClose}
                                />
                                <Button
                                    children={isEditCard ? "Update" : "Add"}
                                    variant="contained"
                                    onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogActions>
            </form>
        </Dialog >
    );
}

export default ModalSchedule;