import { useState } from "react";
import {
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function HeaderCalendar({ date, isToday, handleDateChange }) {
    const [selected, setSelected] = useState(0);

    return (
        <Grid container spacing={3} className="headerToolBar">
            <Grid item>
                <Button
                    disabled={isToday()}
                    disableElevation
                    size="medium"
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                    onClick={() => handleDateChange("today")}
                >
                    Today
                </Button>
            </Grid>
            <Grid item>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <IconButton
                        color="primary"
                        size="large"
                        onClick={() => handleDateChange("prevYear")}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="large"
                        onClick={() => handleDateChange("prev")}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Typography component={"h3"}>{date}</Typography>
                    <IconButton
                        color="primary"
                        size="large"
                        onClick={() => handleDateChange("next")}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="large"
                        onClick={() => handleDateChange("nextYear")}
                    >
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item>
                <ButtonGroup
                    disableElevation={true}
                    disableRipple
                    variant="outlined"
                >
                    <Button
                        variant={selected === 0 ? "contained" : "outlined"}
                        onClick={() => {
                            handleDateChange("month");
                            setSelected(0);
                        }}
                    >
                        <CalendarViewMonthIcon />
                    </Button>
                    <Button
                        variant={selected === 1 ? "contained" : "outlined"}
                        onClick={() => {
                            handleDateChange("week");
                            setSelected(1);
                        }}
                    >
                        <CalendarViewWeekIcon />
                    </Button>
                    <Button
                        variant={selected === 2 ? "contained" : "outlined"}
                        onClick={() => {
                            handleDateChange("day");
                            setSelected(2);
                        }}
                    >
                        <CalendarViewDayIcon />
                    </Button>
                    <Button
                        variant={selected === 3 ? "contained" : "outlined"}
                        onClick={() => {
                            handleDateChange("list");
                            setSelected(3);
                        }}
                    >
                        <FormatListBulletedIcon />
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

export default HeaderCalendar;
