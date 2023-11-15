import {
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axiosClient from "../../../Variable/Api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestChangeInfoList.css";
import PaginationComponent from "../../../Variable/Pagination/Pagination";
import { FormControl, Select, MenuItem } from "@mui/material";

function RequestChangeInfoList() {
  document.title = "Change Info List";

  const GET_ALL_URL = "RequestEditInfo/GetAll";

  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [loading, setLoading] = useState(false);
  let [searchText, setSearchText] = useState("");
  let [option, setOption] = useState("All");
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(GET_ALL_URL)
      .then((response) => {
        if (option === "All") {
          setMemberList(response.data);
          setFilteredData(response.data);
        }
      })
      .catch((error) => {})
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
    if (option === "Accepted") {
      return memberList.filter((item) => item.status === 1);
    } else if (option === "Denied") {
      return memberList.filter((item) => item.status === 2);
    } else if (option === "Pending") {
      return memberList.filter((item) => item.status === 0);
    } else {
      return memberList;
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    searchText = "";
    setSearchText(searchText);
    option = event.target.value;
    setOption(option);
    setFilteredData(filterData());
  };

  // Handle searchtext
  const handleSearch = (event) => {
    searchText = event.target.value;
    setSearchText(searchText);
    if (searchText === "") {
      setFilteredData(filterData());
    } else {
      const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive matching
      setFilteredData(() => {
        return memberList.filter((member) => regex.test(member.createdBy));
      });
    }
  };

  function viewDetail(id) {
    navigate("/member-manager/request-details?id=" + id);
  }

  function toMemberList() {
    navigate("/member-manager/member-list");
  }

  function convertStatus(status) {
    if (status === 0)
      return <Chip label="Pending" color="warning" size="small"></Chip>;
    if (status === 1)
      return <Chip label="Accepted" color="success" size="small"></Chip>;
    if (status === 2)
      return <Chip label="Denied" color="error" size="small"></Chip>;
  }

  return (
    <>
      <Card className="membercontainer">
        <CardHeader
          className="menu-container"
          style={{ display: "flex" }}
          title={<Typography variant="body1">Requests</Typography>}
          action={
            <CardActions>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 200,
                  height: 35,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <FormControl className="mx-3">
                <Select value={option} onChange={handleFilterChange}>
                  <MenuItem value="All" style={{ color: "gray" }}>
                    ALL
                  </MenuItem>
                  <MenuItem value="Pending" style={{ color: "orange" }}>
                    Pending
                  </MenuItem>
                  <MenuItem value="Accepted" style={{ color: "green" }}>
                    Accepted
                  </MenuItem>
                  <MenuItem value="Denied" style={{ color: "red" }}>
                    Denied
                  </MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          }
        ></CardHeader>
        <div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <TableContainer component={Paper} className="TableContainer">
              <Table>
                <TableHead className="TableHead mt-1">
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
                      <TableCell style={{ width: "50px" }}>
                        {index + 1 + (page - 1) * pageSize}
                      </TableCell>
                      <TableCell>{request.createdBy}</TableCell>
                      <TableCell>{request.studentID}</TableCell>
                      <TableCell>
                        {new Date(request.createdTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{convertStatus(request.status)}</TableCell>
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
      </Card>
      <CardActions>
        <PaginationComponent
          data={filteredData}
          itemPerPage={pageSize}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </CardActions>
    </>
  );
}

export default RequestChangeInfoList;
