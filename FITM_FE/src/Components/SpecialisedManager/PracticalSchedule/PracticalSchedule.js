import { useEffect, useState } from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    InputLabel,
    Stack,
} from "@mui/material";
import CustomeTextField from "../../Member/Input/CustomeTextField";
import TimeInput from "../../Member/Input/TimeInput";
import DateInput from "../../Member/Input/DateInput";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
    createPractical,
    deletePractical,
    toggleModal,
    updatePractical,
} from "../../../Variable/Redux/Slice/scheduleSlice";

function PracticalSchedule({ isEditCard, eventInfos }) {
    document.title = "Practical Schedule";

    const dispatch = useDispatch();

    const intialValues = {
        id: null,
        title: "",
        description: "",
        date: eventInfos?.startStr,
        startTime: new Date(0, 0, 0, 17, 30),
        endTime: new Date(0, 0, 0, 19, 0),
        room: null,
    };

    const [formSchedule, setFormSchedule] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditCard) {
            setFormSchedule({
                id: eventInfos.event.id,
                title: eventInfos?.event?.title,
                description: eventInfos?.event?.extendedProps?.description,
                date: eventInfos?.event?.startStr,
                startTime: eventInfos?.event?.startStr,
                endTime: eventInfos?.event?.endStr,
                room: eventInfos?.event?.extendedProps?.room,
            });
        }
    }, [eventInfos, isEditCard]);

    function getEvent(formSchedule) {
        return {
            title: formSchedule.title,
            description: formSchedule.description,
            date: new Date(formSchedule.date).toISOString().split("T")[0],
            startTime: new Date(formSchedule.startTime)
                .toTimeString()
                .split(" ")[0],
            endTime: new Date(formSchedule.endTime)
                .toTimeString()
                .split(" ")[0],
            room: formSchedule.room,
        };
    }

    function handleClose() {
        dispatch(toggleModal(false));
    }

    function resetAndCloseModal() {
        setFormSchedule({
            ...formSchedule,
            title: "",
            description: "",
            room: null,
        });
        handleClose();
    }

    //--------------------------------------------------
    //CRUD event method
    function handleCreate() {
        const newSchedule = getEvent(formSchedule);
        dispatch(createPractical(newSchedule));
        resetAndCloseModal();
    }

    function handleUpdate() {
        const updatedSchedule = {
            id: formSchedule.id,
            ...getEvent(formSchedule),
        };
        dispatch(updatePractical(updatedSchedule));
        resetAndCloseModal();
    }

    function handleDelete() {
        dispatch(deletePractical({ id: Number(formSchedule.id) }));
        resetAndCloseModal();
    }
    //--------------------------------------------------
    //Handle input value
    const handleInput = (name, event) => {
        setFormErrors((prev) => ({ ...prev, [name]: null }));

        let value;
        switch (name) {
            case "room":
                value = parseInt(event.target.value);
                break;
            case "date":
            case "startTime":
            case "endTime":
                value = event;
                break;
            default:
                value = event.target.value;
                break;
        }
        setFormSchedule({
            ...formSchedule,
            [name]: value,
        });
    };
    //--------------------------------------------------
    //Handle when submit ("Create" or "Update" button)
    function handleSubmit(e) {
        e.preventDefault();

        const errors = validate(formSchedule);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (isEditCard) {
                handleUpdate();
            } else {
                handleCreate();
            }
        }
    }
    //--------------------------------------------------
    //Validate value
    function validate(values) {
        let errors = {};

        if (!values.title) {
            errors.title = "Title is required";
        } else if (values.title.length >= 30) {
            errors.title = "Title limited to 30 characters or less";
        }

        if (values.description.length >= 200) {
            errors.description = "Description limited to 30 characters or less";
        }

        const roomRegex = /^50[1-9]|51[0-9]|520$/;
        if (!values.room) {
            errors.room = "Required";
        } else if (!roomRegex.test(values.room)) {
            errors.room = "501-520";
        }

        if (values.startTime > values.endTime) {
            errors.endTime = "End time must be last start time";
        }

        return errors;
    }
    //--------------------------------------------------
    //Return
    return (
        <form action="" onSubmit={handleSubmit}>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={10}>
                        <Stack>
                            <InputLabel children="Title" />
                            <CustomeTextField
                                error={Boolean(formErrors.title)}
                                helperText={
                                    Boolean(formErrors.title) &&
                                    formErrors.title
                                }
                                name="title"
                                onChange={(event) =>
                                    handleInput("title", event)
                                }
                                placeholder="Title"
                                size="small"
                                type="text"
                                value={formSchedule.title}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Stack>
                            <InputLabel children="Room" />
                            <CustomeTextField
                                error={Boolean(formErrors.room)}
                                helperText={
                                    Boolean(formErrors.room) && formErrors.room
                                }
                                name="room"
                                onChange={(event) => handleInput("room", event)}
                                placeholder="Room"
                                size="small"
                                type="text"
                                value={
                                    formSchedule.room
                                        ? String(formSchedule.room)
                                        : ""
                                }
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack>
                            <InputLabel children="Description" />
                            <CustomeTextField
                                error={Boolean(formErrors.description)}
                                helperText={
                                    Boolean(formErrors.description) &&
                                    formErrors.description
                                }
                                multiline
                                name="description"
                                onChange={(event) =>
                                    handleInput("description", event)
                                }
                                placeholder="Description"
                                rows={3}
                                size="small"
                                type="text"
                                value={formSchedule.description}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack>
                            <InputLabel children="Date" />
                            <DateInput
                                readonly={!isEditCard}
                                onChange={(event) => handleInput("date", event)}
                                value={dayjs(formSchedule.date)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack>
                            <InputLabel children="Start Time" />
                            <TimeInput
                                onChange={(event) =>
                                    handleInput("startTime", event)
                                }
                                value={dayjs(formSchedule.startTime)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack>
                            <InputLabel children="End Time" />
                            <TimeInput
                                minTime={dayjs(formSchedule.startTime)}
                                onChange={(event) =>
                                    handleInput("endTime", event)
                                }
                                value={dayjs(formSchedule.endTime)}
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
                    <Grid alignItems="center">
                        {isEditCard && (
                            <Stack direction="row" spacing={2}>
                                <Button
                                    children="Delete"
                                    variant="contained"
                                    onClick={handleDelete}
                                />
                            </Stack>
                        )}
                    </Grid>
                    <Grid alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                children="Exit"
                                variant="contained"
                                onClick={handleClose}
                            />
                            <Button
                                children={isEditCard ? "Update" : "Create"}
                                variant="contained"
                                onClick={handleSubmit}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </form>
    );
}

export default PracticalSchedule;
