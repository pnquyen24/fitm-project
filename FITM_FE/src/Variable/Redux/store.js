import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./Slice/scheduleSlice";
import attendancePracticalSlice from "./Slice/attendancePracticalSlice";
import colorSlice from "./Slice/colorSlice";
import instrumentSlice from "./Slice/instrumentSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
        attendance: attendancePracticalSlice,
        color: colorSlice,
        instrument: instrumentSlice,
    },
});

export default store;
