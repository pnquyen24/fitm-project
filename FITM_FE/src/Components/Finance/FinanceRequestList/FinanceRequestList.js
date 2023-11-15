import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../Variable/Api/api";
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
import getStatusLabel from "../SupportFunctions/SupportFunction";
import PaginationComponent from "../../../Variable/Pagination/Pagination";
import "./FinanceRequestList.css";

const FinanceRequestList = () => {
  document.title = "Finance Request List";

  const GET_FINANCE_REPORT_URL = "Finance/GetFinanceReport";

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
      const response = await axiosClient.get(GET_FINANCE_REPORT_URL);
      setData(response.data.filter((dt) => dt.financeStatus === 1));
    } catch (error) {}
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
    <>
      <Card className="finance">
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
                  <TableCell style={getTypeStyle(item.isIncome)}>
                    {item.isIncome ? "Income" : "Outcome"}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{getStatusLabel(item.financeStatus)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        !item.isIncome
                          ? ViewOutcomeRequestDetail(item.id)
                          : ViewIncomeRequestDetail(item.id);
                      }}
                      variant="outlined"
                      size="small"
                      className="detail-button"
                    >
                      Detail
                    </Button>
                  </TableCell>
                </tr>
              );
            })}
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

export default FinanceRequestList;
