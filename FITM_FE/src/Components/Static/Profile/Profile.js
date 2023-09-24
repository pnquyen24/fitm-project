import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Profile.css';

function Profile({memberId}) {
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:7226/apis/Member/Get`)
      .then(response => {
        setMember(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [memberId]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <h1><span className='wellcome_name'>{member.fullName}</span>'s Information</h1>
<table>
    <tr>
    <th>Avatar</th>
    <td>{member.avatar}</td>
  </tr>
  <tr>
    <th>Full Name</th>
    <td>{member.fullName}</td>
  </tr>
  <tr>
    <th>Username</th>
    <td>{member.username}</td>
  </tr>
  <tr>
    <th>Email</th>
    <td>{member.email}</td>
  </tr> 
  <tr>
    <th>Student ID</th>
    <td>{member.studentID}</td>
  </tr>
  <tr>
    <th>Birth date</th>
    <td>{member.dob}</td>
  </tr>
  <tr>
    <th>Phone Number</th>
    <td>{member.phoneNumber}</td>
  </tr>
  <tr>
    <th>Bank Name</th>
    <td>{member.bankName}</td>
  </tr>
  <tr>
    <th>Bank Number</th>
    <td>{member.bankNumber}</td>
  </tr>
</table>

<div>
  <button><a href='#'>Change Information</a></button>
</div>


    </div>
  );
}

export default Profile;