import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./PerformanceTable.css";
import Paper from '@mui/material/Paper';
import { DeleteSharp, EditCalendarSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import { useTheme } from "@mui/material/styles";
function PerformanceTable() {

    let [performances, setPerformances] = useState([]);
    const navigate = useNavigate();

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

        const response = await axios.get(
            `https://localhost:7226/apis/PerformanceSchedule/ViewListMember?pfmID=${pfmId}`
        ).then((response) => {
            getMembers(response.data);
        }).catch(() => {
            CustomeAlert.warning("Something was wrong")
        });
    }

    function getMembers(data) {
        navigate("/attendancePerformance", {
            state: {
                data: data,
            },
        });
    }

    return (
        <div className="table-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="lefl">Name</TableCell>
                            <TableCell align="lefl">Place</TableCell>
                            <TableCell align="lefl">Date</TableCell>
                            <TableCell align="lefl">Time</TableCell>
                            <TableCell align="lefl">Status</TableCell>
                            <TableCell align="lefl">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {performances.map((performance, index) => (
                            <TableRow
                                key={performance.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index}
                                </TableCell>
                                <TableCell align="lefl">{performance.name}</TableCell>
                                <TableCell align="lefl">{performance.place}</TableCell>
                                <TableCell align="lefl">{performance.date}</TableCell>
                                <TableCell align="lefl">{performance.time.substring(0, 5)}</TableCell>
                                <TableCell align="lefl">{performance.status}</TableCell>
                                <TableCell align="lefl">
                                    <IconButton aria-label="delete"
                                        onClick={(e) => attendance(performance.id)}
                                    >
                                        <EditCalendarSharp color="primary" />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <CallOffDialog
                                            Name={performance.name}
                                            Place={performance.place}
                                            Date={performance.date}
                                            Time={performance.time.substring(0, 5)}
                                            pfmId={performance.id}
                                        >
                                        </CallOffDialog>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
function CallOffDialog(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCallOff = () => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        const response = axios.put(
            `https://localhost:7226/apis/PerformanceSchedule/CallOff?pfmID=${props.pfmId}`
        ).then((response) => {
            CustomeAlert.success("Call Off Successfully");
        }).catch((error) => {
            CustomeAlert.error("Call Off Error")
        });

        setOpen(false);
    };

    const handleClose = () => {
        CustomeAlert.warning("Call off failed!");
        setOpen(false);
    };
    return (
        <div>
            <IconButton aria-label="delete"
                onClick={handleClickOpen}>
                <DeleteSharp color="error" />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Call Off Show"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1">
                        Are you sure to call off the "
                        {props.Name}" show at {props.Place} on {props.Date} at {props.Time}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="success"
                        autoFocus
                        onClick={handleCallOff}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleClose}
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default PerformanceTable