import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./RequestDetail.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function RequestDetail() {
    const [compareData, setCompareData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const status = {
        0: "Pending",
        1: "Accepted",
        2: "Denied"
    }

    function getData(){
        axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.get(`https://localhost:7226/apis/RequestEditInfo/GetCompareRequest?id=${id}`)
            .then(response => {
                setCompareData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
       getData();
    }, [id]);

    function BackToList() {
        navigate("/home/member-manager/request-edit-info-list");
    }

    function AcceptRequest(id) {
        // Send a POST request to the API endpoint
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post('https://localhost:7226/apis/RequestEditInfo/AcceptRequest?id=' + id)
          .then((response) => {
            CustomeAlert.success(`Accepted successfully!`);
            getData();
          })
          .catch((error) => {
            console.error(error);
            CustomeAlert.error(`Accepted Error!`);
          }
          );
    
      };

      function DenyRequest(id) {
        // Send a POST request to the API endpoint
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post('https://localhost:7226/apis/RequestEditInfo/DenyRequest?id=' + id)
          .then((response) => {
            CustomeAlert.success(`Denied successfully!`);
            getData();
          })
          .catch((error) => {
            console.error(error);
            CustomeAlert.error(`Denied Error!`);
          }
          );
    
      };

    return (
        <div className="container">
            <TableContainer component={Paper} className="TableContainerDetail">
                <Table>
                    <TableHead className='TableHead'>
                        <TableRow>
                            <TableCell>Attribute</TableCell>
                            <TableCell>Old Value</TableCell>
                            <TableCell>New Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>{compareData.oldStudentID}</TableCell>
                            <TableCell style={{ color: compareData.newStudentID === compareData.oldStudentID ? "black" : "red" }}>
                                {compareData.newStudentID}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>
                                {compareData.oldDOB ? new Date(compareData.oldDOB).toLocaleDateString() : ''}
                            </TableCell>
                            <TableCell style={{ color: new Date (compareData.oldDOB).toLocaleDateString() ===  new Date (compareData.newDOB).toLocaleDateString() ? "black" : "red" }}>
                                {compareData.newDOB ? new Date(compareData.newDOB).toLocaleDateString(): ''}
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Email</TableCell>
                            <TableCell>{compareData.oldEmail}</TableCell>
                            <TableCell style={{ color: compareData.oldEmail === compareData.newEmail ? "black" : "red" }}>
                                {compareData.newEmail}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Phone Number</TableCell>
                            <TableCell>{compareData.oldPhoneNumber}</TableCell>
                            <TableCell style={{color : compareData.oldPhoneNumber === compareData.newPhoneNumber ? "black":"red"}}>
                                {compareData.newPhoneNumber}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Bank Name</TableCell>
                            <TableCell>{compareData.oldBankName}</TableCell>
                            <TableCell style={{color : compareData.oldBankName === compareData.newBankName ? "black":"red"}}>
                                {compareData.newBankName}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Bank Number</TableCell>
                            <TableCell>{compareData.oldBankNumber}</TableCell>
                            <TableCell style={{color : compareData.oldBankNumber === compareData.newBankNumber ? "black":"red"}}>
                                {compareData.newBankNumber}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Status</TableCell>
                            <TableCell className={`${status[compareData.status]}`}>{status[compareData.status]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='buttons-container'>
                <Button className='buttons' onClick={() => { BackToList() }} variant="outlined">Back to List</Button>
                <Button
                    style={{ display: (compareData.status === 1 || compareData.status === 2) ? "none" : "block" }}
                    className='buttons accept-button'
                    onClick={() => { AcceptRequest(id) }} variant="outlined">Accepted</Button>
                <Button
                    style={{ display: (compareData.status === 1 || compareData.status === 2) ? "none" : "block" }}
                    className='buttons deny-button'
                    onClick={() => { DenyRequest(id) }} variant="outlined">Denied</Button>
            </div>
        </div>
    );
}


export default RequestDetail;