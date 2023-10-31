import axiosClient from "../../Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_ATTENDANCE_LIST_URL = "PracticalDetail/ViewAttendanceList";
const UPDATE_ATTENDANCE_LIST_URL = "PracticalDetail/UpdateAttendanceList";
const GET_PRACTICAL_PRODUCTIVITY_LIST_URL = "PracticalDetail/ViewProductivity";

const initialState = {
    list: [],
    productivityList: [],
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

export const getProductivityList = createAsyncThunk(
    "attendance/getProductivityList",
    async () => {
        const response = await axiosClient.get(
            GET_PRACTICAL_PRODUCTIVITY_LIST_URL
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
            })
            .addCase(getProductivityList.fulfilled, (state, action) => {
                state.productivityList = action.payload;
            });
    },
});

export const getAttendancePractical = (state) => state.attendance.list;
export const getPracticalProductivity = (state) =>
    state.attendance.productivityList;

export default attendancePracticalSlice.reducer;
