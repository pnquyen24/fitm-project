import axiosClient from "../../Variable/Api/axiosClient";

const GET_ALL_SCHEDULES = "PracticalSchedule/ViewPracticalSchedules";
const CREATE_SCHEDULE = "PracticalSchedule/AddPracticalSchedule";
const UPDATE_SCHEDULE = "PracticalSchedule/UpdatePracticalSchedule";
const DELETE_SCHEDULE = (id) => `PracticalSchedule/DeletePracticalSchedule?id=${id}`;

export const getAllSchedules = async () => {
    try {
        const response = await axiosClient.get(GET_ALL_SCHEDULES);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const createSchedule = async (data) => {
    try {
        const response = await axiosClient.post(CREATE_SCHEDULE, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateSchedule = async (data) => {
    try {
        const response = await axiosClient.put(UPDATE_SCHEDULE, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteSchedule = async ({ id }) => {
    try {
        const response = await axiosClient.delete(DELETE_SCHEDULE(id));
        return response.data;
    } catch (error) {
        return error;
    }
};