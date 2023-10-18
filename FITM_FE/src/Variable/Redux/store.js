import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./Slice/scheduleSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
    },
});

export default store;
