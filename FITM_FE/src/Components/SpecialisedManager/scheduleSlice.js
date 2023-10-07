import axiosClient from "../../Variable/Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_ALL_SCHEDULES_URL = "PracticalSchedule/ViewPracticalSchedules";
const CREATE_SCHEDULE_URL = "PracticalSchedule/AddPracticalSchedule";
const UPDATE_SCHEDULE_URL = "PracticalSchedule/UpdatePracticalSchedule";
const DELETE_SCHEDULE_URL = (id) =>
    `PracticalSchedule/DeletePracticalSchedule?id=${id}`;

const initialState = {
    schedules: [],
    status: "idle",
    error: null,
};

export const fetchSchedules = createAsyncThunk(
    "schedules/fetchSchedules",
    async () => {
        const response = await axiosClient.get(GET_ALL_SCHEDULES_URL);
        return response.data;
    }
);

export const createSchedule = createAsyncThunk(
    "schedules/createSchedule",
    async (newSchedule) => {
        const response = await axiosClient.post(
            CREATE_SCHEDULE_URL,
            newSchedule
        );
        return response.data;
    }
);

export const updateSchedule = createAsyncThunk(
    "schedules/updateSchedule",
    async (updatedSchedule) => {
        const response = await axiosClient.put(
            UPDATE_SCHEDULE_URL,
            updatedSchedule
        );
        return response.data;
    }
);

export const deleteSchedule = createAsyncThunk(
    "schedules/deleteSchedule",
    async (scheduleId) => {
        const { id } = scheduleId;
        await axiosClient.delete(DELETE_SCHEDULE_URL(id));
        return scheduleId;
    }
);

const schedulesSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedules.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchSchedules.fulfilled, (state, action) => {
                state.schedules = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSchedules.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.schedules.push(action.payload);
            })
            .addCase(updateSchedule.fulfilled, (state, action) => {
                const updatedSchedule = action.payload;
                state.schedules = state.schedules.map((schedule) => {
                    if (schedule.id === updatedSchedule.id) {
                        return updatedSchedule;
                    }
                    return schedule;
                });
            })
            .addCase(deleteSchedule.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.schedules = state.schedules.filter(
                    (schedule) => schedule.id !== id
                );
            });
    },
});

export const selectAllSchedules = (state) => state.schedules.schedules;
export const getScheduleStatus = (state) => state.schedules.status;
export const getScheduleError = (state) => state.schedules.error;

export default schedulesSlice.reducer;
