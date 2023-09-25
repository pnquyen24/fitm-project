
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./ChangePassword.css";

function ChangePassword({ isOpen, setOpen }) {

    let [inputOldPassword, setInputOldPassword] = useState("");
    let [inputNewPassword, setInputNewPassword] = useState("");
    let [inputVerifyPassword, setInputVerifyPassword] = useState("");
    let [noti, setNoti] = useState("");
    let [isButtonAvailable, setButtonAvailable] = useState(true);
    let [isValidPassword, setValidPassword] = useState(false);


    function hasUpperCase(string) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] >= 'A' && string[i] <= 'Z') {
                return true;
            }
        }
        return false;
    }

    function hasLowerCase(string) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] >= 'a' && string[i] <= 'z') {
                return true;
            }
        }
        return false;
    }

    function hasNumber(string) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] >= '0' && string[i] <= '9') {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {

        if (inputNewPassword == "") {
            setNoti("Password includes 8-20 alphabetic, lowercase and uppercase characters and number.")
            setValidPassword(false);
        }
        else if (hasNumber(inputNewPassword) == true
            && hasLowerCase(inputNewPassword) == true
            && hasUpperCase(inputNewPassword) == true
            && inputNewPassword.length < 8) {

            setNoti("Password includes 8-20 alphabetic.");
            setValidPassword(false);

        } else if (hasNumber(inputNewPassword) == true
            && hasLowerCase(inputNewPassword) == true
            && hasUpperCase(inputNewPassword) == false) {

            setNoti("Password includes uppercase characters.");
            setValidPassword(false);

        } else if (hasNumber(inputNewPassword) == true
            && hasLowerCase(inputNewPassword) == false) {

            setNoti("Password includes lowercase characters.");
            setValidPassword(false);

        } else if (hasNumber(inputNewPassword) == false) {

            setNoti("Password includes number characters.");
            setValidPassword(false);
        } else {
            setNoti("Valid password");
            setValidPassword(true);

        }

    }, [inputNewPassword]);


    useEffect(() => {

        if (isValidPassword == false) {
            setButtonAvailable(true);
        } else if (inputVerifyPassword != inputNewPassword) {
            setButtonAvailable(true);
        } else {
            setButtonAvailable(false);
        }
    }, [inputVerifyPassword])


    const handleSubmit = () => {
        const data = {
            id: 1,
            oldPassword: inputOldPassword,
            newPassword: inputNewPassword
        };

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        axios.put('https://localhost:7226/apis/Account/ChangePassword', data, { headers: { "Content-Type": "application/json" } })
            .then((response) => Swal.fire('Change Success!', { response }, 'success'))
            .catch(() => {
                Swal.fire('Error!', 'Some error, try again!', 'error')
            });
    };

    return (

        <div className="change-form">
            <div class="card card-outline-secondary">
                <div class="card-header">
                    <h3 class="mb-0">Change Password</h3>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="inputPasswordOld">Current Password</label>
                        <input type="password" class="form-control" id="inputPasswordOld" onChange={(e) => setInputOldPassword(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="inputPasswordNew">New Password</label>
                        <input type="password" class="form-control" id="inputPasswordNew" onChange={(e) => setInputNewPassword(e.target.value)} required />
                        <span class="form-text small text-muted">{noti}</span>
                    </div>
                    <div class="mb-3">
                        <label for="inputPasswordNewVerify">Verify</label>
                        <input type="password" class="form-control" id="inputPasswordNewVerify" onChange={(e) => setInputVerifyPassword(e.target.value)} onch oncrequired />
                        <span class="form-text small text-muted">
                            To confirm, type the new password again.
                        </span>
                    </div>
                    <button class="btn btn-primary" disabled={isButtonAvailable} onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
