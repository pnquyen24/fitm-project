import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FinanceList.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const FinanceList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7226/apis/Finance/GetFinanceReport?page=${page}&pageSize=${pageSize}`);
        setData(response.data.Items);
        setTotal(response.data.TotalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize]);

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

  function viewDetail(id, type) {
    navigate(`/home/financial-manager/${type.toLowerCase()}-detail?id=${id}`);
  }

  const handleDelete = async (id, type) => {
    const confirmDelete = await Swal.fire({
      title: 'You want to delete ?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#DD0000',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await axios.delete(`https://localhost:7226/apis/Finance/Delete${type}?id=${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Delete Successfully !!!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = '/home/financial-manager/finance-list';
        });
        setData(data.filter((item) => item.id !== id));
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1 className='finance_title'>FINANCE REPORT LIST</h1>

      <div className='create_finance_top'>
        <Link to="/home/">
          <button className='finance_home'><span>BACK TO HOME</span></button>
        </Link>

        <Link to="/home/financial-manager/balance">
          <button className='finance_home'><span>View balance</span></button>
        </Link>

        <Link to="/home/financial-manager/create-finance" className='finance_create_button'>
          <button><span>CREATE FINANCE</span></button>
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Bill Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell style={getTypeStyle(item.type)}>{item.type}</TableCell>
                  <TableCell>{item.billCode}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => viewDetail(item.id, item.type)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {item.financeStatus === 0 || item.financeStatus === 1 || item.financeStatus === 3 ? (
                      <IconButton
                        onClick={() => handleDelete(item.id, item.type)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <span>Can't delete</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
  </TableContainer>

  <Pagination
    className="pagination"
    count={Math.ceil(total / pageSize)}
    page={page}
    onChange={handleChangePage}
  />
</div>
);
};

export default FinanceList;