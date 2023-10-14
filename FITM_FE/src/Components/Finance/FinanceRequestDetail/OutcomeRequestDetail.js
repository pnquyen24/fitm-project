import axios from 'axios';
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function OutcomeRequestDetail() {
    const [outcome, setOutcome] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempOutcome, setTempOutcome] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const outcomeId = new URLSearchParams(location.search).get('id');

  function getData(){
    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(`https://localhost:7226/apis/Finance/GetOutcome?id=` +outcomeId)
      .then(response => {
        setOutcome(response.data);
      })
      .catch(error => {
      });
  }
  useEffect(() => {
    getData();
  }, [outcomeId]);
    // Function to toggle editing mode for all rows
    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempOutcome(outcome);
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
            id : outcomeId,
            title: tempOutcome.title,
            description: tempOutcome.description,
            amount: tempOutcome.amount,
            billCode: tempOutcome.billCode
        };
        
        axios
            .put('https://localhost:7226/apis/Finance/UpdateOutcome?id=' +outcomeId, updateData)
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

    

    if (!outcome) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container rounded bg-white mt-4 mb-4">
                <div className="row">
                    <div className="col-md-7">
                        <div className="p-3 py-4 info-cover">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Your outcome</h4>
                            </div>

                            <div>
                              ID: {outcome.id}
                            </div>

                            <div className="row mt-3">
                            <div className="col-md-6">
                                    <label className="labels">title</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempOutcome.title}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempOutcome({ ...tempOutcome, title: e.target.value })
                                            }
                                        />
                                    ) : (
                                      outcome.title
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">description</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempOutcome.description}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempOutcome({ ...tempOutcome, description: e.target.value })
                                            }
                                        />
                                    ) : (
                                      outcome.description
                                    )}
                                </div>
                            </div>

                            <div>
                                <label>Created Time:</label><label>{formatDate(outcome.createdTime)}</label>
                                <label>Modified Time:</label><label>{formatDate(outcome.modifiedTime)}</label>

                            </div>





                            <div className="row mt-3">
                                <div className="col-md-6 marginTemp"><label className="labels">amount</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempOutcome.amount}
                                            className="form-control"
                                            onChange={(e) => {
                                                const numericInput = e.target.value.replace(/[^0-9]/g, '');
                                                setTempOutcome({ ...tempOutcome, amount: numericInput })
                                            }}
                                        />
                                    ) : (
                                      outcome.amount
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">billCode:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempOutcome.billCode}
                                            className="form-control"
                                            onChange={(e) =>
                                                setTempOutcome({ ...tempOutcome, billCode: e.target.value })
                                            }
                                        />
                                    ) : (
                                      outcome.billCode
                                    )}
                                </div>
                            </div>

                            <div><label>Status:</label><label style={getStatusStyle(outcome.financeStatus)}>{getStatusLabel(outcome.financeStatus)}</label></div>



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
            <Link to="/home/financial-manager/finance-request-list" className='finance_create_button'>
              <button><span>Back to List</span></button>
            </Link>
          )}
        </div>

        
        <div>
  {outcome.financeStatus === 1 ? (
    <div>
      <button onClick={() => {
        axios.post(`https://localhost:7226/apis/Finance/AcceptOutcomeRequest?id=${outcomeId}`)
          .then(response => {
            console.log(response);
            Swal.fire({
              title: "Finance Report Accepted !!!",
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
              text: "Accept Unsuccessfully !!!",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }}>Accept</button>
      <button onClick={() => {
        axios.post(`https://localhost:7226/apis/Finance/DenyOutcomeRequest?id=${outcomeId}`)
          .then(response => {
            console.log(response);
            Swal.fire({
              title: "Success",
              text: "Mail has been sent successfully!",
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
    {error && <div>Error: {error}</div>}
  </div>
  </div></div>
    );
}

export default OutcomeRequestDetail;