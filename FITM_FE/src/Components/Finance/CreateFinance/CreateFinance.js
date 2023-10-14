import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function CreateIncome() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    billCode: '',
    type: 'income', // Default type is income
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl =
      formData.type === 'income'
        ? 'https://localhost:7226/apis/Finance/AddIncome'
        : 'https://localhost:7226/apis/Finance/AddOutcome';

    axios
      .post(apiUrl, formData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Create Successfully !!!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = '/home/financial-manager/finance-list';
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Create Unsuccessfully !!!',
          showConfirmButton: true,
        });
      });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, type: value });
  };

  return (
    <div>
      <h2 className="create_title">CREATE NEW FINANCE REPORT</h2>
      <form onSubmit={handleSubmit} className="create_form">
        <div className="type_radio">
          <div>
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleTypeChange}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div>
            <input
              type="radio"
              id="outcome"
              name="type"
              value="outcome"
              checked={formData.type === 'outcome'}
              onChange={handleTypeChange}
            />
            <label htmlFor="outcome">Outcome</label>
          </div>
        </div>

        <label htmlFor="title" className="form-label">
          Title:{' '}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
        <br />

        <div className="create_id_dob">
          <label htmlFor="description" className="form-label">
            Description:{' '}
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          <br />

          <label htmlFor="birthday" className="form-label">
            Amount:{' '}
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-input"
            required
          />
          <br />
        </div>

        <label htmlFor="email" className="form-label">
          Bill Code:{' '}
        </label>
        <input
          type="text"
          id="billCode"
          name="billCode"
          value={formData.billCode}
          onChange={handleChange}
          className="form-input"
          required
        />
        <br />

        <div className="button-container">
          <Link to="/home/financial-manager/finance-list" className="create_submit">
            BackToList
          </Link>
          <input type="submit" value="CREATE" className="create_submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateIncome;