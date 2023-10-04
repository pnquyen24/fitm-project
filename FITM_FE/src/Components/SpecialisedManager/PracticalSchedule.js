import React, { useEffect, useState } from "react";
import "./PracticalSchedule.css";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { getAllSchedules, updateSchedule } from "./ScheduleApi"
import ModalSchedule from "./ModalSchedule";
import UseOpenClosed from "./UseOpenClosed";

function PracticalSchedule() {
    const [events, setEvents] = useState([]);
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();

    const modalInfosEvent = UseOpenClosed(false);

    useEffect(() => {
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
                    backgroundColor: event.backgroundColor,
                    textColor: event.textColor
                }
            }));
        };
        fetchEvent();
    }, []);

    const handleSelect = async (selectInfo) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
        modalInfosEvent.handleOpen();
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
                    editable={true}
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
                />
            </Box>
        </div>
    );
}

export default PracticalSchedule;