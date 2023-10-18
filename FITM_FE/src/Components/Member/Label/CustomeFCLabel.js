import { FormControlLabel, styled, useRadioGroup } from "@mui/material";

const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
))(({ checked }) => ({
    // ".MuiFormControlLabel-label": checked && {
    //     color: "#696cff",
    // },
}));

function CustomeFCLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;
    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

export default CustomeFCLabel;
