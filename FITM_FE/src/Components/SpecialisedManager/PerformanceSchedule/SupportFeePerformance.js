import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function SupportFeePerformance() {

    const [members, setMembers] = useState([]);

    function sumRow(attended, supportFee) {
        if (attended === null || attended === undefined) {
            return 0;
        }

        return attended * supportFee;
    }

    function createRow(member) {
        const sum = sumRow(member.totalPerformance, 50000);
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
                "https://localhost:7226/apis/PerformanceSchedule/CountPerformanceOfMember"
            )
            .then((response) => {
                setMembers(response.data);
            })
            .catch((error) => { });
    }, []);

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
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SupportFeePerformance;