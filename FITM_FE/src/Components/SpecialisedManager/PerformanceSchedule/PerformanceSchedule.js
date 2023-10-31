import { useEffect, useState } from "react";
import {
    DialogContent,
    Grid,
    InputLabel,
    Stack,
    OutlinedInput,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    Checkbox,
    Button,
    DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    LocalizationProvider,
    DatePicker,
    MobileTimePicker,
} from "@mui/x-date-pickers";
import CustomeTextField from "../../Member/Input/CustomeTextField";
import axios from "axios";
import dayjs from "dayjs";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import { useDispatch } from "react-redux";
import {
    createPerformance,
    deletePerformance,
    toggleModal,
    updatePerformance,
} from "../../../Variable/Redux/Slice/scheduleSlice";

function PerformanceSchedule({ isEditCard, eventInfos }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
        autoFocus: true,
    };

    const songIdExist = eventInfos?.event?.extendedProps?.songs?.map(song => song.id);
    const songNameExist = eventInfos?.event?.extendedProps?.songs?.map(song => song.name);

    const performanceToCreate = {
        id: 0,
        name: "",
        place: "",
        date: eventInfos?.startStr,
        time: new Date(0, 0, 0, 20, 0),
        backgroundImg: "",
        songIDs: [],
    };

    const [songs, setSongs] = useState([]);
    const [formSchedule, setFormSchedule] = useState(performanceToCreate);
    const [songIds] = useState(songIdExist && songIdExist.length > 0? songIdExist: []);
    const [songName, setSongName] = useState(songNameExist && songNameExist.length > 0? songNameExist: []);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditCard) {
            setFormSchedule({
                id: eventInfos?.event?.id,
                name: eventInfos?.event?.extendedProps?.name,
                place: eventInfos?.event?.extendedProps?.place,
                date: eventInfos?.event?.startStr,
                time: eventInfos?.event?.startStr,
                backgroundImg: eventInfos?.event?.extendedProps?.backgroundImg,
            });

        }
    }, [eventInfos, isEditCard]);

    const handleChangePfm = (event) => {
        const {
            target: { value },
        } = event;
        setSongName(typeof value === "string" ? value.split(",") : value);
    };

    const itemList =
        songs && songs.length > 0
            ? songs.map((song) => (
                <MenuItem
                    onClick={(e) => handleSelectSong(song.id)}
                    key={song.id} value={song.name}>
                    <Checkbox
                        checked={
                            songIds?.indexOf(song.id) > -1
                        }
                    />
                    <ListItemText primary={song.name} />
                </MenuItem>
            ))
            : null;

    const handleSelectSong = (songId) => {
        const songIndex = songIds.indexOf(songId);

        if (songIndex === -1) {
            songIds.push(songId);
        } else {
            songIds.splice(songIndex, 1);
        }
    }

    function getEvent(formSchedule) {
        return {
            name: formSchedule.name,
            place: formSchedule.place,
            date: new Date(formSchedule.date).toISOString().split("T")[0],
            time: new Date(formSchedule.time).toTimeString().split(" ")[0],
            backgroundImg: formSchedule.backgroundImg,
            songIDs: songIds,
        };
    }
    //Handle when submit ("Add" or "Update" button)
    function handleSubmit(e) {
        const errors = validate(formSchedule);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (isEditCard) {
                handleUpdateEvent();
            } else {
                handleCreateEvent();
            }
        }
    }
    const handleUpdateEvent = (e) => {
        try {
            const updatedSchedule = {
                id: formSchedule.id,
                ...getEvent(formSchedule),
            };
            dispatch(updatePerformance(updatedSchedule));
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
    };

    const handleCreateEvent = (e) => {
        try {
            const newSchedule = getEvent(formSchedule);
            dispatch(createPerformance(newSchedule));
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
    };

    function handleDeleteEvent() {
        try {
            dispatch(deletePerformance({ id: Number(formSchedule.id) }));
        } catch {
            CustomeAlert.error("Something error");
        } finally {
            resetAndCloseModal();
        }
    }

    function resetAndCloseModal() {
        setFormSchedule({
            ...formSchedule,
            name: "",
            place: "",
            time: "",
            backgroundImg: "",
            songIDs: [],
        });
        handleClose();
    }

    const handleChange = (name, event) => {
        let value;
        switch (name) {
            case "date":
                value = event;
                break;
            case "time":
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
    //Validate value
    function validate(values) {
        let errors = {};

        if (values.name.length === 0) {
            errors.name = "Name is required";
        }
        if (values.place.length === 0 || values.place.length >= 30) {
            errors.place = "Place limited to 30 characters or less";
        }
        return errors;
    }
    //--------------------------------------------------

    useEffect(() => {
        axios
            .get("https://localhost:7226/apis/Song/GetAllSongs")
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {

            });
    }, []);

    //Close Modal
    const dispatch = useDispatch();
    function handleClose() {
        dispatch(toggleModal(false));
    }

    return (
        <form>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <InputLabel />
                            <CustomeTextField
                                error={Boolean(formErrors.name)}
                                name="name"
                                label={
                                    Boolean(formErrors.name)
                                        ? "Name is required"
                                        : "Name"
                                }
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("name", event)
                                }
                                value={formSchedule.name}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <InputLabel />
                            <CustomeTextField
                                error={Boolean(formErrors.place)}
                                name="place"
                                label={Boolean(formErrors.place)? "Place is required and < 30 character" : "Place"}
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("place", event)
                                }
                                value={formSchedule.place}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    label="Date"
                                    onChange={(event) =>
                                        handleChange("date", event)
                                    }
                                    value={dayjs(formSchedule.date)}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    label="Time"
                                    format="HH:mm"
                                    ampm={false}
                                    onChange={(event) =>
                                        handleChange("time", event)
                                    }
                                    value={dayjs(formSchedule.time)}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel
                                id="demo-multiple-checkbox-label"
                                size="small"
                            >
                                Songs
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                size="small"
                                id="demo-multiple-checkbox"
                                multiple
                                value={songName}
                                onChange={handleChangePfm}
                                input={<OutlinedInput label="Songs" />}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                            >
                                {itemList}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <InputLabel />
                            <CustomeTextField
                                name="backgroundImg"
                                label="Image"
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("backgroundImg", event)
                                }
                                value={formSchedule.backgroundImg}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ paddingLeft: 3, paddingRight: 3 }}>
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
                                color="error"
                                onClick={handleDeleteEvent}
                            />
                        )}
                    </Grid>
                    <Grid alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                children={isEditCard ? "Update" : "Create"}
                                variant="contained"
                                color="success"
                                onClick={handleSubmit}
                            />
                            <Button
                                children="Exit"
                                variant="contained"
                                onClick={handleClose}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </form>
    );
}

export default PerformanceSchedule;
