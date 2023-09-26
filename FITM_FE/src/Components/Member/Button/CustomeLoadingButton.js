import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from '@mui/material/styles/styled';

const CssLoadingButton = styled(LoadingButton)({
    backgroundColor: "#696cff",
    "& .MuiLoadingButton-text": {
        color: "#fff",
    },
    "&:hover": {
        backgroundColor: "#5f62ff",
        borderColor: "#5f62ff",
    },
});

function CustomeLoadingButton(props) {
    return (
        <CssLoadingButton
            disableElevation={true}
            fullWidth
            type="submit"
            variant="contained"
            {...props}
        />
    );
}

export default CustomeLoadingButton;