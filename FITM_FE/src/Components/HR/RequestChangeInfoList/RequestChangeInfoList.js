import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./RequestChangeInfoList.css";
import PaginationComponent from '../../../Variable/Paggination/Paggination';
import { FormControl, Select, MenuItem } from '@mui/material';


function RequestChangeInfoList() {
  document.title = "Change Info List";

  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [loading, setLoading] = useState(false);
  let [searchText, setSearchText] = useState('');
  let [option, setOption] = useState('All');
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const status = {
    0: "Pending",
    1: "Accepted",
    2: "Denied"
  }

  useEffect(() => {
    axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios
      .get('https://localhost:7226/apis/RequestEditInfo/GetAll')
      .then((response) => {
        if (option === "All") { setMemberList(response.data); setFilteredData(response.data) }
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Filter function to filter data based on selected filter
  const filterData = () => {
    if (option === "Accepted" ) {
      return memberList.filter(item => item.status === 1);
    } else if (option === "Denied") {
      return memberList.filter(item => item.status === 2);
    } else if (option === "Pending") {
      return memberList.filter(item => item.status === 0);
    }
    else {
      return memberList;
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    searchText = "";
    setSearchText(searchText)
    option = event.target.value;
    setOption(option)
    setFilteredData(filterData());
  };

  // Handle searchtext
  const handleSearch = (event) => {
    searchText = event.target.value;
    setSearchText(searchText)
    if(searchText === "") {setFilteredData(filterData())}
    else{
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive matching
    setFilteredData(() => {
      return memberList.filter(member => regex.test(member.createdBy));
    });}
  };

  function viewDetail(id) {
    navigate("/member-manager/request-details?id=" + id)
  }
  function toMemberList() {
    navigate("/member-manager/member-list");
  }
  return (
    <div className="membercontainer">
      <div className="menu-container" style={{display:"flex"}}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="select-container" style={{marginTop :"4px"}}>
          <FormControl>
            <Select value={option} onChange={handleFilterChange}>
              <MenuItem value="All" style={{ color: "gray" }}>ALL</MenuItem>
              <MenuItem value="Pending" style={{ color: "orange" }}>Pending</MenuItem>
              <MenuItem value="Accepted" style={{ color: "green" }}>Accepted</MenuItem>
              <MenuItem value="Denied" style={{ color: "red" }}>Denied</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button onClick={() => toMemberList()} variant="contained" color="primary" size='medium' sx={{marginLeft: "10px",marginTop:"4px",height:"50%",padding : "4px 10px"}}>Members</Button>
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
                {paginatedData.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell style={{ width: '50px' }}>{(index + 1) + (page - 1) * pageSize}</TableCell>
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
      <div style={{ marginTop: '30px' }}>
        <PaginationComponent data={filteredData} itemPerPage={pageSize} currentPage={page} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default RequestChangeInfoList;