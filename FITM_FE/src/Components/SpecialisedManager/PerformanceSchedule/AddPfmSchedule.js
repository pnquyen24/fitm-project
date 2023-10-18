import { useEffect, useMemo, useState } from "react";

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
    TextField,
    InputAdornment,
    Button,
    DialogActions
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    LocalizationProvider,
    DatePicker,
    MobileTimePicker,
} from "@mui/x-date-pickers";

import CustomeTextField from "../../Member/Input/CustomeTextField";


function AddPfmSchedule() {
    
    //Open, Close PopUp
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }; 
    const handleClose = () => {
        setOpen(false);
    };
//---------------------------------------------------
    const [formSchedule, setFormSchedule] = useState();
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

    const names = [
        'Hào Khí Việt Nam',
        'Lý Cây Đa',
        'Lý Cây Bông',
        'Đế Vương',
        'Cô Đơn Trên Sofa',
        'Việt Nam ơi',
        'Đi Cấy',
        'Lý Kéo Chài',
        'Dòng Máu Lạc Hồng',
    ];

    const containsText = (text, searchText) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;


    const [songName, setSongName] = useState([]);

    const handleChangePfm = (event) => {
        const {
            target: { value },
        } = event;
        setSongName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () => names.filter((option) => containsText(option, searchText)),
        [searchText]
    );

    return (
        <form>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1.25}  direction={"column"} useFlexGap={false}>
                            <InputLabel children="Performance Name" />
                            <CustomeTextField name="title" placeholder="Name" size="small" type="text"/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                            <InputLabel children="Place"/>
                            <CustomeTextField name="title" placeholder="Place" size="small" type="text"/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                            <InputLabel children="Date" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Date"/>
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1.25} direction={"column"} useFlexGap={false}>
                            <InputLabel children="Time" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker label="Time" ampm={false} />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-multiple-checkbox-label" size="small">Songs</InputLabel>
                            <Select labelId="demo-multiple-checkbox-label" size="small" id="demo-multiple-checkbox" 
                                multiple  
                                value={songName}
                                onChange={handleChangePfm}
                                input={<OutlinedInput label="Songs" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                <ListSubheader>
                                    <TextField size="small" autoFocus placeholder="Type to search..." fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key !== "Escape") {
                                                e.stopPropagation();
                                            }
                                        }}
                                    />
                                </ListSubheader>
                                {displayedOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={songName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container direction={"row"} columns={12} alignItems="center"justifyContent="space-between">
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
                        <Stack direction="row" spacing={2}  >
                            <Button children="Create" variant="contained" color="success"/>
                            <Button children="Exit" variant="outlined"/>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </form>
    );


}

export default AddPfmSchedule