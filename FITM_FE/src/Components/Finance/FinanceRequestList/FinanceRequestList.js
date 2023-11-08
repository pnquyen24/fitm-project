import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import PaginationComponent from "../../../Variable/Pagination/Pagination";
import "./FinanceRequestList.css";

const FinanceRequestList = () => {
  document.title = "Finnance Request List";

  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE] = useState(5);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {}, [data]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      const response = await axios.get(
        `https://localhost:7226/apis/Finance/GetFinanceReport`
      )
      setData(response.data.filter((dt) => dt.financeStatus === 1));
    } catch (error) {
    }
  };

  const getTypeStyle = (isIncome) => {
    if (isIncome) {
      return {
        color: "green",
      };
    } else if (!isIncome) {
      return {
        color: "red",
      };
    }
    return {};
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function ViewOutcomeRequestDetail(id) {
    navigate("/financial-manager/outcome-request-detail?id=" + id);
  }

  function ViewIncomeRequestDetail(id) {
    navigate("/financial-manager/income-request-detail?id=" + id);
  }

  //===================================

  return (
    <div className="finance">
      <div className="create_finance_top" style={{marginTop:"20px"}}>
        <Link to="/">
          <Button variant="contained" color="primary">BACK TO HOME</Button>
        </Link>
      </div>
      <Table className="finance_table">
        <TableHead className="finance_table_thead">
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <TableCell style={getTypeStyle(item.isIncome)}>{item.isIncome ? "Income": "Outcome"}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  {getStatusLabel(item.financeStatus)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      item.type === "Outcome"
                        ? ViewOutcomeRequestDetail(item.id)
                        : ViewIncomeRequestDetail(item.id);
                    }}
                    variant="outlined"
                    size="small"
                    className="detail-button"
                  >
                    View Detail
                  </Button>
                </TableCell>
              </tr>
            );
          })}
        </TableBody>
      </Table>
      <div style={{ marginTop: "30px" }}>
        <PaginationComponent
          data={data}
          itemPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FinanceRequestList;
