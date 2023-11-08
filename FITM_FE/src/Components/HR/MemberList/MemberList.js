import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import * as XLSX from 'xlsx';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../Variable/Pagination/Pagination";
import "./MemberList.css";
import CustomeAlert from "../../Member/Alert/CustomeAlert";

function MemberList() {
  const [allMember, setAllMember] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  let [searchText, setSearchText] = useState("");
  const [loading,setLoading] = useState(false);
  let [option, setOption] = useState('All');
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .get("https://localhost:7226/apis/Member/ExportMembers")
        .then((response) => {
          if (option === "All") { setAllMember(response.data); setFilteredData(response.data) }
        })
        .catch((error) => {
          setLoading(true);
        });
  }, []);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDownload = () => {
    if (allMember.length !== 0) {
      const ws = XLSX.utils.json_to_sheet(allMember);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'MemberData');
      XLSX.writeFile(wb, 'FIT-members.xlsx');
    }
    else CustomeAlert.error("Data is null");
  };


  // Filter function to filter data based on selected filter
  const filterData = () => {
    if (option === "Active") {
      return allMember.filter(item => item.status);
    } else if (option === "Inactive") {
      return allMember.filter(item => !item.status);
    } else {
      return allMember;
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
      return filteredData.filter(member => regex.test(member.fullName));
    });}
  };
  function viewDetail(id) {
    navigate("/member-manager/member-profile?id=" + id);
  }

  function addMember() {
    navigate("/member-manager/create-member");
  }

  function requestList() {
    navigate("/member-manager/request-edit-info-list");
  }

  function convertStatus(status) {
    if (status)
      return <Chip label="Active" color="success" size="small"></Chip>;
    if (!status)
      return <Chip label="Inactive" color="error" size="small"></Chip>;
  }

  return (
    <div className="membercontainer">
      <div>
        <div className="menu-container" style={{display: "flex"}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="select-container pagination-button">
            <FormControl>
              <Select value={option} onChange={handleFilterChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active" style={{ color: "green" }}>Active</MenuItem>
                <MenuItem value="Inactive" style={{ color: "red" }}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="member-download-button pagination-button">
            <Button variant="contained" color="success" onClick={handleDownload}>Download As Excel</Button>
          </div>
          <div className='member-download-button pagination-button'>
           <Button onClick={() => requestList()} variant="contained" color="info"  sx={{}}>Request Change Info List</Button>
          </div> 
          <div className="pagination-button create-member ">
            <Button onClick={() => addMember()} variant="contained"  color="primary" sx={{}} className="detail-button">Add Member</Button>
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
                {paginatedData.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell style={{ width: '50px' }}>{(index + 1) + (page - 1) * pageSize}</TableCell>
                    <TableCell>{request.fullName}</TableCell>
                    <TableCell>{request.username}</TableCell>
                    <TableCell>{request.studentID}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell> {convertStatus(request.status)}  </TableCell>
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
        <div style={{ marginTop: '30px' }}>
          <PaginationComponent data={filteredData} itemPerPage={pageSize} currentPage={page} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}

export default MemberList;
