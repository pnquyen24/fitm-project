import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PracticalSchedule.css";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const baseURL = "https://localhost:7226/apis/PracticalSchedule/ViewPracticalSchedules";

function PracticalSchedule() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios.get(baseURL)
            .then((response) => {
                const events = response.data.map(item => {
                    return {
                        title: item.title,
                        start: item.startDate,
                        end: item.endDate
                    }
                });
                setEvents(events);
            })
            .catch((error) => {
                // error
                console.log(error.message);
            });
    }, []);

    return (
        <div id="calendar">
            <Box>
                <FullCalendar
                    editable
                    events={events}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    selectable
                />
            </Box>
        </div>
    );
}

export default PracticalSchedule;