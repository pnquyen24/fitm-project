import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './IncomeRequestDetail.css';

function IncomeRequestDetail() {
  const [income, setIncome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempIncome, setTempIncome] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const incomeId = new URLSearchParams(location.search).get('id');

  function getData() {
    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(`https://localhost:7226/apis/Finance/GetIncome?id=` + incomeId)
      .then(response => {
        setIncome(response.data);
      })
      .catch(error => {
      });
  }
  useEffect(() => {
    getData();
  }, [incomeId]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempIncome(income);
    }
  };

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
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    if (day === 1 && month === 1 && year === 1) {
      return 'Not yet';
    }
    return `${day}-${month}-${year}`;
  }

  const handleSubmit = () => {
    const updateData =
    {
      id: incomeId,
      title: tempIncome.title,
      description: tempIncome.description,
      amount: tempIncome.amount,
      billCode: tempIncome.billCode
    };

    axios
      .put('https://localhost:7226/apis/Finance/UpdateIncome?id=' + incomeId, updateData)
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
    <div className='card'>
      <div>
            <div className="in_request_card">
                <div>
                    <div>
                      
                            <div>
                                <h4>Income Detail</h4>
                            </div>


<div className='id_title'>
                            <div className='each_row_info'>
                              <label className='span_title'>ID: </label> <span className='span_info'>{income.id}</span>
                            </div>

                            <div>
                            <div>
                                    <label className='title'>Title: </label>
                                    <lable className='span_info'>
                                     {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.title}
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, title: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.title
                                    )}
                                    </lable>
                                </div>

                                </div>
                                </div>


                                <div className='each_row_info'>
                                    <label className='span_title'>Description: </label>
                                    <lable className='span_info'>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.description}
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, description: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.description
                                    )}
                                    </lable>  
                                </div>
                            

                            <div>
                              <div className='each_row_info'>
                              <label className='span_title'>Created Time: </label><label className='span_info'>{formatDate(income.createdTime)}</label> <br></br>
                              </div>

                              <div className='each_row_info'>
                                <label className='span_title'>Modified Time: </label><label className='span_info'>{formatDate(income.modifiedTime)}</label>
</div>
                            </div>





                            <div className='amount_billCode'>
                                <div>
                                  <label className='span_title'>Amount: </label>
                                <label className='span_info'>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.amount} 
                                            onChange={(e) => {
                                                const numericInput = e.target.value.replace(/[^0-9]/g, '');
                                                setTempIncome({ ...tempIncome, amount: numericInput })
                                            }}
                                        />
                                    ) : (
                                        income.amount
                                    )}
                                    </label>
                                </div>
                                <div className='billCode'>
                                    <label className='bill_title'>Bill Code: </label>
                                <label className='span_info'>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempIncome.billCode}
                                            onChange={(e) =>
                                                setTempIncome({ ...tempIncome, billCode: e.target.value })
                                            }
                                        />
                                    ) : (
                                        income.billCode
                                    )}
                                    </label>
                                </div>
                            </div>

                            <div className='finance_status'><label style={getStatusStyle(income.financeStatus)}>{getStatusLabel(income.financeStatus)}</label></div>




                            <div className="in_request_card_button">


  {!isEditing && (
    <Link to="/home/financial-manager/finance-request-list">
      <button className='detail_back'>
        <span>Back to List</span>
      </button>
    </Link>
  )}


  <div>
                {income.financeStatus === 1 ? (
                  <div>
                    <button onClick={() => {
                      axios.post(`https://localhost:7226/apis/Finance/AcceptIncomeRequest?id=${incomeId}`)
                        .then(response => {
                          console.log(response);
                          Swal.fire({
                            title: "Finance Report Accepted !!!",
                            icon: "success",
                            confirmButtonText: "OK"
                          }).then(() => {
                            window.location.href = "/financial-manager/finance-request-list";
                          });
                        })
                        .catch(error => {
                          console.error(error);
                          Swal.fire({
                            title: "Error",
                            text: "Accept Unsuccessfully !!!",
                            icon: "error",
                            confirmButtonText: "OK"
                          });
                        });
                    }}>Accept</button>





                    
                    <button onClick={() => {
                      axios.post(`https://localhost:7226/apis/Finance/DenyIncomeRequest?id=${incomeId}`)
                        .then(response => {
                          console.log(response);
                          Swal.fire({
                            title: "Success",
                            icon: "success",
                            confirmButtonText: "OK"
                          }).then(() => {
                            window.location.href = "/home/financial-manager/finance-request-list";
                          });
                        })
                        .catch(error => {
                          console.error(error);
                          Swal.fire({
                            title: "Error",
                            text: "Unsuccessful",
                            icon: "error",
                            confirmButtonText: "OK"
                          });
                        });
                    }}>Deny</button>
                  </div>
                ) : null}
              </div>

</div>
            </div>
          </div>
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
}

export default IncomeRequestDetail;