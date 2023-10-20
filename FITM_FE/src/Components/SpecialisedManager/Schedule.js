import React, { useEffect, useState, useRef } from "react";
import "./Schedule.css";
import ModalSchedule from "./ModalSchedule";
import CustomeAlert from "../Member/Alert/CustomeAlert";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSchedules,
    selectAllSchedules,
    toggleModal,
    updateSchedule,
} from "../../Variable/Redux/Slice/scheduleSlice";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function Schedule() {
    const dispatch = useDispatch();
    const schedules = useSelector(selectAllSchedules);

    const calendarRef = useRef(null);

    const [calApi, setCalApi] = useState();
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();
    const [date, setDate] = useState();
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setCalApi(calendarRef.current?.getApi());
        if (calApi) {
            setDate(calApi.view.title);
        }
    }, [calApi]);

    useEffect(() => {
        dispatch(fetchSchedules());
    }, [dispatch]);

    const processReduxData = (data) => {
        return data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            start: new Date(`${item.date}T${item.startTime}`),
            end: new Date(`${item.date}T${item.endTime}`),
            room: item.room,
            color: "#1677ff",
            display: "block",
        }));
    };

    const processCalendarData = (data) => {
        return {
            id: data.event.id,
            title: data.event.title,
            description: data.event.extendedProps.description,
            date: new Date(data.event.startStr).toISOString().split("T")[0],
            startTime: new Date(data.event.startStr)
                .toTimeString()
                .split(" ")[0],
            endTime: new Date(data.event.endStr).toTimeString().split(" ")[0],
            room: data.event.extendedProps.room,
        };
    };

    const handleSelect = async (selectInfo) => {
        setEventInfos(selectInfo);
        setIsEditCard(false);
        dispatch(toggleModal(true));
    };

    const handleEventClick = async (clickInfo) => {
        setEventInfos(clickInfo);
        setIsEditCard(true);
        dispatch(toggleModal(true));
    };

    const handleEventChange = async (changeInfo) => {
        try {
            const processedData = processCalendarData(changeInfo);
            dispatch(updateSchedule(processedData));
        } catch {
            CustomeAlert.error("Something error");
        }
    };

    const handleDateChange = (direction) => {
        if (calApi) {
            switch (direction) {
                case "prevYear":
                    calApi.prevYear();
                    break;
                case "prev":
                    calApi.prev();
                    break;
                case "today":
                    calApi.today();
                    break;
                case "next":
                    calApi.next();
                    break;
                case "nextYear":
                    calApi.nextYear();
                    break;
                case "month":
                    calApi.changeView("dayGridMonth");
                    break;
                case "week":
                    calApi.changeView("timeGridWeek");
                    break;
                case "day":
                    calApi.changeView("timeGridDay");
                    break;
                case "list":
                    calApi.changeView("listMonth");
                    break;
                default:
                    break;
            }
        }

        setDate(calApi.view.title);
    };

    return (
        <div id="calendar">
            <Box>
                <ModalSchedule
                    eventInfos={eventInfos}
                    isEditCard={isEditCard}
                />
                <Grid container spacing={3} className="headerToolBar">
                    <Grid item>
                        <Button
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
                                variant={
                                    selected === 0 ? "contained" : "outlined"
                                }
                                onClick={() => {
                                    handleDateChange("month");
                                    setSelected(0);
                                }}
                            >
                                <CalendarViewMonthIcon />
                            </Button>
                            <Button
                                variant={
                                    selected === 1 ? "contained" : "outlined"
                                }
                                onClick={() => {
                                    handleDateChange("week");
                                    setSelected(1);
                                }}
                            >
                                <CalendarViewWeekIcon />
                            </Button>
                            <Button
                                variant={
                                    selected === 2 ? "contained" : "outlined"
                                }
                                onClick={() => {
                                    handleDateChange("day");
                                    setSelected(2);
                                }}
                            >
                                <CalendarViewDayIcon />
                            </Button>
                            <Button
                                variant={
                                    selected === 3 ? "contained" : "outlined"
                                }
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
                <FullCalendar
                    dayMaxEvents={true}
                    defaultAllDay={false}
                    editable={true}
                    height={800}
                    selectable={true}
                    selectMirror={true}
                    headerToolbar={false}
                    initialView="dayGridMonth"
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                    ]}
                    events={processReduxData(schedules)}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    eventChange={handleEventChange}
                    selectAllow={(s) =>
                        ~~(Math.abs(s.end - 864e5 - s.start) / 864e5) < 1
                    }
                    eventTimeFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                />
            </Box>
        </div>
    );
}

export default Schedule;
