import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function RequestEditInfo({}) {
  const [requestEditInfo, setRequestEditInfo] = useState([]);

  useEffect(() => {
    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(`https://localhost:7226/apis/RequestEditInfo/GetAll`)
      .then(response => {
        setRequestEditInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

    return (
      <div>
      <h1>RequestEditInfo List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>phoneNumber</TableCell>
              <TableCell>bankName</TableCell>
              <TableCell>bankNumber</TableCell>
              <TableCell>createdById</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestEditInfo.map(request => (
              <TableRow key={request.id}>
                <TableCell>{request.studentID}</TableCell>
                <TableCell>{request.dob}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.phoneNumber}</TableCell>
                <TableCell>{request.bankName}</TableCell>
                <TableCell>{request.bankNumber}</TableCell>
                <TableCell>{request.createdById}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RequestEditInfo;