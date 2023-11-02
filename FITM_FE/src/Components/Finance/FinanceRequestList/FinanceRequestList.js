import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import getStatusLabel from "../SupportFunctions/SupportFunction";
import PaginationComponent from "../../../Variable/Paggination/Paggination";
import { getStatusStyle } from "../SupportFunctions/SupportFunction";
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
      setData(response.data.filter((data) => data.financeStatus === 1));
    } catch (error) {
    }
  };

  const getTypeStyle = (IsIncome) => {
    if (IsIncome) {
      return {
        color: "green",
      };
    } else if (!IsIncome) {
      return {
        color: "red",
      };
    }
    return {};
  };

  const handleDelete = async (id, type) => {
    try {
      let deleteUrl = "";
      if (type === "Income") {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteIncome?id=${id}`;
      } else if (type === "Outcome") {
        deleteUrl = `https://localhost:7226/apis/Finance/DeleteOutcome?id=${id}`;
      } else {
        return;
      }

      const response = await axios.delete(deleteUrl);

      if (response.status === 200) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire({
          title: "Success",
          text: "Deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/financial-manager/finance-request-list";
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Deletion unsuccessful",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/financial-manager/finance-request-list";
      });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function ViewOutcomeRequestDetail(id) {
    navigate("/financial-manager/outcome-request-detail?id=" + id);
  }

  function ViewIncomeRequestDetail(id) {
    navigate("/financial-manager/income-request-detail?id=" + id);
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
        window.location.href = "/financial-manager/finance-request-list";
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
          window.location.href = "/financial-manager/finance-request-list";
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
    <div>
      <h1 className="finance_title">FINANCE REPORT REQUEST LIST</h1>

      <div className="create_finance_top">
        <Link to="/">
          <button className="finance_home">
            <span>BACK TO HOME</span>
          </button>
        </Link>
      </div>
      <table className="finance_table">
        <thead className="finance_table_thead">
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td style={getTypeStyle(item.IsIncome)}>{item.IsIncome ? "Income": "Outcome"}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td style={getStatusStyle(item.financeStatus)}>
                  {getStatusLabel(item.financeStatus)}
                </td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
