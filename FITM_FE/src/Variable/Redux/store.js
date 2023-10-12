import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./Slice/scheduleSlice";
import colorSlice from "./Slice/colorSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
        color: colorSlice,
    },
});

export default store;
