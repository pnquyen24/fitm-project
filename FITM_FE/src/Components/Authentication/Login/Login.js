import {
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Link,
    Stack,
    Typography
} from "@mui/material";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import './login.css';
import CustomeTextField from "../../Member/Input/CustomeTextField";
import CustomeButton from "../../Member/Button/CustomeButton";

function Login() {
    const navigate = useNavigate();

    function onLoginHandle() {
        if (username === "" || password === "") {
            setIsUsernameValid(username !== "");
            setIsPasswordValid(password !== "");
            return;
        }

        axios.post("https://localhost:7226/Acount/Login", { username, password })
            .then(res => {
                localStorage.setItem("token", res.data);
                localStorage.setItem("saved", isRemember ? "saved" : "")
            })
            .then(() => {
                navigate("/home")
            })
            .catch(error => {
                setIsOpen(true)
                setErrorMessage(error.message)
            })
    }

    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [isRemember, setIsRemember] = useState(false);
    var [isUsernameValid, setIsUsernameValid] = useState(true);
    var [isPasswordValid, setIsPasswordValid] = useState(true);
    var [isOpen, setIsOpen] = useState(false);
    var [errorMessage, setErrorMessage] = useState("")

    return (
        <div className="loginCover">
            <div className="loginBG"></div>
            <Container className='login container' maxWidth="xs">
                <Stack borderRadius={2} padding={3} spacing={3}>
                    <Typography className="title" variant="h4" align="center">Login</Typography>
                    <Stack spacing={2}>
                        <CustomeTextField autoFocus InputLabelProps={{ required: false }} error={!isUsernameValid} required label="Username" placeholder="Enter your username" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <CustomeTextField InputLabelProps={{ required: false }} error={!isPasswordValid} required type='password' label="Password" placeholder="●●●●●●●●" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <Stack direction="row" justifyContent='space-between' alignItems='center'>
                            <FormControlLabel label="Remember me" control={<Checkbox checked={isRemember} onChange={(event) => setIsRemember(event.target.checked)} />} />
                            <Link to="/forgotPassword" underline='hover' component={RouterLink}>Forgot password</Link>
                        </Stack>
                        <CustomeButton fullWidth variant="contained" onClick={() => onLoginHandle()}>Login</CustomeButton>
                    </Stack>
                </Stack>
            </Container>
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle>Login fail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => setIsOpen(false)} autoFocus>Try again</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Login;