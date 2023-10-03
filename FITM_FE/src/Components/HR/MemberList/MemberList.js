import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberList.css";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(9);
  const [sort] = useState("");
  const [sortDirection] = useState(0);
  const [filterItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
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
        console.log(response.data.results);
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
    navigate("/home/member-manager/member-profile?id=" + id);
  }
  function addMember() {
    navigate("/home/member-manager/create-member");
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
        <Button  onClick={() => addMember()} variant="outlined"size="small" sx={{}} className="detail-button create-member ">Add Member</Button>
      </div>
      
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} className="TableContainer">
            <Table>
              <TableHead className="TableHead">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FullName</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>StudentID</TableCell>
                  <TableCell>
                    Mail <MailIcon />
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
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

        <span className="main_page">Page {page}</span>

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
