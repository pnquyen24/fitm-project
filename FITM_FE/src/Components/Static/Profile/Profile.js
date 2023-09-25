import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile({ memberId }) {
  const [member, setMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempMember, setTempMember] = useState(null);

  useEffect(() => {
    //axios.get(`https://localhost:7226/apis/Member/Get`)
    axios.get(`https://localhost:7226/apis/Member/Get?userId=2`)
      .then(response => {
        setMember(response.data);
        setTempMember(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [memberId]);

  // Function to toggle editing mode for all rows
  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempMember(member);
    }
  };

  // Function to check if an email is valid
  function isValidEmail(checkEmail) {
    // Regular expression for a simple email format check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(checkEmail)) {
      alert(`Invalid email format: ${checkEmail}`);
      return false;
    }
    return emailRegex.test(checkEmail);
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to handle form submission
  const handleSubmit = () => {
    if(!isValidEmail(tempMember.email))
    { console.log('Invalid email format');return;} 
    // Prepare the data to be sent in the request
    const requestData = {
      studentID: tempMember.studentID,
      dob: tempMember.dob,
      phoneNumber: tempMember.phoneNumber,
      bankName: tempMember.bankName,
      bankNumber: tempMember.bankNumber,
      email: tempMember.email,
    };

    // Send a POST request to the API endpoint
    axios
      .post('https://localhost:7226/apis/RequestEditInfo/Post', requestData)
      .then((response) => {
        // Handle the response from the API if needed
        console.log('Request submitted successfully:', response.data);
        alert('Request submitted successfully:')
      })
      .catch((error) => {
        // Handle errors from the API request
        console.error('Error submitting request:', error);
        alert('Error submitting request:');
      }
      );
      
  };

  if (!member) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div class="container rounded bg-white mt-4 mb-4">
        <div class="row">
          <div class="col-md-5 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src='{member.avatar}' />
              <span class="font-weight-bold">{member.fullName}</span><span class="text-black-50">{member.email}</span><span> </span></div>
          </div>
          <div class="col-md-7">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Your Profile</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6"><label class="labels">Full Name</label>
                  <p>{member.fullName}</p>
                </div>
                <div class="col-md-6"><label class="labels">Username</label>
                  <p>{member.username}</p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6"><label class="labels">Email</label>
                  <td> {isEditing ? (
                    <input
                      type="text"  value={tempMember.email}
                      className="form-control"
                      maxLength={30}
                      onChange={(e) => {
                        setTempMember({ ...tempMember, email: e.target.value });
                      }}
                     
                    />
                  ) : (
                    member.email
                  )}</td>
                </div>
                <div class="col-md-12"><label class="labels">Phone Number</label>
                  <td>
                    {isEditing ? (
                      <input type="text" value={tempMember.phoneNumber}
                        className="form-control"
                        maxLength={11}
                        onChange={(e) => {
                          const numericInput = e.target.value.replace(/[^0-9]/g, '');
                          setTempMember({ ...tempMember, phoneNumber: numericInput })
                        }} />
                    ) : (member.bankNumber)}
                  </td>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6"><label class="labels">Date of birth</label>
                    <td>
                      {isEditing ? (
                        <input type="date" value={tempMember.dob.split('T')[0]}
                          className="form-control"
                          max={getCurrentDate()}
                          onChange={(e) => setTempMember({ ...tempMember, dob: e.target.value })} />
                      ) : (member.dob.split('T')[0])}
                    </td>
                  </div>
                  <div class="col-md-6"><label class="labels">Student ID</label>
                    <td>
                      {isEditing ? (
                        <input type="text" value={tempMember.studentID}
                          className="form-control"
                          maxLength={10}
                          onChange={(e) => setTempMember({ ...tempMember, studentID: e.target.value })} />
                      ) : (member.studentID)}
                    </td>
                  </div>
                  <div class="col-md-6"><label class="labels">Bank Name</label>
                    <td>
                      {isEditing ? (
                        <input type="text" value={tempMember.bankName}
                          className="form-control"
                          maxLength={15}
                          onChange={(e) => setTempMember({ ...tempMember, bankName: e.target.value })} />
                      ) : (member.bankName)}
                    </td>
                  </div>
                  <div class="col-md-6"><label class="labels">Bank Number</label>
                    <td>
                      {isEditing ? (
                        <input type="text" value={tempMember.bankNumber}
                          className="form-control"
                          maxLength={20}
                          onChange={(e) => {
                            const numericInput = e.target.value.replace(/[^0-9]/g, '');
                            setTempMember({ ...tempMember, bankNumber: numericInput })
                          }} />
                      ) : (member.bankNumber)}
                    </td>
                  </div>
                  <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center experience">
                      {/* Submit button */}
                      {isEditing && (
                        <button onClick={handleSubmit}
                          class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i> Submit</button>
                      )}
                      <button onClick={toggleEditing} class="border px-3 p-1 add-experience">
                      <i class="fa fa-plus"></i> {isEditing ? 'Cancel' : 'Change Information'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;