import React, { useEffect, useState } from 'react';
import './IncomeList.css';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function IncomeList() {
  const [incomeList, setIncomeList] = useState([]);
  const navigate = useNavigate();

  function ViewIncomeDetail(id) {
    navigate("/home/income-detai?id=" + id); // Sửa lỗi ở đây, sử dụng id thay vì request.id
  }

  useEffect(() => {
    fetch('https://localhost:7226/apis/Finance/ViewIncome')
      .then((response) => response.json())
      .then((data) => setIncomeList(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Income List</h1>
      <table className='income_table'>
        <thead className='income_table_thead'>
          <tr className='income_table_tr'>
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
          {incomeList.map((income) => (
            <tr key={income.id}>
              <td>{income.id}</td>
              <td>{income.billCode}</td>
              <td>{income.title}</td>
              <td>{income.description}</td>
              <td>{income.amount}</td>
              <td>{income.createdTime}</td>
              <td>{income.modifiedTime}</td>
              <td>{income.financeStatus}</td>
              <td>
                <Button
                  onClick={() => ViewIncomeDetail(income.id)} // Sửa lỗi ở đây, sử dụng outcome.id thay vì request.id
                  variant="outlined"
                  size="small"
                  className="detail-button"
                >
                  View Detail
                </Button>
              </td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeList;