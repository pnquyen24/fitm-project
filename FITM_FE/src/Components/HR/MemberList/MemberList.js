import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberList.css";
import * as XLSX from 'xlsx';
import Button from "@mui/material/Button";
import { FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const [allMember, setAllMember] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(9);
  const [sort] = useState("");
  const [sortDirection] = useState(0);
  const [filterItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  let [option, setOption] = useState('All');
  const navigate = useNavigate();

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

    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;

    axios
      .post("https://localhost:7226/apis/Member/GetAllPagging", requestData)
      .then((response) => {
        setMemberList(response.data.results);
        getAllMember();
        setTotal(response.data.total);
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize, sort, sortDirection, filterItems, searchText]);

    function getAllMember() {
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    axios
        .get("https://localhost:7226/apis/Member/ExportMembers")
        .then((response) => {
            setAllMember(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

  
const handleDownload =  () => {
   getAllMember(); 
  if (allMember.length != 0) {
      const ws = XLSX.utils.json_to_sheet(allMember);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'MemberData');
      XLSX.writeFile(wb, 'FIT-members.xlsx');
  }
  else alert("Data is null");
};

  function viewDetail(id) {
    navigate("/home/member-manager/member-profile?id=" + id);
  }
  function addMember() {
    navigate("/home/member-manager/create-member");
  }

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="container">
      <div>
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
              <Select  value={option} onChange={handleChange}>
                <MenuItem value="Active" style={{color:"green"}}>Active</MenuItem>
                <MenuItem value="Inactive" style={{color:"red"}}>Inactive</MenuItem>
                <MenuItem value="All">All</MenuItem>
              </Select>
            </FormControl>
          </div> 
          <div className="member-download-button">
                <Button variant="contained" color="success" onClick={handleDownload}>Download As Excel</Button>
            </div>
          <div className="create-member">
           <Button onClick={() => addMember()} variant="outlined" size="small" sx={{}} className="detail-button">Add Member</Button>
          </div>
          
        </div>  
      </div>

      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} className="TableContainer">
            <Table>
              <TableHead className="TableHead">
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>FullName</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>StudentID</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{(index + 1) + (page - 1) * pageSize}</TableCell>
                    <TableCell>{request.fullName}</TableCell>
                    <TableCell>{request.username}</TableCell>
                    <TableCell>{request.studentID}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell style={{ color: request.status ? 'green' : 'red' }}>
                      {request.status ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => viewDetail(request.id)}
                        variant="outlined"
                        size="small"
                        className="detail-button"
                      >
                        View Detail
                      </Button>
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
          style={{ display: page - 2 > 0 ? "block" : "none" }}
        >
          Page {page - 2}
        </button>

        <button
          onClick={() => setPage(page - 1)}
          className="pagination-button sub-button"
          style={{ display: page - 1 > 0 ? "block" : "none" }}
        >
          Page {page - 1}
        </button>

        <button
          className="pagination-button sub-button main-page"
        >
          Page {page}
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="pagination-button sub-button"
          style={{ display: pageSize * page < total ? "block" : "none" }}
        >
          Page {page + 1}
        </button>

        <button
          onClick={() => setPage(page + 2)}
          className="pagination-button sub-button"
          style={{ display: pageSize * (page + 1) < total ? "block" : "none" }}
        >
          Page {page + 2}
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={pageSize * page > total}
          className="pagination-button sub-button"
        >
          Next Page
        </button>

        <button
          onClick={() => setPage(Math.ceil(total / pageSize))}
          disabled={pageSize * page > total}
          className="pagination-button sub-button"
        >
          Last Page
        </button>
      </div>
    </div>
  );
}

export default MemberList;
