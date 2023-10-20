import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    InputLabel,
    Stack,
} from "@mui/material";
import CustomeTextField from "../../Member/Input/CustomeTextField";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import TimeInput from "../../Member/Input/TimeInput";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
    createSchedule,
    deleteSchedule,
    toggleModal,
    updateSchedule,
} from "../../../Variable/Redux/Slice/scheduleSlice";

function PracticalSchedule({ isEditCard, eventInfos }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const intialValues = {
        id: null,
        title: "",
        description: "",
        date: null,
        startTime: null,
        endTime: null,
        room: null,
    };

    const [formSchedule, setFormSchedule] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditCard) {
            console.log(eventInfos.event.startStr);
            setFormSchedule({
                id: eventInfos.event.id,
                title: eventInfos?.event?.title,
                description: eventInfos?.event?.extendedProps?.description,
                date: eventInfos?.event?.startStr,
                startTime: eventInfos?.event?.startStr,
                endTime: eventInfos?.event?.endStr,
                room: eventInfos?.event?.extendedProps?.room,
            });
        } else {
            setFormSchedule({
                title: "",
                description: "",
                date: eventInfos?.startStr,
                startTime: new Date(0, 0, 0, 17, 30),
                endTime: new Date(0, 0, 0, 19, 0),
                room: null,
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
    function handleAddedEvent() {
        try {
            const newSchedule = getEvent(formSchedule);
            dispatch(createSchedule(newSchedule));
            CustomeAlert.success("Added successfully");
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
    }

    function handleUpdatedEvent() {
        try {
            const updatedSchedule = {
                id: formSchedule.id,
                ...getEvent(formSchedule),
            };
            dispatch(updateSchedule(updatedSchedule));
            CustomeAlert.success("Updated successfully");
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
    }

    function handleDeleteEvent() {
        try {
            dispatch(deleteSchedule({ id: Number(formSchedule.id) }));
            CustomeAlert.success("Deleted successfully");
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
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
    //Handle when submit ("Add" or "Update" button)
    function handleSubmit(e) {
        e.preventDefault();

        const errors = validate(formSchedule);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (isEditCard) {
                handleUpdatedEvent();
            } else {
                handleAddedEvent();
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
    //Handle navigation ("Attendance" button)
    function handleNavigate() {
        navigate("/attendance", {
            state: {
                scheduleId: formSchedule.id,
            },
        });
        handleClose();
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
                            <CustomeTextField
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={String(
                                    new Date(
                                        formSchedule.date
                                    ).toLocaleDateString("en-GB")
                                )}
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
                                    onClick={handleDeleteEvent}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleNavigate}
                                >
                                    Attendance
                                </Button>
                            </Stack>
                        )}
                    </Grid>
                    <Grid alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                children="Cancel"
                                variant="contained"
                                onClick={handleClose}
                            />
                            <Button
                                children={isEditCard ? "Update" : "Add"}
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
