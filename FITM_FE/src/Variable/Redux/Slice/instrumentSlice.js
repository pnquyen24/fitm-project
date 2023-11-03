import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../Api/axiosClient";

const GET_ALL_INSTRUMENT_URL = "Instrument/GetAllInstrument";

const initialState = {
    instruments: [],
};

export const getAllInstruments = createAsyncThunk(
    "instrument/getAllInstruments",
    async () => {
        const response = await axiosClient.get(GET_ALL_INSTRUMENT_URL);
        return response.data;
    }
);

const instrumentSlice = createSlice({
    name: "instrument",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllInstruments.fulfilled, (state, action) => {
            state.instruments = action.payload;
        });
    },
});

export const getInstruments = (state) => state.instrument.instruments;

export default instrumentSlice.reducer;
