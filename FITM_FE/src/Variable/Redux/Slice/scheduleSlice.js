import CustomeAlert from "../../../Components/Member/Alert/CustomeAlert";
import axiosClient from "../../Api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//--------------------------------------------------
//Practical schedule
const GET_ALL_PRACTICAL_SCHEDULES_URL =
    "PracticalSchedule/ViewPracticalSchedules";
const CREATE_PRACTICAL_SCHEDULE_URL = "PracticalSchedule/AddPracticalSchedule";
const UPDATE_PRACTICAL_SCHEDULE_URL =
    "PracticalSchedule/UpdatePracticalSchedule";
const DELETE_PRACTICAL_SCHEDULE_URL = (id) =>
    `PracticalSchedule/DeletePracticalSchedule?id=${id}`;

//Performance schedule
const GET_ALL_PERFORMANCE_SCHEDULES_URL =
    "PerformanceSchedule/ViewAllPerformance";
const CREATE_PERFORMANCE_SCHEDULE_URL = "PerformanceSchedule/Create";
const UPDATE_PERFORMANCE_SCHEDULE_URL = "PerformanceSchedule/Update";
const DELETE_PERFORMANCE_SCHEDULE_URL = (pfmID) =>
    `PerformanceSchedule/Delete?pfmID=${pfmID}`;

//--------------------------------------------------
const initialState = {
    practicals: [],
    performances: [],
    isModalOpen: false,
};

//--------------------------------------------------
//Practical schedule
export const fetchPracticals = createAsyncThunk(
    "schedules/fetchPracticals",
    async () => {
        const response = await axiosClient.get(GET_ALL_PRACTICAL_SCHEDULES_URL);
        return response.data;
    }
);

export const createPractical = createAsyncThunk(
    "schedules/createPractical",
    async (newSchedule) => {
        const response = await axiosClient.post(
            CREATE_PRACTICAL_SCHEDULE_URL,
            newSchedule
        );
        return response.data;
    }
);

export const updatePractical = createAsyncThunk(
    "schedules/updatePractical",
    async (updatedSchedule) => {
        const response = await axiosClient.put(
            UPDATE_PRACTICAL_SCHEDULE_URL,
            updatedSchedule
        );
        return response.data;
    }
);

export const deletePractical = createAsyncThunk(
    "schedules/deletePractical",
    async (scheduleId) => {
        const { id } = scheduleId;
        await axiosClient.delete(DELETE_PRACTICAL_SCHEDULE_URL(id));
        return scheduleId;
    }
);

//Performance schedule
export const fetchPerformances = createAsyncThunk(
    "schedules/fetchPerformance",
    async () => {
        const response = await axiosClient.get(
            GET_ALL_PERFORMANCE_SCHEDULES_URL
        );
        return response.data;
    }
);

export const createPerformance = createAsyncThunk(
    "schedules/createPerformance",
    async (newSchedule) => {
        const response = await axiosClient.post(
            CREATE_PERFORMANCE_SCHEDULE_URL,
            newSchedule
        );
        return response.data;
    }
);

export const updatePerformance = createAsyncThunk(
    "schedules/updatePerformance",
    async (updatedSchedule) => {
        const response = await axiosClient.put(
            UPDATE_PERFORMANCE_SCHEDULE_URL,
            updatedSchedule
        );
        return response.data;
    }
);

export const deletePerformance = createAsyncThunk(
    "schedules/deletePerformance",
    async (scheduleId) => {
        const { id } = scheduleId;
        await axiosClient.delete(DELETE_PERFORMANCE_SCHEDULE_URL(id));
        return scheduleId;
    }
);
//--------------------------------------------------

const schedulesSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.isModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //Practical schedule
            .addCase(fetchPracticals.fulfilled, (state, action) => {
                state.practicals = action.payload;
            })
            .addCase(createPractical.fulfilled, (state, action) => {
                state.practicals.push(action.payload);
            })
            .addCase(updatePractical.fulfilled, (state, action) => {
                const updatedSchedule = action.payload;
                state.practicals = state.practicals.map((schedule) => {
                    if (schedule.id === updatedSchedule.id) {
                        return updatedSchedule;
                    }
                    return schedule;
                });
            })
            .addCase(deletePractical.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.practicals = state.practicals.filter(
                    (schedule) => schedule.id !== id
                );
            })
            //Performance Schedule
            .addCase(fetchPerformances.fulfilled, (state, action) => {
                state.performances = action.payload;
            })
            .addCase(createPerformance.fulfilled, (state, action) => {
                state.performances.push(action.payload)
                CustomeAlert.success("Created Successfuly!");
            })
            .addCase(createPerformance.rejected, (state, action) => {
                CustomeAlert.error("Created Error");
            })
            .addCase(updatePerformance.fulfilled, (state, action) => {
                const updatedSchedule = action.payload;
                state.performances = state.performances.map((schedule) => {
                    if (schedule.id === updatedSchedule.id) {
                        return updatedSchedule;
                    }
                    return schedule;
                });
                CustomeAlert.success("Updated successfully");
            })
            .addCase(updatePerformance.rejected, (state, action) => {
                CustomeAlert.error("Updated Error");
            })
            .addCase(deletePerformance.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.performances = state.performances.filter(
                    (schedule) => schedule.id !== id
                );
                CustomeAlert.success("Deleted Successfully");
            })
            .addCase(deletePerformance.rejected, (state, action) => {
                CustomeAlert.error("Deleted Error");
            });
    },
});

export const { toggleModal } = schedulesSlice.actions;
export const getIsModalOpen = (state) => state.schedules.isModalOpen;

export const selectAllPracticals = (state) => state.schedules.practicals;
export const selectAllPerformances = (state) => state.schedules.performances;

export default schedulesSlice.reducer;
