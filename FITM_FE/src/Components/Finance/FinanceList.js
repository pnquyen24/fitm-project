import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FinanceList.css';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

const FinanceList = () => {
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

  
  function ViewOutcomeDetail(id) {
    navigate("/home/financial-manager/outcome-detail?id=" + id);
  }

  function ViewIncomeDetail(id) {
    navigate("/home/financial-manager/income-detail?id=" + id);
  }

  //===================================

const DeleteIncome = async (id) => {
  try {
    
    const confirmDelete = await Swal.fire({
      title: 'You want to delete ?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#DD0000',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });

    if (!confirmDelete.isConfirmed) return;

    const response = await axios.delete(`https://localhost:7226/apis/Finance/DeleteIncome?id=${id}`);

    
    if (response.status === 200) {
    
      await Swal.fire({
        icon: 'success',
        title: 'Delete Successfully !!!',
        showConfirmButton: true,
      });
      window.location.href = '/home/financial-manager/finance-list';
    }
  } catch (error) {
    console.log(error);
    await Swal.fire({
      icon: 'error',
      title: 'Delete Unsuccessfully !!!',
      showConfirmButton: true,
    });
  }
};


  const DeleteOutcome = async (id) => {
    try {
      
      const confirmDelete = await Swal.fire({
        title: 'You want to delete ?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#DD0000',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      });
  
      if (!confirmDelete.isConfirmed) return;
  
      const response = await axios.delete(`https://localhost:7226/apis/Finance/DeleteOutcome?id=${id}`);
  
      
      if (response.status === 200) {
      
        Swal.fire({
          icon: 'success',
          title: 'Delete Successfully !!!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = '/home/financial-manager/finance-list';
        });
      
        setData(data.filter(item => item.id !== id));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Delete Unsuccessfully !!!',
        showConfirmButton: true,
      });
    }
  };
  
  //===================================

  return (
    <div>
      <h1 className='finance_title'>FINANCE REPORT LIST</h1>

      <div className='create_finance_top'>
        <Link to="/home/">
          <button className='finance_home'><span>BACK TO HOME</span></button>
        </Link>

        <Link to="/home/financial-manager/create-finance" className='finance_create_button'>
          <button><span>CREATE FINANCE</span></button>
        </Link>
      </div>


      <table className='finance_table'>
        <thead className='finance_table_thead'>
          <tr>
            <th>Type</th>
            <th>Bill Code</th>
            <th>Title</th>
            <th>Description</th>
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
              <td>{item.billCode}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
              <td>
                <Button
                  onClick={() => {item.type === 'Outcome' ? ViewOutcomeDetail(item.id) : ViewIncomeDetail(item.id)}}
                  variant="outlined"
                  size="small"
                  className="detail-button"
                >
                  View Detail
                </Button>
              </td>
              <td>
  {item.financeStatus === 0 || item.financeStatus === 3 ? (
    <Button
      onClick={() => {
        if (item.type === 'Outcome') {
          DeleteOutcome(item.id);
        } else if (item.type === 'Income') {
          DeleteIncome(item.id);
        }
      }}
      size="small"
      className="delete-button" 
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

export default FinanceList;