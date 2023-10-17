import axiosClient from "../../Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_ATTENDANCE_LIST_URL = "AttendancePractical/ViewAttendanceList";
const UPDATE_ATTENDANCE_LIST_URL = "AttendancePractical/UpdateAttendanceList";

const initialState = {
    list: [],
    status: "idle",
    error: null,
};

export const fetchList = createAsyncThunk(
    "attendance/fetchSchedules",
    async (scheduleId) => {
        const response = await axiosClient.get(
            `${GET_ATTENDANCE_LIST_URL}?scheduleId=${scheduleId}`
        );
        return response.data;
    }
);

export const updateList = createAsyncThunk(
    "attendance/updateSchedule",
    async (updatedSchedule) => {
        const response = await axiosClient.put(
            UPDATE_ATTENDANCE_LIST_URL,
            updatedSchedule
        );
        return response.data;
    }
);

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(updateList.fulfilled, (state, action) => {
                const updatedSchedule = action.payload;
                state.list = state.attendance.map((member) => {
                    if (member.id === updatedSchedule.id) {
                        return updatedSchedule;
                    }
                    return member;
                });
            });
    },
});

export const selectAllAttendance = (state) => state.attendance.list;
export const getAttendanceStatus = (state) => state.attendance.status;
export const getAttendanceError = (state) => state.attendance.error;

export default attendanceSlice.reducer;
