import { Chip } from "@mui/material";

// statusUtils.js
export default function getStatusLabel(status) {
    if (status === 0) {
        return <Chip label="Ready" size="small"></Chip>;
    } else if (status === 1) {
        return <Chip label="Pending" color="warning" size="small"></Chip>;
    } else if (status === 2) {
        return <Chip label="Accepted" color="success" size="small"></Chip>;
    } else if (status === 3) {
        return <Chip label="Denied" color="error" size="small"></Chip>;
    }
    return "";
}
