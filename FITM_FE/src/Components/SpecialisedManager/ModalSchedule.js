import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputLabel,
    Stack,
    Tab,
} from "@mui/material";
import {
    createSchedule,
    deleteSchedule,
    getScheduleError,
    updateSchedule,
} from "../../Variable/Redux/Slice/scheduleSlice";
import DateTimeInput from "../Member/Input/DateTimeInput";
import CustomeTextField from "../Member/Input/CustomeTextField";
import CustomeAlert from "../Member/Alert/CustomeAlert";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function ModalSchedule({ handleClose, open, eventInfos, isEditCard }) {
    const dispatch = useDispatch();
    const error = useSelector(getScheduleError);

    const intialValues = {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        room: null,
    };
    const [formSchedule, setFormSchedule] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [valueTab, setValueTab] = useState("1");

    useEffect(() => {
        if (isEditCard) {
            setFormSchedule({
                title: eventInfos?.event?.title,
                description: eventInfos?.event?.extendedProps?.description,
                startDate: eventInfos?.event?.startStr,
                endDate: eventInfos?.event?.endStr,
                room: eventInfos?.event?.extendedProps?.room,
            });
        } else {
            setFormSchedule({
                title: "",
                description: "",
                startDate: eventInfos?.startStr,
                endDate: eventInfos?.endStr,
                room: null,
            });
        }
    }, [eventInfos, isEditCard]);

    function getEvent(formSchedule) {
        return {
            title: formSchedule.title,
            description: formSchedule.description,
            startDate: formSchedule.startDate,
            endDate: formSchedule.endDate,
            room: formSchedule.room,
        };
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

    const handleAddedEvent = () => {
        try {
            const newSchedule = getEvent(formSchedule);
            dispatch(createSchedule(newSchedule));
            CustomeAlert.success("Added successfully");
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    const handleUpdatedEvent = () => {
        try {
            const updatedSchedule = {
                id: eventInfos.event.id,
                ...getEvent(formSchedule),
            };
            dispatch(updateSchedule(updatedSchedule));
            CustomeAlert.success("Updated successfully");
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    const handleDeleteEvent = () => {
        try {
            dispatch(deleteSchedule({ id: Number(eventInfos.event.id) }));
            CustomeAlert.success("Deleted successfully");
        } catch {
            CustomeAlert.error(error);
        } finally {
            resetAndCloseModal();
        }
    };

    const handleChange = (name, event) => {
        setFormErrors((prev) => ({ ...prev, [name]: null }));

        let value;
        switch (name) {
            case "room":
                value = parseInt(event.target.value);
                break;
            case "startDate":
            case "endDate":
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

    const validate = (values) => {
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

        if (values.startDate > values.endDate) {
            errors.endDate = "End date must be last start date";
        }

        return errors;
    };

    const handleSubmit = (e) => {
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
    };

    const handleChangeTab = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            scroll={"paper"}
            fullWidth
        >
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab label="Practical Schedule" value="1" />
                        <Tab label="Performance Schedule" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <form action="" onSubmit={handleSubmit}>
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
                                            error={Boolean(formErrors.title)}
                                            helperText={
                                                Boolean(formErrors.title) &&
                                                formErrors.title
                                            }
                                            name="title"
                                            onChange={(event) =>
                                                handleChange("title", event)
                                            }
                                            placeholder="Title"
                                            size="small"
                                            type="text"
                                            value={formSchedule.title}
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
                                            error={Boolean(formErrors.room)}
                                            helperText={
                                                Boolean(formErrors.room) &&
                                                formErrors.room
                                            }
                                            name="room"
                                            onChange={(event) =>
                                                handleChange("room", event)
                                            }
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
                                    <Stack
                                        spacing={1.25}
                                        direction={"column"}
                                        useFlexGap={false}
                                    >
                                        <InputLabel children="Description" />
                                        <CustomeTextField
                                            error={Boolean(
                                                formErrors.description
                                            )}
                                            helperText={
                                                Boolean(
                                                    formErrors.description
                                                ) && formErrors.description
                                            }
                                            multiline
                                            name="description"
                                            onChange={(event) =>
                                                handleChange(
                                                    "description",
                                                    event
                                                )
                                            }
                                            placeholder="Description"
                                            rows={3}
                                            size="small"
                                            type="text"
                                            value={formSchedule.description}
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
                                            onChange={(event) =>
                                                handleChange("startDate", event)
                                            }
                                            value={dayjs(
                                                formSchedule.startDate
                                            )}
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
                                            minDateTime={dayjs(
                                                formSchedule.startDate
                                            )}
                                            onChange={(event) =>
                                                handleChange("endDate", event)
                                            }
                                            value={dayjs(formSchedule.endDate)}
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
                                            children={
                                                isEditCard ? "Update" : "Add"
                                            }
                                            variant="contained"
                                            type="submit"
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </form>
                </TabPanel>
                <TabPanel value="2">Oke</TabPanel>
            </TabContext>
        </Dialog>
    );
}

export default ModalSchedule;
