import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "../../Components/SpecialisedManager/scheduleSlice";

const store = configureStore({
    reducer: {
        schedules: scheduleSlice,
    },
});

export default store;
