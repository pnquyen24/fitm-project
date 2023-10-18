import {
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CustomeFCLabel from "../Label/CustomeFCLabel";

function AttendanceTable({ columns, rows, handleChange }) {
    return (
        <TableContainer>
            <Table stickyHeader>
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
                    {rows.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (column.id === "attendance") {
                                        return (
                                            <TableCell key={row.id}>
                                                <RadioGroup
                                                    row
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            row.index
                                                        )
                                                    }
                                                    defaultValue={
                                                        row.attendance
                                                    }
                                                >
                                                    <CustomeFCLabel
                                                        value="false"
                                                        label="Absent"
                                                        control={<Radio />}
                                                    />
                                                    <CustomeFCLabel
                                                        value="true"
                                                        label="Present"
                                                        control={<Radio />}
                                                    />
                                                </RadioGroup>
                                            </TableCell>
                                        );
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
    );
}

export default AttendanceTable;
