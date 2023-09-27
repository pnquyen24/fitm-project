import {
    Button,
    Card,
    CardActions,
    CardContent,
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
    TextField
} from "@mui/material";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const navigate = useNavigate();

    function onLoginHandle(){
        if (username === "" || password === ""){
            setIsUsernameValid(username !== "");
            setIsPasswordValid(password !== "");
            return;
        }

        axios.post("https://localhost:7226/Acount/Login",{username, password})
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
            <div>
                <Container className='login container' maxWidth="xs">
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <h1>Login</h1>
                                <TextField error={!isUsernameValid} required label="Username" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)}/>
                                <TextField error={!isPasswordValid} required type='password' label="Password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)}/>
                                <Stack direction="row" justifyContent='space-between' alignItems='center'>
                                    <FormControlLabel label="Remember me" control={<Checkbox checked={isRemember} onChange={(event) => setIsRemember(event.target.checked)}/>}/>
                                    <Link href="forgotPassword" underline='none' style={{color: '#696cff'}}>Forgot password</Link>
                                </Stack>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => onLoginHandle()}>Login</Button>
                        </CardActions>
                    </Card>
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