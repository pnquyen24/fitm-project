import PerformanceItem from "./PerformanceItem";
import {
    Grid,
    Stack,
    Pagination,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import "./Performance.css"

function Performance() {

    const Img = styled('img')({
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <div className="pfm-container">
            <Grid container justifyContent="center" spacing={3}>
                <PerformanceItem
                    Place="THPT Quốc Học Quy Nhơn"
                    Image="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80"
                    Name="Đưa nhạc cụ dân tộc đến với trường THPT"
                    Date="20/10/2023"
                    Time="18:00"
                ></PerformanceItem>
                <PerformanceItem
                    Place="Quân Đoàn 3"
                    Image="https://images.unsplash.com/photo-1670028514318-0ac718c0590d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
                    Name="Army Night"
                    Date="20/10/2023"
                    Time="18:00"
                ></PerformanceItem>
                <PerformanceItem
                    Place="THPT Quốc Học Quy Nhơn"
                    Image="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80"
                    Name="Đưa nhạc cụ dân tộc đến với trường THPT"
                    Date="20/10/2023"
                    Time="18:00"
                ></PerformanceItem>
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-end">
                <Stack spacing={2} style={{ marginTop: '20px' }} >
                    <Pagination count={10} shape="rounded" color="primary" />
                </Stack>
            </Grid>
        </div>

    );
}



export default Performance;
