import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { type } from '@testing-library/user-event/dist/type';

const FinanceRequestList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseIncome = await fetch('https://localhost:7226/apis/Finance/ViewIncome');
        const responseOutcome = await fetch('https://localhost:7226/apis/Finance/ViewOutcome');
        const incomeData = await responseIncome.json();
        const outcomeData = await responseOutcome.json();
        const combinedData = [
          ...incomeData.map((item) => ({ ...item, type: 'Income' })),
          ...outcomeData.map((item) => ({ ...item, type: 'Outcome' }))
        ];
        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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


  const handleDelete = async (id, type) => {
  {data.map(item => {
  const handleDelete = async (id, type) => {
    try {
      let deleteUrl = '';
      if (type === 'Income') {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteIncome?id=${item.id}`;
      } else if (type === 'Outcome') {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteOutcome?id=${item.id}`;
      } else {
        console.error('Invalid type');
        return;
      }

      const response = await axios.delete(deleteUrl);

      // If the request is successful, remove the deleted item from the state
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
        Swal.fire({
          title: 'Success',
          text: 'Deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        title: 'Error',
        text: 'Deletion unsuccessful',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

})}
  }

 
  function ViewOutcomeRequestDetail(id) {
    navigate("/home/financial-manager/outcome-request-detail?id=" + id);
  }

  function ViewIncomeRequestDetail(id) {
    navigate("/home/financial-manager/income-request-detail?id=" + id);
  }


  //===================================

  const DeleteIncome = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7226/apis/Finance/DeleteIncome?id=${id}`);
      // If the request is successful, remove the deleted item from the state
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const DeleteOutcome = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7226/apis/Finance/DeleteOutcome?id=${id}`);
      // If the request is successful, remove the deleted item from the state
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  //===================================

  //===================================

  return (
    <div>
      <h1 className='finance_title'>Finance Report List</h1>

      <div className='create_finance_top'>
        <Link to="/home/">
          <button className='finance_home'><span>BACK TO HOME</span></button>
        </Link>
      </div>


      <table className='finance_table'>
        <thead className='finance_table_thead'>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td style={getTypeStyle(item.type)}>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
              <td>
                <Button
                  onClick={() => {item.type === 'Outcome' ? ViewOutcomeRequestDetail(item.id) : ViewIncomeRequestDetail(item.id)}}
                  variant="outlined"
                  size="small"
                  className="detail-button"
                >
                  View Detail
                </Button>
              </td>
              

              <td>
  {item.financeStatus !== 1 ? (
    <Button
      onClick={() => {
        if (item.type === 'Outcome') {
          DeleteOutcome(item.id);
        } else if (item.type === 'Income') {
          DeleteIncome(item.id);
        }
      }}
      size="small"
      className="delete-button" // Add a CSS class for styling if needed
    >
      <span><ion-icon name="trash-outline"></ion-icon></span>
    </Button>
  ) : (
    <span>Can't delete</span>
  )}
</td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceRequestList;