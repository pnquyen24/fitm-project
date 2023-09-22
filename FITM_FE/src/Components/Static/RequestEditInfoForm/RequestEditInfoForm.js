import React, { useState } from 'react';
import "./RequestEditInfoForm.css";

function RequestEditInfoForm() {
  const [formData, setFormData] = useState({
    StudentID: 'QE170088',
    DOB: '2003-08-12',
    Email: 'danhctqe170088@fpt.edu.vn',
    PhoneNumber: '',
    BankName: '',
    BankNumber: '',
  });

  function getMaxDOB() {
    const today = new Date();
    const maxDOB = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
    return maxDOB;
  }
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission here
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Perform your custom validation here
    if (!data.StudentID || data.StudentID.length > 10) {
      errors.StudentID = 'Student ID must be 10 characters or less';
    }

    if (!data.Email || data.Email.length > 30 || !isValidEmail(data.Email)) {
      errors.Email = 'Invalid email address (max 30 characters)';
    }

    if (!data.PhoneNumber || data.PhoneNumber.length > 11) {
      errors.PhoneNumber = 'Phone number must be 11 characters or less';
    }

    if (!data.BankName || data.BankName.length > 15) {
      errors.BankName = 'Bank name must be 15 characters or less';
    }

    if (!data.BankNumber || data.BankNumber.length > 20) {
      errors.BankNumber = 'Bank number must be 20 characters or less';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="form-container">
      <h1>Request Edit Info Form</h1>
      <div className="form-row">
        <div className="form-group">
          <h3>Member Fullname: Cáp Thành Đạt</h3>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <h3>Member username : datct</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="StudentID">
              Student ID
            </label>
            <input
              type="text"
              id="StudentID"
              name="StudentID"
              onChange={handleChange}
              value={formData.StudentID}
              className="form-input"
            />
            {errors.StudentID && <div className="error-message">{errors.StudentID}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="DOB">
              Date of Birth
            </label>
            <input
              type="date"
              id="DOB"
              name="DOB"
              onChange={handleChange}
              value={formData.DOB}
              className="form-input"
              max={getMaxDOB()} // Set the max attribute dynamically
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="Email">
              Email
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              onChange={handleChange}
              value={formData.Email}
              className="form-input"
            />
            {errors.Email && <div className="error-message">{errors.Email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="PhoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="PhoneNumber"
              name="PhoneNumber"
              onChange={handleChange}
              value={formData.PhoneNumber}
              className="form-input"
            />
            {errors.PhoneNumber && <div className="error-message">{errors.PhoneNumber}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="BankName">
              Bank Name
            </label>
            <input
              type="text"
              id="BankName"
              name="BankName"
              onChange={handleChange}
              value={formData.BankName}
              className="form-input"
            />
            {errors.BankName && <div className="error-message">{errors.BankName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="BankNumber">
              Bank Number
            </label>
            <input
              type="text"
              id="BankNumber"
              name="BankNumber"
              onChange={handleChange}
              value={formData.BankNumber}
              className="form-input"
            />
            {errors.BankNumber && <div className="error-message">{errors.BankNumber}</div>}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RequestEditInfoForm;