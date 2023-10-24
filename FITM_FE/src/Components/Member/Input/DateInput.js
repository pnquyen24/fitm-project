import React from "react";
import styled from "@mui/material/styles/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

const CssTimeInput = styled(DatePicker)({
    "& label": {
        color: "#ccc",
        "&.Mui-focused": {
            color: "#696cff",
        },
        "&.Mui-error": {
            color: "red",
        },
    },
    "& .MuiInputBase-root": {
        margin: "16px 0 8px 0",
        "& fieldset": {
            borderColor: "#ccc",
        },
        "&:hover fieldset": {
            borderColor: "#b4b2b7",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#696cff",
        },
        "&.Mui-error fieldset": {
            borderColor: "red",
        },
    },
});

function DateInput(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <CssTimeInput
                slotProps={{
                    textField: {
                        size: "small",
                    },
                }}
                {...props}
            />
        </LocalizationProvider>
    );
}

export default DateInput;
