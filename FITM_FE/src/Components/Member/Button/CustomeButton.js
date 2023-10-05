import React from "react";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";

const CssButton = styled(Button)({
    backgroundColor: "#696cff",
    "& .MuiTouchRipple-root": {
        color: "#fff",
    },
    "&:hover": {
        backgroundColor: "#5f62ff",
        borderColor: "#5f62ff",
    },
});

function CustomeButton(props) {
    return (
        <CssButton
            fullWidth
            variant="contained"
            {...props}
        />
    );
}

export default CustomeButton;