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
import CustomeTextField from "../../Member/Input/CustomeTextField";
import axiosClient from "../../../Variable/Api/api";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
    createPerformance,
    deletePerformance,
    toggleModal,
    updatePerformance,
} from "../../../Variable/Redux/Slice/scheduleSlice";
import DateInput from "../../Member/Input/DateInput";
import TimeInput from "../../Member/Input/TimeInput";

function PerformanceSchedule({ isEditCard, eventInfos }) {
    const GET_ALL_SONGS_URL = "Song/GetAllSongs";

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

    const dispatch = useDispatch();
    const songIdExist = eventInfos?.event?.extendedProps?.songs?.map(
        (song) => song.id
    );
    const songNameExist = eventInfos?.event?.extendedProps?.songs?.map(
        (song) => song.name
    );

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
    const [songIds] = useState(
        songIdExist && songIdExist.length > 0 ? songIdExist : []
    );
    const [songName, setSongName] = useState(
        songNameExist && songNameExist.length > 0 ? songNameExist : []
    );
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditCard) {
            setFormSchedule({
                id: eventInfos?.event?.extendedProps?.scheduleId,
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
                      key={song.id}
                      value={song.name}
                  >
                      <Checkbox checked={songIds?.indexOf(song.id) > -1} />
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
    };

    function handleClose() {
        dispatch(toggleModal(false));
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
        const updatedSchedule = {
            id: formSchedule.id,
            ...getEvent(formSchedule),
        };
        dispatch(updatePerformance(updatedSchedule));
        resetAndCloseModal();
    };

    const handleCreateEvent = (e) => {
        const newSchedule = getEvent(formSchedule);
        dispatch(createPerformance(newSchedule));
        resetAndCloseModal();
    };

    function handleDeleteEvent() {
        dispatch(deletePerformance({ id: Number(formSchedule.id) }));
        resetAndCloseModal();
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
        axiosClient
            .get(GET_ALL_SONGS_URL)
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {});
    }, []);

    return (
        <form>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Stack>
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
                        <Stack>
                            <InputLabel />
                            <CustomeTextField
                                error={Boolean(formErrors.place)}
                                name="place"
                                label={
                                    Boolean(formErrors.place)
                                        ? "Place is required and < 30 character"
                                        : "Place"
                                }
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
                        <Stack>
                            <DateInput
                                onChange={(event) =>
                                    handleChange("date", event)
                                }
                                value={dayjs(formSchedule.date)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack>
                            <TimeInput
                                label="Time"
                                onChange={(event) =>
                                    handleChange("time", event)
                                }
                                value={dayjs(formSchedule.time)}
                            />
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
                        <Stack>
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
                                variant="contained"
                                color="error"
                                onClick={handleDeleteEvent}
                            >
                                Delete
                            </Button>
                        )}
                    </Grid>
                    <Grid alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmit}
                            >
                                {isEditCard ? "Update" : "Create"}
                            </Button>
                            <Button variant="contained" onClick={handleClose}>
                                Exit
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </form>
    );
}

export default PerformanceSchedule;
