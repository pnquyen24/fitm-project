import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../Api/axiosClient";

const GET_ALL_INSTRUMENT_URL = "Instrument/GetAllInstrument";
const CREATE_INSTRUMENT_URL = "Instrument/Create";
const UPDATE_INSTRUMENT_URL = "Instrument/Update";
const DELETE_INSTRUMENT_URL = (id) => `Instrument/Delete?id=${id}`;

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
    "instrument/createInstruments",
    async (newInstrument) => {
        const response = await axiosClient.get(
            CREATE_INSTRUMENT_URL,
            newInstrument
        );
        return response.data;
    }
);

export const updateInstruments = createAsyncThunk(
    "instrument/updateInstruments",
    async (updatedInstrument) => {
        const response = await axiosClient.get(
            UPDATE_INSTRUMENT_URL,
            updatedInstrument
        );
        return response.data;
    }
);
export const deleteInstruments = createAsyncThunk(
    "instrument/deleteInstruments",
    async (instrumentId) => {
        const { id } = instrumentId;
        await axiosClient.get(DELETE_INSTRUMENT_URL(id));
        return instrumentId;
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
                state.instruments.push(action.payload);
            })
            .addCase(updateInstruments.fulfilled, (state, action) => {
                const updatedInstrument = action.payload;
                state.instruments = state.instruments.map((instrument) => {
                    if (instrument.id === updatedInstrument.id) {
                        return updatedInstrument;
                    }
                    return instrument;
                });
            })
            .addCase(deleteInstruments.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.instruments = state.instruments.filter(
                    (instrument) => instrument.id !== id
                );
            });
    },
});

export const { toggleModalInstrument } = instrumentSlice.actions;
export const getIsModalInstrumentOpen = (state) =>
    state.instrument.isModalInstrumentOpen;

export const getInstruments = (state) => state.instrument.instruments;

export default instrumentSlice.reducer;
