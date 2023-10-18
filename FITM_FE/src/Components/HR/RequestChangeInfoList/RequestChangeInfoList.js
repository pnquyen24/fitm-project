import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./RequestChangeInfoList.css";
import { FormControl, Select, MenuItem } from '@mui/material';



function RequestChangeInfoList() {
  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(9);
  const [sort] = useState('');
  const [sortDirection] = useState(0);
  const [filterItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  let [option, setOption] = useState('All');
  const navigate = useNavigate();
  const status = {
    0: "Pending",
    1: "Accepted",
    2: "Denied"
  }

  useEffect(() => {
    const requestData = {
      page,
      pageSize,
      sort,
      sortDirection,
      filterItems,
      searchText,
    };
    setLoading(true);

    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    axios
      .post('https://localhost:7226/apis/RequestEditInfo/GetAllPagging', requestData)
      .then((response) => {
        setMemberList(response.data.results);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize, sort, sortDirection, filterItems, searchText]);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  function viewDetail(id) {
    navigate("/member-manager/request-details?id=" + id)
  }
  return (
    <div className="container">
      <div className="menu-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <div className="select-container">
            <FormControl>
              <Select value={option} onChange={handleChange}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Denied">Denied</MenuItem>
                <MenuItem value="All">ALL</MenuItem>
              </Select>
            </FormControl>
          </div> 
      </div>
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} className="TableContainer">
            <Table>
              <TableHead className='TableHead'>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>StudentID</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{(index+1)+ (page-1)*pageSize}</TableCell>
                    <TableCell>{request.createdBy}</TableCell>
                    <TableCell>{request.studentID}</TableCell>
                    <TableCell>{new Date(request.createdTime).toLocaleDateString()}</TableCell>
                    <TableCell className={`${status[request.status]}`}>{status[request.status]}</TableCell>
                    <TableCell>
                      <Button onClick={() => viewDetail(request.id)} variant="outlined" size='small' className='detail-button'>View Detail</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div className="button-container">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="pagination-button sub-button"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage(page - 2)}
          className="pagination-button sub-button"
          style={{ display: (page - 2) > 0 ? "block" : "none" }}
        >
          Page {page - 2}
        </button>

        <button
          onClick={() => setPage(page - 1)}
          className="pagination-button sub-button"
          style={{ display: (page - 1) > 0 ? "block" : "none" }}
        >Page {page - 1}</button>


        <button
          className="pagination-button sub-button main-page"
        >
          Page {page}
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="pagination-button sub-button"
          style={{ display: pageSize * (page) < total ? "block" : "none" }}
        >Page {page + 1}</button>


        <button
          onClick={() => setPage(page + 2)}
          className="pagination-button sub-button"
          style={{ display: pageSize * (page + 1) < total ? "block" : "none" }}
        >Page {page + 2}</button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={pageSize * page >= total}
          className="pagination-button sub-button"
        >
          Next Page
        </button>

        <button
          onClick={() => setPage(Math.ceil(total / pageSize))}
          disabled={pageSize * page >= total}
          className="pagination-button sub-button"
        >
          Last Page
        </button>
      </div>
    </div>
  );
}

export default RequestChangeInfoList;