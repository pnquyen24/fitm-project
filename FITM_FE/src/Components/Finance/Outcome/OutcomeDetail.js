import axios from 'axios';
import CustomeAlert from '../../Member/Alert/CustomeAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function OutcomeDetail() {
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
                                    
                                    {isEditing ? (
  <></>
) : (
  <Link to="/home/financial-manager/finance-list" className='finance_create_button'>
    <button><span>Back to List</span></button>
  </Link>
)}
                                    <button
                                        onClick={toggleEditing}
                                        className="border px-3 p-1 add-experience float-right"
                                    >
                                        <i className="fa fa-plus"></i>{' '}
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div>Error: {error}</div>}
        </div>
    );
}

export default OutcomeDetail;