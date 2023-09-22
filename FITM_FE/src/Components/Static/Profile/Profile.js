import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";

function Profile(item){
  
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(item.username);

  useEffect(() => {
    axios.get('https://localhost:7226/Members/${username}')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [username]);


  return (
    <div>
      <table id='user'>
        
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Student ID</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Bank Name</th>
            <th>Bank Number</th>
            <th>Avatar</th>
            <th>Status</th>
          </tr>
        
        
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.fullName}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.studentID}</td>
              <td>{item.dob}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.bankName}</td>
              <td>{item.bankNumber}</td>
              <td>{item.avatar}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        
      </table>
    </div>
  );
}

export default Profile;