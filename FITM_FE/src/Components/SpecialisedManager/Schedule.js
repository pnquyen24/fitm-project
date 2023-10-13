import React, { useEffect, useState } from "react";
import "./Schedule.css";
import ModalSchedule from "./ModalSchedule";
import UseOpenClosed from "./UseOpenClosed";
import {
    fetchSchedules,
    getScheduleError,
    getScheduleStatus,
    selectAllSchedules,
    updateSchedule,
} from "./scheduleSlice";
import CustomeAlert from "../Member/Alert/CustomeAlert";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useDispatch, useSelector } from "react-redux";

function Schedule() {
    const dispatch = useDispatch();
    const schedules = useSelector(selectAllSchedules);
    const scheduleStatus = useSelector(getScheduleStatus);
    const error = useSelector(getScheduleError);
    const modalInfosEvent = UseOpenClosed(false);

    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();

    useEffect(() => {
        if (scheduleStatus === "idle") {
            dispatch(fetchSchedules());
        }
    }, [scheduleStatus, dispatch]);

    const processReduxData = (data) => {
        return data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            start: item.startDate,
            end: item.endDate,
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
            startDate: data.event.startStr,
            endDate: data.event.endStr,
            room: data.event.extendedProps.room,
        };
    };

    const handleSelect = async (selectInfo) => {
        setEventInfos(selectInfo);
        setIsEditCard(false);
        modalInfosEvent.handleOpen();
    };

    const handleEventClick = async (clickInfo) => {
        setEventInfos(clickInfo);
        setIsEditCard(true);
        modalInfosEvent.handleOpen();
    };

    const handleEventChange = async (changeInfo) => {
        try {
            const processedData = processCalendarData(changeInfo);
            dispatch(updateSchedule(processedData));
        } catch {
            CustomeAlert.error(error);
        }
    };

    return (
        <div id="calendar">
            <Box>
                <ModalSchedule
                    open={modalInfosEvent.isOpen}
                    handleClose={modalInfosEvent.handleClose}
                    eventInfos={eventInfos}
                    isEditCard={isEditCard}
                />
                <FullCalendar
                    dayMaxEvents={true}
                    defaultAllDay={false}
                    editable={true}
                    height={800}
                    selectable={true}
                    selectMirror={true}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    events={processReduxData(schedules)}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    eventChange={handleEventChange}
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
