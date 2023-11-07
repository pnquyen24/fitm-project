import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BalanceDetails.css";
import { useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import {getStatusStyle} from "../SupportFunctions/SupportFunction";
import axios from "axios";
import PaginationComponent from "../../../Variable/Paggination/Paggination";

const BalanceDetails = () => {
  document.title = "Balance Details";

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
        const response = await axios.get(
          `https://localhost:7226/apis/Finance/GetBalanceDetails?start=${startDate}&end=${endDate}`
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

  //===================================

  const DeleteIncome = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "You want to delete ?",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#DD0000",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      if (!confirmDelete.isConfirmed) return;

      const response = await axios.delete(
        `https://localhost:7226/apis/Finance/DeleteIncome?id=${id}`
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Delete Successfully !!!",
          showConfirmButton: true,
        });
        window.location.href = "/financial-manager/finance-list";
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Delete Unsuccessfully !!!",
        showConfirmButton: true,
      });
    }
  };

  const DeleteOutcome = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "You want to delete ?",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#DD0000",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      if (!confirmDelete.isConfirmed) return;

      const response = await axios.delete(
        `https://localhost:7226/apis/Finance/DeleteOutcome?id=${id}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Delete Successfully !!!",
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "/financial-manager/finance-list";
        });

        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Unsuccessfully !!!",
        showConfirmButton: true,
      });
    }
  };

  //===================================

  return (
    <div className="finance">
      <h1 className="finance_title">BALANCE REPORT LIST</h1>

      <div className="create_finance_top">

        <button className="finance_home" onClick={handleDownloadBalance}>
          <span>Download Detail</span>
        </button>

        <Link to="/financial-manager/balance">
          <button className="finance_home">
            <span>Back to balance</span>
          </button>
        </Link>
      </div>

      <Table className="finance_table" style={{ maxWidth: "500px" }}>
        <TableHead className="finance_table_thead">
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Bill Code</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Detail</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={getTypeStyle(item.isIncome ? "Income" : "Outcome")}>
                {item.isIncome ? "Income" : "Outcome"}
              </TableCell>
              <TableCell>{item.billCode}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell style={getStatusStyle(item.financeStatus)}>
                {getStatusLabel(item.financeStatus)}
              </TableCell>
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

              <TableCell>
                {item.financeStatus === 0 ||
                item.financeStatus === 1 ||
                item.financeStatus === 3 ? (
                  <Button
                    onClick={() => {
                      if (item.isIncome === false) {
                        DeleteOutcome(item.id);
                      } else if (item.isIncome === true) {
                        DeleteIncome(item.id);
                      }
                    }}
                    size="small"
                    className="delete-button"
                  >
                    <span>
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </Button>
                ) : (
                  <span>Can't delete</span>
                )}
              </TableCell>
            </TableRow>
          ))}
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

export default BalanceDetails;
