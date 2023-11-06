import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SupportFeePerformance() {
    document.title = "Support Fee Performance";

    const [members, setMembers] = useState([]);
    const [supportFee, setSupportFee] = useState(50000);
    const [monthRange, setMonthRange] = useState(1);
    const navigate = useNavigate();

    const handleChangeSupportFee = (event) => {
        setSupportFee(event.target.value);
    };

    const handleChangeMonthRange = (event) => {
        setMonthRange(event.target.value);
    };

    function sumRow(attended, supportFee) {
        if (attended === null || attended === undefined) {
            return 0;
        }

        return attended * supportFee;
    }

    function createRow(member) {
        const sum = sumRow(member.totalPerformance, supportFee);
        return {
            id: member.memberID,
            stdId: member.studentID,
            fullName: member.memberFullName,
            bankNumber: member.bankNumber,
            bankName: member.bankName,
            attended: member.totalPerformance,
            sum,
        };
    }

    const rows = members?.map((member) => {
        return createRow(member);
    });

    function totalFee(items) {
        return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
    }
    function totalAttend(items) {
        return items.map(({ attended }) => attended).reduce((sum, i) => sum + i, 0);
    }

    useEffect(() => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get(
                `https://localhost:7226/apis/PerformanceSchedule/CountPerformanceOfMember?monthRange=${monthRange}`
            )
            .then((response) => {
                setMembers(response.data);
            })
            .catch((error) => { });
    }, [monthRange]);

    function handleCrateOutCome(outcome){
        navigate("/financial-manager/create-finance",  {
            state: {
                outcome: outcome,
            },
        });
    }

    return (
        <div className="table-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Student ID</TableCell>
                            <TableCell align="left">Full Name</TableCell>
                            <TableCell align="left">Bank Number</TableCell>
                            <TableCell align="left">Bank Name</TableCell>
                            <TableCell align="left">Attended</TableCell>
                            <TableCell align="left">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.memberID}>
                                <TableCell>{row.stdId}</TableCell>
                                <TableCell align="left">{row.fullName}</TableCell>
                                <TableCell align="left">{row.bankNumber}</TableCell>
                                <TableCell align="left">{row.bankName}</TableCell>
                                <TableCell align="left">{row.attended}</TableCell>
                                <TableCell align="left">{row.sum}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3} />
                            <TableCell >Total</TableCell>
                            <TableCell >{totalAttend(rows)}</TableCell>
                            <TableCell align="left">{totalFee(rows)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} />
                            <TableCell >
                                <FormControl variant="standard">
                                    <InputLabel >Month</InputLabel>
                                    <Select
                                        value={monthRange}
                                        onChange={handleChangeMonthRange}
                                        label="Month"
                                    >
                                        <MenuItem value={1}>January</MenuItem>
                                        <MenuItem value={2}>February</MenuItem>
                                        <MenuItem value={3}>March</MenuItem>
                                        <MenuItem value={4}>April</MenuItem>
                                        <MenuItem value={5}>May</MenuItem>
                                        <MenuItem value={6}>June</MenuItem>
                                        <MenuItem value={7}>July</MenuItem>
                                        <MenuItem value={8}>August</MenuItem>
                                        <MenuItem value={9}>September</MenuItem>
                                        <MenuItem value={10}>October</MenuItem>
                                        <MenuItem value={11}>November</MenuItem>
                                        <MenuItem value={12}>December</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell >
                                <FormControl variant="standard">
                                    <InputLabel >Supprort Fee</InputLabel>
                                    <Select
                                        value={supportFee}
                                        onChange={handleChangeSupportFee}
                                        label="Supprort Fee"
                                    >
                                        <MenuItem value={30000}>30.000</MenuItem>
                                        <MenuItem value={50000}>50.000</MenuItem>
                                        <MenuItem value={100000}>100.000</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell >
                                <Button variant="contained" size="small" onClick={(e) => handleCrateOutCome(totalFee(rows))}>Outcome</Button>
                                </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SupportFeePerformance;