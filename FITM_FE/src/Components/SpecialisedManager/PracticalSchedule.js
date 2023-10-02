import React, { useEffect, useState } from "react";
import "./PracticalSchedule.css";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    createEventCalendar,
    getAllEventsCalendar,
    updateEventCalendar,
    deleteEventCalendar
} from "./eventCalendarApi"

function PracticalSchedule() {
    const [events, setEvents] = useState([]);
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();

    useEffect(() => {
        const fetchEvent = async () => {
            const events = Object.values(await getAllEventsCalendar());
            setEvents(events.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    start: item.startDate,
                    end: item.endDate,
                    room: item.room,
                    backgroundColor: item.backgroundColor,
                    textColor: item.textColor
                }
            }));
        };
        fetchEvent();
    }, []);

    const handleSelect = async (selectInfo) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
    }

    const handleEventClick = async (clickInfo) => {
        setIsEditCard(true);
        setEventInfos(clickInfo);
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
            // const jsonData = JSON.stringify(eventUpdated);
            // await updateEventCalendar(jsonData);
            await updateEventCalendar(eventUpdated);
        } catch {
            console.log("Something error!");
        }
    }

    return (
        <div id="calendar">
            <Box>
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