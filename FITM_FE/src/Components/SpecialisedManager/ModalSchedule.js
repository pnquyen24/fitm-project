import { useEffect, useState } from "react";
import { createSchedule, updateSchedule, deleteSchedule } from "./ScheduleApi";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    Stack,
    useFormControl
} from "@mui/material";
import CustomeTextField from "../Member/Input/CustomeTextField";

function ModalSchedule({ handleClose, open, eventInfos, isEditCard }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [room, setRoom] = useState();
    const [cardColor, setCardColor] = useState({
        backgroundColor: "#1677ff",
        textColor: "#ffffff"
    });
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isEditCard) {
            setTitle(eventInfos?.event?.title);
            setDescription(eventInfos?.event?.description);
            setRoom(eventInfos?.event?.room);
            setCardColor({
                backgroundColor: eventInfos?.event?.backgroundColor,
                textColor: eventInfos?.event?.textColor
            });
        } else {
            setTitle("");
            setDescription("");
            setRoom();
            setCardColor({ backgroundColor: "#1677ff", textColor: "#ffffff" });
        }
    }, [eventInfos, isEditCard]);

    const handleSelectCardColor = (color) => {
        setCardColor({
            backgroundColor: color.backgroundColor,
            textColor: color.textColor,
        });
    };

    const handleAddedEvent = async () => {
        try {
            const calendarApi = eventInfos.view.calendar;

            const eventCalendar = await createSchedule({
                title: title,
                description: description,
                startDate: eventInfos.startStr,
                endDate: eventInfos.endStr,
                room: room,
                backgroundColor: cardColor.backgroundColor,
                textColor: cardColor.textColor
            });

            calendarApi.addEvent({
                id: eventCalendar.id,
                title: eventCalendar.title,
                description: eventCalendar.description,
                startDate: eventCalendar.start,
                endDate: eventCalendar.endStr,
                room: eventCalendar.room,
                backgroundColor: cardColor.backgroundColor,
                textColor: cardColor.textColor
            });
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
                start: eventInfos.event.startStr,
                end: eventInfos.event.endStr,
                room: room,
                backgroundColor: cardColor.backgroundColor,
                textColor: cardColor.textColor,
            };

            const currentEvent = calendarApi.getEventById(eventInfos.event.id);

            if (currentEvent) {
                currentEvent.setProp("title", title);
                currentEvent.setProp("description", description);
                currentEvent.setProp("room", room);
                currentEvent.setProp("backgroundColor", cardColor.backgroundColor);
                currentEvent.setProp("textColor", cardColor.textColor);
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

    return (
        <Dialog open={Boolean(open)} onClose={() => { handleClose(); setIsTouched(false); }} scroll="paper" fullWidth>
            <form action="#" autoComplete="off" noValidate="">
                <DialogTitle sx={{ m: 0, p: 2 }}>Add Schedule</DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                                <InputLabel children="Title" />
                                <CustomeTextField
                                    error={!title && isTouched}
                                    helperText={!title && isTouched && "Title is required"}
                                    name="Title"
                                    onBlur={() => setIsTouched(true)}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Title"
                                    size="small"
                                    type="text"
                                    value={title}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ModalSchedule;