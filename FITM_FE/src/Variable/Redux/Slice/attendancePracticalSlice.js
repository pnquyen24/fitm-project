import axiosClient from "../../Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_ATTENDANCE_LIST_URL = "PracticalDetail/ViewAttendanceList";
const UPDATE_ATTENDANCE_LIST_URL = "PracticalDetail/UpdateAttendanceList";

const initialState = {
    list: [],
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

const attendancePracticalSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(updateList.fulfilled, (state, action) => {
                const updatedSchedule = action.payload;
                state.list = state.list.map((member) => {
                    if (member.id === updatedSchedule.id) {
                        return updatedSchedule;
                    }
                    return member;
                });
            });
    },
});

export const getAttendancePractical = (state) => state.attendance.list;

export default attendancePracticalSlice.reducer;
