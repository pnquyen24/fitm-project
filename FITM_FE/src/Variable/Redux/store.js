import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./Slice/scheduleSlice";
import attendancePracticalSlice from "./Slice/attendancePracticalSlice";
import colorSlice from "./Slice/colorSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
        attendance: attendancePracticalSlice,
        color: colorSlice,
    },
});

export default store;
