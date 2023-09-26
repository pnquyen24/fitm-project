import React from "react";
import TextField from "@mui/material/TextField";
import styled from '@mui/material/styles/styled';

const CssTextField = styled(TextField)({
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

function CustomeTextField(props) {
    return (
        <CssTextField
            autoFocus
            fullWidth
            margin="normal"
            {...props}
        />
    );
}

export default CustomeTextField;