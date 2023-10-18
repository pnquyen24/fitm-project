import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "../../Components/SpecialisedManager/scheduleSlice";
import attendanceSlice from "./Slice/attendanceSlice";
import colorSlice from "./Slice/colorSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
        attendance: attendanceSlice,
        color: colorSlice,
    },
});

export default store;
