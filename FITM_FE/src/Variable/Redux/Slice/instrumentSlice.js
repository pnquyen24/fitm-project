import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../Api/axiosClient";

const GET_ALL_INSTRUMENT_URL = "Instrument/GetAllInstrument";
const CREATE_INSTRUMENT_URL = "Instrument/Create";
const UPDATE_INSTRUMENT_URL = "Instrument/Update";

const initialState = {
    instruments: [],
    isModalInstrumentOpen: false,
};

export const getAllInstruments = createAsyncThunk(
    "instrument/getAllInstruments",
    async () => {
        const response = await axiosClient.get(GET_ALL_INSTRUMENT_URL);
        return response.data;
    }
);

export const createInstruments = createAsyncThunk(
    "Instrument/createInstruments",
    async (newInstrument) => {
        const response = await axiosClient.post(
            CREATE_INSTRUMENT_URL,
            newInstrument
        );
        return response.data;
    }
);

export const updateInstruments = createAsyncThunk(
    "instrument/updateInstruments",
    async (updatedInstrument) => {
        const response = await axiosClient.put(
            UPDATE_INSTRUMENT_URL,
            updatedInstrument
        );
        return response.data;
    }
);

const instrumentSlice = createSlice({
    name: "instrument",
    initialState,
    reducers: {
        toggleModalInstrument: (state, action) => {
            state.isModalInstrumentOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllInstruments.fulfilled, (state, action) => {
                state.instruments = action.payload;
            })
            .addCase(createInstruments.fulfilled, (state, action) => {
                let isFound = false;
                const newInstrument = action.payload;
                state.instruments.map((i) => {
                    if (i.id === newInstrument.id) {
                        i.itemIds = newInstrument.itemIds;
                        isFound = true;
                    }
                    return i;
                });
                if (!isFound) {
                    state.instruments.push(newInstrument);
                }
            })
            .addCase(updateInstruments.fulfilled, (state, action) => {
                const updatedInstrument = action.payload;
                state.instruments.map((i) => {
                    i.itemIds.map((item) => {
                        if (item.id === updatedInstrument.id) {
                            item.status = updatedInstrument.status;
                        }
                        return item;
                    });
                    return i;
                });
            });
    },
});

export const { toggleModalInstrument } = instrumentSlice.actions;
export const getIsModalInstrumentOpen = (state) =>
    state.instrument.isModalInstrumentOpen;

export const getInstruments = (state) => state.instrument.instruments;

export default instrumentSlice.reducer;
