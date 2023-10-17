import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./Slice/scheduleSlice";
import colorSlice from "./Slice/colorSlice";
import attendanceSlice from "./Slice/attendanceSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
        attendance: attendanceSlice,
        color: colorSlice,
    },
});

export default store;
