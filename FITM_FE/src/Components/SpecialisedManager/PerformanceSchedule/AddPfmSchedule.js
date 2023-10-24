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
    ListSubheader,
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
import { toggleModal } from "../../../Variable/Redux/Slice/scheduleSlice";

function AddPfmSchedule({ isEditCard, eventInfos }) {

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

    const [songs, setSongs] = useState([]);
    const [songName, setSongName] = useState([]);
    const [songIds] = useState([]);

    const handleChangePfm = (event) => {
        const {
            target: { value },
        } = event;
        setSongName(
            typeof value === "string" ? value.split(",") : value
        );
    };

    const itemList =
        songs && songs.length > 0
            ? songs.map((song) => (
                <MenuItem
                    onClick={(e) => handleSelectSong(song.id)}
                    key={song.id} value={song.name}>
                    <Checkbox
                        checked={
                            songName.indexOf(song.name) > -1
                        }
                    />
                    <ListItemText primary={song.name} />
                </MenuItem>
            ))
            : null;

    const handleSelectSong = (songId) => {
        const songIndex = songIds.indexOf(songId);

        if (songIndex === -1) {
            // Add the song ID to the array
            songIds.push(songId);
        } else {
            // Remove the song ID from the array
            songIds.splice(songIndex, 1);
        }

        console.log(songIds);
    }

    useEffect(() => {
        if (isEditCard) {
            setFormSchedule({
                name: eventInfos?.event?.extendedProps?.name,
                place: eventInfos?.event?.extendedProps?.place,
                date: eventInfos?.event?.extendedProps?.date,
                time: eventInfos?.event?.extendedProps?.time,
                backgroundImg: eventInfos?.event?.extendedProps?.backgroundImg,
                songIDs:eventInfos?.event?.extendedProps?.songIDs,
            });
        } else {
            setFormSchedule({
                name: "",
                place: "",
                date: eventInfos?.startStr,
                time: "",
                backgroundImg: "",
                songIDs: []
            });
        }
    }, [eventInfos, isEditCard]);

    const songToUpdate = {
        name: "",
        place: "",
        date: "",
        time: "",
        backgroundImg: "",
        songIDs: []
    };

    const [formSchedule, setFormSchedule] = useState(songToUpdate);
    function getEvent(formSchedule) {
        return {
            name: formSchedule.name,
            place: formSchedule.place,
            date: new Date(formSchedule.date).toISOString().split('T')[0],
            time: new Date(formSchedule.time).toTimeString().split(' ')[0],
            backgroundImg: formSchedule.backgroundImg,
            songIDs: songIds
        };
    }


    const handleCreate = (e) => {
        e.preventDefault();
        const newSchedule = getEvent(formSchedule);
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .post("https://localhost:7226/apis/PerformanceSchedule/Create", newSchedule, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) =>
                CustomeAlert.success("Saved successfully!")
            )
            .catch(() => {
                CustomeAlert.error("Save failed!")
            });

        console.log(newSchedule);
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



    // const containsText = (text, searchText) =>
    //     text?.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    // const displayedOptions = useMemo(
    //     () => convertData().filter((option) => containsText(option.name, searchText)),
    //     [songs, searchText]
    // );

    useEffect(() => {
        axios.get("https://localhost:7226/apis/Song/GetAllSongs")
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //Close Modal
    const dispatch = useDispatch();
    function handleClose(){
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
                            <InputLabel/>
                            <CustomeTextField
                                name="name"
                                placeholder="Name"
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("name", event)
                                }
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                            spacing={1.25}
                            direction={"column"}
                            useFlexGap={false}
                        >
                            <InputLabel/>
                            <CustomeTextField
                                name="place"
                                placeholder="Place"
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("place", event)
                                }
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
                                    value={dayjs(
                                                formSchedule.date
                                            )}
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
                                <MobileTimePicker label="Time"
                                    format="HH:mm"
                                    ampm={false}
                                    onChange={(event) =>
                                        handleChange("time", event)
                                    } />
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
                                <ListSubheader>
                                    {/* <TextField
                                        size="small"
                                        autoFocus
                                        placeholder="Type to search..."
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                        }}
                                        // onChange={(e) =>
                                        //     setSearchText(e.target.value)
                                        // }
                                        onKeyDown={(e) => {
                                            if (e.key !== "Escape") {
                                                e.stopPropagation();
                                            }
                                        }}
                                    /> */}
                                </ListSubheader>
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
                            <InputLabel/>
                            <CustomeTextField
                                name="backgroundImg"
                                placeholder="Image"
                                size="small"
                                type="text"
                                onChange={(event) =>
                                    handleChange("backgroundImg", event)
                                }
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx ={{paddingLeft: 3, paddingRight: 3}}>
                <Grid
                    container
                    direction={"row"}
                    columns={12}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid>
                        {true && (
                            <Button
                                children="Call Off"
                                variant="contained"
                                color="error"
                            />
                        )}
                    </Grid>
                    <Grid alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                children="Create"
                                variant="contained"
                                color="success"
                                onClick={handleCreate}
                            />
                            <Button children="Exit" variant="outlined" onClick={handleClose}/>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </form>
    );
}

export default AddPfmSchedule;
