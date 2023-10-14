import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalSchedule from "./ModalSchedule";
import "./PracticalSchedule.css";
import { getAllSchedules, updateSchedule } from "./ScheduleApi";
import UseOpenClosed from "./useOpenClosed";

function PracticalSchedule() {
    const [events, setEvents] = useState([]);
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();

    const modalInfosEvent = UseOpenClosed(false);

    const fetchEvent = async () => {
        const events = Object.values(await getAllSchedules());
        setEvents(events.map(event => {
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                start: event.startDate,
                end: event.endDate,
                room: event.room,
                color: "#1677ff",
                display: "block",
            }
        }));
    };

    useEffect(() => {
        fetchEvent();
    }, [eventInfos]);

    const handleSelect = async (selectInfo) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
        modalInfosEvent.handleOpen();
        fetchEvent();
    }

    const handleEventClick = async (clickInfo) => {
        setIsEditCard(true);
        setEventInfos(clickInfo);
        modalInfosEvent.handleOpen();
    }

    const handleEventChange = async (changeInfo) => {
        try {
            const eventUpdated = {
                id: changeInfo.event.id,
                title: changeInfo.event.title,
                description: changeInfo.event.extendedProps.description,
                startDate: changeInfo.event.startStr,
                endDate: changeInfo.event.endStr,
                room: changeInfo.event.extendedProps.room,
                backgroundColor: changeInfo.event.backgroundColor,
                textColor: changeInfo.event.textColor
            }
            await updateSchedule(eventUpdated);
        } catch {
            console.log("Something error!");
        }
    }

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
                    dayMaxEvents={2}
                    defaultAllDay={false}
                    editable={true}
                    height={800}
                    selectable={true}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    events={events}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    eventChange={handleEventChange}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: false
                    }}
                />
            </Box>
        </div>
    );
}

export default PracticalSchedule;