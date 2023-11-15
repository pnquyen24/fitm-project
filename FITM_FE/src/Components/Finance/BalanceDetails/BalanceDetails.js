import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BalanceDetails.css";
import { useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import * as XLSX from "xlsx";
import {
  Card,
  CardActions,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import axiosClient from "../../../Variable/Api/api";
import PaginationComponent from "../../../Variable/Pagination/Pagination";

const BalanceDetails = () => {
  document.title = "Balance Details";

  const GET_BALANCE_DETAILS_URL = "Finance/GetBalanceDetails";

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE] = useState(5);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `${GET_BALANCE_DETAILS_URL}?start=${startDate}&end=${endDate}`
        );
        setData(response.data);
      } catch (error) {}
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTypeStyle = (type) => {
    if (type === "Income") {
      return {
        color: "green",
      };
    } else if (type === "Outcome") {
      return {
        color: "red",
      };
    }
    return {};
  };

  function ViewOutcomeDetail(id) {
    navigate("/financial-manager/outcome-detail?id=" + id);
  }

  function ViewIncomeDetail(id) {
    navigate("/financial-manager/income-detail?id=" + id);
  }
  function handleDownloadBalance() {
    if (data.length !== 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "balance_data_detail");
      XLSX.writeFile(wb, "balance_data_detail.xlsx");
    } else {
      CustomeAlert.error("Data is null");
    }
  }

  return (
    <>
      <Card className="finance">
        <CardHeader
          title={
            <Typography variant="body1">
              Finance Detail
            </Typography>
          }
          action={
            <CardActions className="mx-1">
              <Button className="mx-2"
                onClick={handleDownloadBalance}
                variant="contained"
                color="success"
              >
                Download Detail
              </Button>

              <Link
                to="/financial-manager/balance"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined">Back</Button>
              </Link>
            </CardActions>
          }
        />
        <Table className="finance_table" style={{ minWidth: "500px" }}>
          <TableHead className="finance_table_thead">
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Bill Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  style={getTypeStyle(item.isIncome ? "Income" : "Outcome")}
                >
                  {item.isIncome ? "Income" : "Outcome"}
                </TableCell>
                <TableCell>{item.billCode}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{getStatusLabel(item.financeStatus)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      item.isIncome
                        ? ViewIncomeDetail(item.id)
                        : ViewOutcomeDetail(item.id);
                    }}
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
      </Card>
      <CardActions>
        <PaginationComponent
          data={data}
          itemPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </CardActions>
    </>
  );
};

export default BalanceDetails;
