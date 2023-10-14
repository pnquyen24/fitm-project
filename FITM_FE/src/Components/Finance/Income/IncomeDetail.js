import axios from 'axios';
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function IncomeDetail() {
    const [income, setIncome] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempIncome, setTempIncome] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const incomeId = new URLSearchParams(location.search).get('id');

  function getData(){
    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(`https://localhost:7226/apis/Finance/GetIncome?id=` +incomeId)
      .then(response => {
        setIncome(response.data);
      })
      .catch(error => {
      });
  }
  useEffect(() => {
    getData();
  }, [incomeId]);
    // Function to toggle editing mode for all rows
    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempIncome(income);
        }
    };


    //============================================================
    const IncomeSend = () => {
      axios
        .post(`https://localhost:7226/apis/Finance/ChangeIncomeStatus?id=${incomeId}`)
        .then(response => {
          // Handle success (e.g., show success message)
          Swal.fire({
            icon: 'success',
            title: 'Send Request Successfully !!!',
            showConfirmButton: true,
          }).then(() => {
            window.location.href = '/home/financial-manager/finance-list';
          });
          // Perform any other necessary actions or updates after status change
        })
        .catch(error => {
          // Handle error (e.g., show error message)
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessfully !!!',
            showConfirmButton: true,
          });
        });
    };
    
    //============================================================



    const getStatusLabel = (status) => {
        if (status === 0) {
          return 'Waiting';
        } else if (status === 1) {
          return 'Pending';
        } else if (status === 2) {
          return 'Accepted';
        } else if (status === 3) {
          return 'Denied';
        }
        return '';
      };
    
      const getStatusStyle = (status) => {
        if (status === 0) {
          return {
            color: 'gray',
            fontWeight: 'bold'
          };
        } else if (status === 1) {
          return {
            color: 'orange',
            fontWeight: 'bold'
          };
        } else if (status === 2) {
          return {
            color: 'green',
            fontWeight: 'bold'
          };
        } else if (status === 3) {
          return {
            color: 'red',
            fontWeight: 'bold'
          };
        }
        return {};
      };
    
      const getTypeStyle = (type) => {
        if (type === 'Income') {
          return {
            color: 'green'
          };
        } else if (type === 'Outcome') {
          return {
            color: 'red'
          };
        }
        return {};
      };

    function formatDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');
        if (day === 1 && month === 1 && year === 1) {
          return 'Not yet';
        }
        return `${day}-${month}-${year}`;
      }

    const handleSubmit = () => {
        const updateData = 
        {
            id : incomeId,
            title: tempIncome.title,
            description: tempIncome.description,
            amount: tempIncome.amount,
            billCode: tempIncome.billCode
        };
        
        axios
            .put('https://localhost:7226/apis/Finance/UpdateIncome?id=' +incomeId, updateData)
            .then(response => {
              Swal.fire({
                icon: 'success',
                title: 'Update Successfully !!!',
                showConfirmButton: true,
              }).then(() => {
                window.location.href = '/home/financial-manager/finance-list';
              });
            })
            .catch(error => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Update Unsuccessfully !!!',
                showConfirmButton: true,
              });
            });
    };

    

    if (!income) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container rounded bg-white mt-4 mb-4">
                <div className="row">
                    <div className="col-md-7">
                        <div className="p-3 py-4 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Your income</h4>
                            </div>

                            <div>
                              ID: {income.id}
                            </div>

                            <div className="row mt-3">
                            <div className="col-md-6">
                                    <label className="labels">title</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.title}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, title: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.title
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">description</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.description}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, description: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.description
                                    )}
                                </div>
                            </div>

                            <div>
                                <label>Created Time:</label><label>{formatDate(income.createdTime)}</label>
                                <label>Modified Time:</label><label>{formatDate(income.modifiedTime)}</label>

                            </div>





                            <div className="row mt-3">
                                <div className="col-md-6 marginTemp"><label className="labels">amount</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.amount}
                                            className="form-control"
                                            onChange={(e) => {
                                                const numericInput = e.target.value.replace(/[^0-9]/g, '');
                                                setTempIncome({ ...tempIncome, amount: numericInput })
                                            }}
                                        />
                                    ) : (
                                        income.amount
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">billCode:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.billCode}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, billCode: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.billCode
                                    )}
                                </div>
                            </div>

                            <div><label>Status:</label><label style={getStatusStyle(income.financeStatus)}>{getStatusLabel(income.financeStatus)}</label></div>



                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-end sm_cl align-items-center experience float-right">
                                    {/* Submit button */}
                                    {isEditing && (
                                        <button
                                            onClick={handleSubmit}
                                            className="border px-3 p-1 add-experience float-right"
                                        >
                                            <i className="fa fa-plus"></i> Update
                                        </button>
                                    )}
                                  
                            </div>
          {!isEditing && (
            <Link to="/home/financial-manager/finance-list" className='finance_create_button'>
              <button><span>Back to List</span></button>
            </Link>
          )}



<button
  onClick={toggleEditing}
  className="border px-3 p-1 add-experience float-right"
  style={{ display: income.financeStatus === 0 ? 'block' : 'none' }}
>
  {income.financeStatus === 0 && (
    <i className="fa fa-hourglass-half"></i>
  )}
  {income.financeStatus === 0 && (
    isEditing ? 'Cancel' : 'Edit'
  )}
</button>



        </div>


        <div>
  {income.financeStatus === 0 && (
    <button onClick={IncomeSend}>Send</button>
  )}
</div>

      </div>
    </div>
    {error && <div>Error: {error}</div>}
  </div>
  </div></div>
    );
}

export default IncomeDetail;