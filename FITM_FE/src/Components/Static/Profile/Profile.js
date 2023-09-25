import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div class="container rounded bg-white mt-4 mb-4">
    <div class="row">
        <div class="col-md-5 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src='{member.avatar}'/>
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
                    <div class="col-md-12"><label class="labels">Email</label>
                        <p>{member.email}</p>
                    </div>
                    <div class="col-md-12"><label class="labels">Phone Number</label>
                        <p>{member.phoneNumber}</p>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Date of birth</label>
                            <p>{member.dob}</p>
                        </div>
                        <div class="col-md-6"><label class="labels">Student ID</label>
                            <p>{member.studentID}</p>
                        </div>
                           <div class="col-md-6"><label class="labels">Bank Name</label>
                                <p>{member.bankName}</p>
                            </div>
                            <div class="col-md-6"><label class="labels">Bank Number</label>
                                <p>{member.bankNumber}</p>
                            </div>
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center experience">
                            <button class="border px-3 p-1 add-experience"><i class="fa fa-plus">
                              </i><a className='btn_text' href='#'>Edit your profile</a></button></div><br/>
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