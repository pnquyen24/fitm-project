import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import PaginationComponent from '../../../Variable/Paggination/Paggination';
import './FinanceRequestList.css';

const FinanceRequestList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE] = useState(5);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  }, [data]);
  useEffect(() => {
    fetchData();
  }, []);

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
      setData(combinedData.filter(data => data.financeStatus === 1));
    } catch (error) {
      console.error('Error fetching data:', error);
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


  const handleDelete = async (id, type) => {
    try {
      let deleteUrl = '';
      if (type === 'Income') {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteIncome?id=${id}`;
      } else if (type === 'Outcome') {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteOutcome?id=${id}`;
      } else {
        console.error('Invalid type');
        return;
      }
  
      const response = await axios.delete(deleteUrl);
  
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
        Swal.fire({
          title: 'Success',
          text: 'Deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/financial-manager/finance-request-list';
        });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        title: 'Error',
        text: 'Deletion unsuccessful',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = '/financial-manager/finance-request-list';
      });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  function ViewOutcomeRequestDetail(id) {
    navigate("/financial-manager/outcome-request-detail?id=" + id);
  }

  function ViewIncomeRequestDetail(id) {
    navigate("/financial-manager/income-request-detail?id=" + id);
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
        window.location.href = '/financial-manager/finance-request-list';
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
          window.location.href = '/financial-manager/finance-request-list';
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
      <h1 className='finance_title'>FINANCE REPORT REQUEST LIST</h1>

      <div className='create_finance_top'>
        <Link to="/">
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td style={getTypeStyle(item.type)}>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
                <td>
                  <Button
                    onClick={() => { item.type === 'Outcome' ? ViewOutcomeRequestDetail(item.id) : ViewIncomeRequestDetail(item.id) }}
                    variant="outlined"
                    size="small"
                    className="detail-button"
                  >
                    View Detail
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '30px' }}>
        <PaginationComponent data={data} itemPerPage={ITEMS_PER_PAGE} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default FinanceRequestList;