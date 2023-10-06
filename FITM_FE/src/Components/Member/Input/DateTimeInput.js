import React from "react";
import styled from '@mui/material/styles/styled';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/en-gb";

const CssDateTimeInput = styled(DateTimePicker)({
    "& label": {
        color: "#ccc",
        "&.Mui-focused": {
            color: "#696cff",
        },
        "&.Mui-error": {
            color: "red",
        }
    },
    "& .MuiInputBase-root": {
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
            borderColor: "red"
        }
    }
});

function DateTimeInput(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <CssDateTimeInput
                ampm={false}
                slotProps={{
                    textField: {
                        size: "small"
                    }
                }}
                {...props}
            />
        </LocalizationProvider>
    );
}

export default DateTimeInput;