import axiosClient from "../../Variable/Api/axiosClient";

const CREATE_EVENT_CALENDAR = "apis/PracticalSchedule/AddPracticalSchedule";
const GET_ALL_EVENTS_CALENDAR = "apis/PracticalSchedule/ViewPracticalSchedules";
const UPDATE_EVENT_CALENDAR = "apis/PracticalSchedule/UpdatePracticalSchedule";
const DELETE_EVENT_CALENDAR = (id) => `apis/PracticalSchedule/DeletePracticalSchedule/${id}`;

export const createEventCalendar = async (data) => {
    try {
        const response = await axiosClient.post(CREATE_EVENT_CALENDAR, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllEventsCalendar = async () => {
    try {
        const response = await axiosClient.get(GET_ALL_EVENTS_CALENDAR);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateEventCalendar = async (data) => {
    try {
        const response = await axiosClient.put(UPDATE_EVENT_CALENDAR, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteEventCalendar = async ({ id }) => {
    try {
        const response = await axiosClient.delete(DELETE_EVENT_CALENDAR(id));
        return response.data;
    } catch (error) {
        return error;
    }
};