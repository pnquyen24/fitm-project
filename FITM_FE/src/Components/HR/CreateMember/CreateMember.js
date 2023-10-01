import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CreateMember.css';

function CreateMember() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentid: '',
    birthday: '',
    email: '',
    phonenumber: '',
    banknumber: '',
    bankname: ''
  });

  const [emailError, setEmailError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:7226/apis/Member/Create', formData)
      .then(response => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Create Successfully !!!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = '/home';
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Create Unsuccessfully !!!',
          showConfirmButton: true,
        });
      });
  }

  const handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    if (name === 'email') {
      if (!value.includes('@')) {
        setEmailError('Email must contain "@" character');
      } else {
        setEmailError('');
      }
      value = value.toLowerCase();
    }
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div>
      <h2 className='create_title'>CREATE NEW MEMBER</h2>
      <form onSubmit={handleSubmit} className='create_form'>
        <label htmlFor="fullname" className="form-label">Full Name: </label>
        <input type="text" id="fullname" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" required /><br />
        
        <div className='create_id_dob'>
        <label htmlFor="studentid" className="form-label">Student ID:</label>
        <input type="text" id="studentid" name="studentid" value={formData.studentid} onChange={handleChange} className="form-input" required /><br />
        
        <label htmlFor="birthday" className="form-label">Date Of Birth:</label>
        <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} className="form-input" required /><br />
        </div>
        
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required /><br/>
        {formData.email.includes `@` ? <span className="form-success">Email is valid</span> : <span className="form-error">Email must contain "@"</span>}<br />

        <label htmlFor="phonenumber" className="form-label">Phone Number:</label>
        <input type="tel" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} className="form-input" required /><br/>
        {formData.phonenumber.length !== 10 ? <span className="form-error">Phone number must be exactly 10 digits</span> : <span className="form-success">Phone number is valid</span>}<br />

        <div className='create_bank'>
        <label htmlFor="banknumber" className="form-label">Bank Number:</label>
        <input type="text" id="banknumber" name="banknumber" value={formData.banknumber} onChange={handleChange} className="form-input" /><br />

        <label htmlFor="bankname" className="form-label">Bank Name:</label>
        <input type="text" id="bankname" name="bankname" value={formData.bankname} onChange={handleChange} className="form-input" /><br />
        </div>
        
        <input type="submit" value="CREATE" className="create_submit" />
      </form>
    </div>
  );
}

export default CreateMember;