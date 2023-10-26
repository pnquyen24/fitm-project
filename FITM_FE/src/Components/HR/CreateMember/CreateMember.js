import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomeAlert from '../../Member/Alert/CustomeAlert';
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


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(formData.email)) return;
    formData.email = formData.email.toLowerCase();
    axios.post('https://localhost:7226/apis/Member/Create', formData)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Create Successfully !!!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = '/member-manager/member-list';
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Create Unsuccessfully !!!',
          showConfirmButton: true,
        });
      });
  }
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to check if an email is valid
  function isValidEmail(checkEmail) {
    // Regular expression for a simple email format check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(checkEmail)) {
      CustomeAlert.warning(`Invalid email format: ${checkEmail}`);
      return false;
    }
    return emailRegex.test(checkEmail);
  }

  const handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;

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
          <input type="text" id="studentid" maxLength={10} name="studentid" value={formData.studentid} onChange={handleChange} className="form-input" required /><br />

          <label htmlFor="birthday" className="form-label">Date Of Birth:</label>
          <input type="date" id="birthday" max={getCurrentDate()} name="birthday" value={formData.birthday} onChange={handleChange} className="form-input" required /><br />
        </div>

        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required /><br />

        <label htmlFor="phonenumber" className="form-label">Phone Number:</label>
        <input type="tel" id="phonenumber" name="phonenumber" maxLength={11} minLength={10} value={formData.phonenumber} onChange={handleChange} className="form-input" required /><br />
        { formData.phonenumber.length != 0 && (formData.phonenumber.length < 10  ||formData.phonenumber.length > 11) ? 
        <span className="form-error">Phone number must be exactly 10 - 11 digits</span> : <span></span>}<br />

        <div className='create_bank'>
          <label htmlFor="banknumber" className="form-label">Bank Number:</label>
          <input type="text" id="banknumber" name="banknumber" value={formData.banknumber} onChange={handleChange} className="form-input" /><br />

          <label htmlFor="bankname" className="form-label">Bank Name:</label>
          <input type="text" id="bankname" name="bankname" value={formData.bankname} onChange={handleChange} className="form-input" /><br />
        </div>
        <div className='button-container'>
          <Link to="/member-manager/member-list" className='create_submit'> BackToList</Link>
          <input type="submit" value="CREATE" className="create_submit" />
        </div>  
      </form>
    </div>
  );
}

export default CreateMember;