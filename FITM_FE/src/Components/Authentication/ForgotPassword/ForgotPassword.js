import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"
import {
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LoadingButton from "@mui/lab/LoadingButton";
import styled from '@mui/material/styles/styled';
import Swal from "sweetalert2";

const baseURL = "https://localhost:7226/apis/Account/ForgotPassword";
const CssTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
        color: "#ccc"
    },
    "& label.Mui-focused": {
        color: "#696cff"
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#696cff"
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#ccc"
        },
        "&:hover fieldset": {
            borderColor: "#696cff"
        },
        "&.Mui-focused fieldset": {
            borderColor: "#696cff"
        }
    }
});
const isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState();
    const [textError, setTextError] = useState("");

    async function callApi() {
        await axios.post(baseURL, email, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                setIsSuccess(response.data);
                checkStatus(isSuccess);
            })
            .catch(() => setIsSuccess(false));
        console.log(isSuccess);
    }

    async function checkStatus(status) {
        console.log(status);
        if (status) {
            Swal.fire(
                'Success!',
                'Send email success!',
                'success'
            )
        } else {
            Swal.fire(
                'Error!',
                'Please try again!',
                'error'
            )
        }
    }

    const handleEmail = (event) => {
        const email = event.target.value;
        if (email.length === 0) {
            setTextError("");
            setEmailError(false);
        } else if (!isEmail(email)) {
            setTextError("Please enter valid email address");
            setEmailError(true);
        } else {
            setTextError("");
            setEmailError(false);
        }
        setEmail(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.length === 0) {
            setTextError("Please enter your email");
            setEmailError(true);
            return;
        } else if (!isEmail(email)) {
            setTextError("Please enter valid email address");
            setEmailError(true);
            return;
        }
        setLoading(true);
        await callApi();
        setLoading(false);
    }

    return (
        <div className="form">
            <Stack className="container" borderRadius={2} padding={3} spacing={3}>
                <Stack spacing={1}>
                    <Typography className="title" variant="h5" align="left">
                        Forgot Password? 🔒
                    </Typography>
                    <Typography className="subTitle" variant="h7" align="left">
                        Enter your email and we'll send you instructions to reset your password
                    </Typography>
                </Stack>
                <form action="" onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ alignItems: "center" }}>
                        <CssTextField
                            autoFocus
                            error={emailError}
                            fullWidth
                            helperText={textError}
                            label="Email"
                            margin="normal"
                            name="email"
                            onChange={handleEmail}
                            placeholder="Enter your email"
                            type="text"
                            value={email}
                        />
                        <LoadingButton
                            disableElevation={true}
                            fullWidth
                            loading={loading}
                            type="submit"
                            variant="contained"
                        >
                            <span>Send request</span>
                        </LoadingButton>
                        <Link
                            alignItems="center"
                            color="inherit"
                            display={"inline-flex"}
                            href="#"
                            underline="hover"
                            variant="subtitle2"
                        >
                            <ArrowBackIosNewIcon sx={{ width: "16px" }} />{'Back to login'}
                        </Link>
                    </Stack>
                </form>
            </Stack>
        </div >
    );
}

export default ForgotPassword;