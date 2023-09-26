import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"
import { Link, Stack, Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Swal from "sweetalert2";
import CustomeTextField from "../../Member/Input/CustomeTextField";
import CustomeLoadingButton from "../../Member/Button/CustomeLoadingButton";

const baseURL = "https://localhost:7226/apis/Account/ForgotPassword";
const isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [textError, setTextError] = useState("");

    async function callApi() {
        await axios.post(baseURL, email, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                checkStatus(response.data)
            })
            .catch(() => Swal.fire('Error!', 'Some error, try again!', 'error'));
    }

    async function checkStatus(status) {
        console.log(status);
        if (status) {
            Swal.fire('Success!', 'Send email success!', 'success')
        } else {
            Swal.fire('Error!', 'Not found email!', 'error')
        }
    }

    const handleInput = (event) => {
        const email = event.target.value;
        if (email.length === 0) {
            setTextError("");
            setInputError(false);
        } else if (!isEmail(email)) {
            setTextError("Please enter valid email address");
            setInputError(true);
        } else {
            setTextError("");
            setInputError(false);
        }
        setEmail(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.length === 0) {
            setTextError("Please enter your email");
            setInputError(true);
            return;
        } else if (!isEmail(email)) {
            setTextError("Please enter valid email address");
            setInputError(true);
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
                        <CustomeTextField
                            error={inputError}
                            helperText={textError}
                            label="Email"
                            name="email"
                            onChange={handleInput}
                            placeholder="Enter your email"
                            type="text"
                            value={email}
                        />
                        <CustomeLoadingButton loading={loading}>
                            Send request
                        </CustomeLoadingButton>
                        <Link
                            alignItems="center"
                            color="inherit"
                            display={"inline-flex"}
                            href="/login"
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