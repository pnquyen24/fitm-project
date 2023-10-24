import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import "./PaginationTable.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaginationTable({ rows, columns }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleClick(id) {
        navigate("/attendance", {
            state: {
                scheduleId: id,
            },
        });
    }

    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "attendance") {
                                                return (
                                                    <TableCell key={row.id}>
                                                        <Button
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleClick(
                                                                    row.id
                                                                )
                                                            }
                                                        >
                                                            Attendance
                                                        </Button>
                                                    </TableCell>
                                                );
                                                // return (
                                                //     <TableCell key={row.id}>
                                                //         <Button
                                                //             variant="contained"
                                                //             onClick={() =>
                                                //                 handleClick(
                                                //                     row.id
                                                //                 )
                                                //             }
                                                //         >
                                                //             Attendance
                                                //         </Button>
                                                //     </TableCell>
                                                // );
                                            }
                                            return (
                                                <TableCell key={column.id}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default PaginationTable;
