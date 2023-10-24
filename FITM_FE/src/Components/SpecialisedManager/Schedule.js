import React, { useEffect, useState, useRef } from "react";
import "./Schedule.css";
import ModalSchedule from "./ModalSchedule";
import CustomeAlert from "../Member/Alert/CustomeAlert";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPerformances,
    fetchPracticals,
    selectAllPerformances,
    selectAllPracticals,
    toggleModal,
    updatePractical,
} from "../../Variable/Redux/Slice/scheduleSlice";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import HeaderCalendar from "../Member/Schedule/HeaderCalendar/HeaderCalendar";

function Schedule() {
    const dispatch = useDispatch();
    const practicals = useSelector(selectAllPracticals);
    const performances = useSelector(selectAllPerformances);

    const calendarRef = useRef(null);

    const [calApi, setCalApi] = useState();
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        setCalApi(calendarRef.current?.getApi());
        if (calApi) {
            setDate(calApi.view.title);
        }
    }, [calApi]);

    useEffect(() => {
        dispatch(fetchPracticals());
        dispatch(fetchPerformances());
    }, [dispatch]);

    function processPracticals(data) {
        return data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            start: new Date(`${item.date}T${item.startTime}`),
            end: new Date(`${item.date}T${item.endTime}`),
            room: item.room,
            type: "practical",
            color: "#1677ff",
            display: "block",
        }));
    }

    function processPerformances(data) {
        return data.map((item) => ({
            id: item.id,
            name: item.name,
            place: item.place,
            start: new Date(`${item.date}T${item.time}`),
            backgroundImg: item.backgroundImg,
            type: "performance",
            color: "#ff0000",
            display: "block",
        }));
    }

    function processCalendarData(data) {
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
    }

    function combineEvent() {
        return [
            ...processPracticals(practicals),
            ...processPerformances(performances),
        ];
    }

    function handleSelect(selectInfo) {
        const current = new Date();
        if (selectInfo.end < current) {
            CustomeAlert.warning("Can not create schedule");
            return;
        }
        setEventInfos(selectInfo);
        setIsEditCard(false);
        dispatch(toggleModal(true));
    }

    function handleEventClick(clickInfo) {
        setEventInfos(clickInfo);
        setIsEditCard(true);
        dispatch(toggleModal(true));
    }

    function handleEventChange(changeInfo) {
        try {
            const processedData = processCalendarData(changeInfo);
            dispatch(updatePractical(processedData));
        } catch {
            CustomeAlert.error("Something error");
        }
    }

    function isToday() {
        const current = new Date();
        const start = calApi?.view.currentStart;
        const end = calApi?.view.currentEnd;
        return current >= start && current < end;
    }

    function handleDateChange(direction) {
        if (!calApi) return;

        const actions = {
            prevYear: () => calApi.prevYear(),
            prev: () => calApi.prev(),
            today: () => calApi.today(),
            next: () => calApi.next(),
            nextYear: () => calApi.nextYear(),
            month: () => calApi.changeView("dayGridMonth"),
            week: () => calApi.changeView("timeGridWeek"),
            day: () => calApi.changeView("timeGridDay"),
            list: () => calApi.changeView("listWeek"),
        };

        actions[direction] && actions[direction]();

        setDate(calApi.view.title);
    }

    return (
        <div id="calendar">
            <Box>
                <ModalSchedule
                    eventInfos={eventInfos}
                    isEditCard={isEditCard}
                />
                <HeaderCalendar
                    date={date}
                    isToday={isToday}
                    handleDateChange={handleDateChange}
                />
                <FullCalendar
                    height={800}
                    dayMaxEvents={true}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    defaultAllDay={false}
                    headerToolbar={false}
                    initialView="dayGridMonth"
                    selectAllow={(s) =>
                        ~~(Math.abs(s.end - 864e5 - s.start) / 864e5) < 1
                    }
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                    ]}
                    events={combineEvent()}
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
