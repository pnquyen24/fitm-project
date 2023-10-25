import React from "react";
import styled from "@mui/material/styles/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const CssTimeInput = styled(TimePicker)({
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

function TimeInput(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssTimeInput
                ampm={false}
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                }}
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

export default TimeInput;
