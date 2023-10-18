import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FinanceList.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button, FormControl, Select, MenuItem, Tooltip } from '@mui/material';
import axios from 'axios';
import PaginationComponent from '../../Variable/Paggination/Paggination';

const FinanceList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE] = useState(5);
  const [data, setData] = useState([]);
  let [filterValue, setFilterValue] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        const response = await axios.get(`https://localhost:7226/apis/Finance/GetFinanceReport`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


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

  // Filter function to filter data based on selected filter
  const filterData = () => {
    if (filterValue === "Income") {
      return data.filter(item => item.isIncome);
    } else if (filterValue === "Outcome") {
      return data.filter(item => !item.isIncome);
    } else {
      return data;
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    filterValue = event.target.value;
    setFilterValue(filterValue)
    setFilteredData(filterData());
  };

  function ViewOutcomeDetail(id) {
    navigate("/financial-manager/outcome-detail?id=" + id);
  }

  function ViewIncomeDetail(id) {
    navigate("/financial-manager/income-detail?id=" + id);
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
        window.location.href = '/financial-manager/finance-list';
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
          window.location.href = '/financial-manager/finance-list';
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
        <Link to="/">
          <button className='finance_home'><span>BACK TO HOME</span></button>
        </Link>

        <div className="filter-dropdown">
          <Select value={filterValue} onChange={handleFilterChange}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Outcome">Outcome</MenuItem>
          </Select>
        </div>

        <Link to="/financial-manager/balance">
          <button className='finance_home'><span>View balance</span></button>
        </Link>

        <Link to="/financial-manager/create-finance" className='finance_create_button'>
          <button><span>CREATE FINANCE</span></button>
        </Link>
      </div>


      <table className='finance_table' style={{ maxWidth: '500px' }}>
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
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td style={getTypeStyle(item.isIncome ? 'Income' : 'Outcome')}>{item.isIncome ? 'Income' : 'Outcome'}</td>
              <td>{item.billCode}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
              <td>
                <Button
                  onClick={() => { item.isIncome ? ViewIncomeDetail(item.id) : ViewOutcomeDetail(item.id) }}
                  variant="outlined"
                  size="small"
                  className="detail-button"
                >
                  View Detail
                </Button>
              </td>


              <td>

                {item.financeStatus === 0 || item.financeStatus === 1 || item.financeStatus === 3 ? (
                  <Button
                    onClick={() => {
                      if (item.isIncome == false) {
                        DeleteOutcome(item.id);
                      } else if (item.isIncome == true) {
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


      <div style={{ marginTop: '30px' }}>
        <PaginationComponent data={filteredData} itemPerPage={ITEMS_PER_PAGE} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

    </div>
  );
};

export default FinanceList;