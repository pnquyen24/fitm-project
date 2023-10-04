import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./RequestChangeInfoList.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';



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

  function viewDetail(id) {
    navigate("/home/member-manager/request-details?id=" + id )
  }
  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} className="TableContainer">
            <Table>
              <TableHead className='TableHead'>
                <TableRow>
                  <TableCell>!</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>StudentID</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.createdBy}</TableCell>
                    <TableCell>{request.createdTime}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell  className={`${status[request.status]}`}>{status[request.status]}</TableCell>
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

        <span className='main-page'>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="pagination-button sub-button"
          style={{ display: pageSize * (page) < total? "block" : "none" }}
        >Page {page + 1}</button>


        <button
          onClick={() => setPage(page + 2)}
          className="pagination-button sub-button"
          style={{ display: pageSize * (page+1) < total? "block" : "none" }}
        >Page {page +2 }</button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={pageSize * page >= total}
          className="pagination-button sub-button"
        >
          Next Page
        </button>

        <button
          onClick={() => setPage(Math.ceil(total/pageSize))}
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