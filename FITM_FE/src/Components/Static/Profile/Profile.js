import React, { useState } from 'react';
import axios from 'axios';

function Profile({memberId}) {
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:7226/apis/Member/Get/${memberId}`)
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
      <h2>{member.name}</h2>
      <p>Email: {member.email}</p>
      <p>Phone: {member.phone}</p>
    </div>
  );
}

export default Profile;