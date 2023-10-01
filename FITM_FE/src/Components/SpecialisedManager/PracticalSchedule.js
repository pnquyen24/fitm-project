import React from "react";
import "./PracticalSchedule.css";
import { Container, Paper } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

function PracticalSchedule() {
    return (
        <div>
            <Container>
                <Paper elevation={3}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        }}
                        initialView="dayGridMonth"
                    />
                </Paper>
            </Container>
        </div>
    );
}

export default PracticalSchedule;