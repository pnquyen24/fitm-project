import React, { useEffect, useState } from 'react';
import './OutcomeList.css';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function OutcomeList() {
  const [outcomeList, setOutcomeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7226/apis/Finance/ViewOutcome')
      .then((response) => response.json())
      .then((data) => setOutcomeList(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Outcome List</h1>
      <table className='outcome_table'>
        <thead className='outcome_table_thead'>
          <tr>
            <th>#</th>
            <th>Bill Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Created Time</th>
            <th>Modified Time</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {outcomeList.map((outcome) => (
            <tr key={outcome.id}>
              <td>{outcome.id}</td>
              <td>{outcome.billCode}</td>
              <td>{outcome.title}</td>
              <td>{outcome.description}</td>
              <td>{outcome.amount}</td>
              <td>{outcome.createdTime}</td>
              <td>{outcome.modifiedTime}</td>
              <td>{outcome.financeStatus}</td>
              <td>
                Wait
              </td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OutcomeList;