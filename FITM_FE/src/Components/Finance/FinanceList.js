import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FinanceList.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Select,
    MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import axiosClient from "../../Variable/Api/api";
import getStatusLabel from "./SupportFunctions/SupportFunction";
import PaginationComponent from "../../Variable/Pagination/Pagination";

const FinanceList = () => {
    document.title = "Finance";

    const GET_FINANCE_REPORT_URL = "Finance/GetFinanceReport";
    const DELETE_INCOME_URL = "Finance/DeleteIncome";
    const DELETE_OUTCOME_URL = "Finance/DeleteOutcome";

    const [currentPage, setCurrentPage] = useState(1);
    const [ITEMS_PER_PAGE] = useState(5);
    const [data, setData] = useState([]);
    const All = "All";
    const Income = "Income";
    const Outcome = "Outcome";
    let [filterValue, setFilterValue] = useState(All);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(GET_FINANCE_REPORT_URL);
                if (filterValue === "All") {
                    setData(response.data);
                    setFilteredData(response.data);
                }
            } catch (error) {}
        };
        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedData = filteredData.slice(
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

    // Filter function to filter data based on selected filter
    const filterData = () => {
        if (filterValue === Income) {
            return data.filter((item) => item.isIncome);
        } else if (filterValue === Outcome) {
            return data.filter((item) => !item.isIncome);
        } else {
            return data;
        }
    };

    // Handle filter change
    const handleFilterChange = (event) => {
        filterValue = event.target.value;
        setFilterValue(filterValue);
        setFilteredData(filterData());
    };

    function ViewOutcomeDetail(id) {
        navigate("/financial-manager/outcome-detail?id=" + id);
    }

    function ViewIncomeDetail(id) {
        navigate("/financial-manager/income-detail?id=" + id);
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

            const response = await axiosClient.delete(
                `${DELETE_INCOME_URL}?id=${id}`
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

            const response = await axiosClient.delete(
                `${DELETE_OUTCOME_URL}?id=${id}`
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
            <div className="finance_title"></div>

            <div className="create_finance_top">
                <Link to="/">
                    <Button variant="contained" color="primary">
                        <span>BACK TO HOME</span>
                    </Button>
                </Link>

                <div className="filter-dropdown">
                    <Select
                        value={filterValue}
                        style={{ padding: "0 0 0 0" }}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value={All} style={{ color: "gray" }}>
                            All
                        </MenuItem>
                        <MenuItem value={Income} style={{ color: "green" }}>
                            Income
                        </MenuItem>
                        <MenuItem value={Outcome} style={{ color: "red" }}>
                            Outcome
                        </MenuItem>
                    </Select>
                </div>

                <Link to="/financial-manager/balance">
                    <Button variant="contained" color="primary">
                        View balance
                    </Button>
                </Link>

                <Link to="/financial-manager/create-finance">
                    <Button variant="contained" color="primary">
                        CREATE Finance
                    </Button>
                </Link>
            </div>

            <Table className="finance_table">
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
                            <TableCell
                                style={getTypeStyle(
                                    item.isIncome ? "Income" : "Outcome"
                                )}
                            >
                                {item.isIncome ? "Income" : "Outcome"}
                            </TableCell>
                            <TableCell>{item.billCode}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
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
                                        className="delete-button"
                                    >
                                        <span className="trash_icon">
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
                    data={filteredData}
                    itemPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default FinanceList;
