import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./PerformanceTable.css";
import Paper from '@mui/material/Paper';
import { DeleteSharp, EditCalendarSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimerIcon from '@mui/icons-material/Timer';
import moment from "moment/moment";

function PerformanceTable() {

    let [performances, setPerformances] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get(
                "https://localhost:7226/apis/PerformanceSchedule/ViewAllPerformance"
            )
            .then((response) => {
                setPerformances(response.data);
            })
            .catch((error) => { });
    }, []);

    async function attendance(pfmId) {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        await axios
            .get(
                `https://localhost:7226/apis/PerformanceSchedule/ViewListMember?pfmID=${pfmId}`
            ).then((response) => {
                getMembers(response.data);
            }).catch(() => {
                CustomeAlert.warning("Something was wrong")
            });
    }

    const handleCallOff = (pfmId) => {
        CustomeAlert.confirm("Call Off This Performance", "Call Off", "Exit").then(
            (result) => {
                if (result.isConfirmed) {
                    axios.defaults.headers[
                        "Authorization"
                    ] = `Bearer ${localStorage.getItem("token")}`;

                    axios
                        .put(
                            `https://localhost:7226/apis/PerformanceSchedule/CallOff?pfmID=${pfmId}`
                        ).then((response) => {
                            CustomeAlert.success("Call Off Successfully");
                        }).catch((error) => {
                            CustomeAlert.error("Call Off Error");
                        });
                } else if (result.isDenied) {
                    CustomeAlert.error("Can't Call Off");
                } else {
                    CustomeAlert.error("Call Off Error");
                }
            }
        );


    };

    const statusPerformance = (status) => {
        if (status === 0)
            return <TimerIcon
                color="secondary">
            </TimerIcon>;
        if (status === 1)
            return <CancelIcon
                color="error">
            </CancelIcon>;
        if (status === 2)
            return <CheckCircleIcon
                color="success"
            ></CheckCircleIcon>;

    }

    function getMembers(data) {
        navigate("/attendancePerformance", {
            state: {
                data: data,
            },
        });
    }

    function dateCustomer(dateString) {
        return moment(dateString).format("DD/MM/YYYY");
    }

    function timeCustomer(timeString) {
        return moment(timeString, "HH:mm").format("HH:mm");
    }


    return (
        <div className="table-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Place</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {performances.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        ).map((performance, index) => (
                            <TableRow
                                key={performance.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {++index}
                                </TableCell>
                                <TableCell align="left">{performance.name}</TableCell>
                                <TableCell align="left">{performance.place}</TableCell>
                                <TableCell align="left">{dateCustomer(performance.date)}</TableCell>
                                <TableCell align="left">{timeCustomer(performance.time)}</TableCell>
                                <TableCell align="left">{statusPerformance(performance.status)}</TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="delete"
                                        onClick={(e) => attendance(performance.id)}
                                    >
                                        <EditCalendarSharp color="primary" />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={(e) => handleCallOff(performance.id)}>
                                        <DeleteSharp color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[8, 15, 50]}
                component="div"
                count={performances.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div >
    );
}
export default PerformanceTable