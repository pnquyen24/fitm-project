import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
};

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setTheme } = colorSlice.actions;
export const getThemeStatus = (state) => state.color.status;

export default colorSlice.reducer;
