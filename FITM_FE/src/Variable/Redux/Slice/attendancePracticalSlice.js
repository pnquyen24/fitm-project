import axiosClient from "../../Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_ATTENDANCE_LIST_URL = "PracticalDetail/ViewAttendanceList";
const UPDATE_ATTENDANCE_LIST_URL = "PracticalDetail/UpdateAttendanceStatus";
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
    reducers: {
        setAttendance: (state, action) => {
            const { id, attendance } = action.payload;
            const member = state.list.find((item) => item.id === id);
            if (member) {
                member.attendance = attendance;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(updateList.fulfilled, (state, action) => {
                const updatedList = action.payload;
                state.list = state.list.map((member) => {
                    const update = updatedList.find(
                        (item) => item.id === member.id
                    );
                    if (update) {
                        return {
                            ...member,
                            attendance: update.attendance,
                        };
                    }
                    return member;
                });
            })
            .addCase(getProductivityList.fulfilled, (state, action) => {
                state.productivityList = action.payload;
            });
    },
});

export const { setAttendance } = attendancePracticalSlice.actions;

export const getAttendancePractical = (state) => state.attendance.list;
export const getPracticalProductivity = (state) =>
    state.attendance.productivityList;

export default attendancePracticalSlice.reducer;
