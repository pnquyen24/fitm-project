import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CustomeAlert from "../Member/Alert/CustomeAlert";
import "./PerformanceItem.css"


function PerformanceItem(props) {

    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        setFlip(!flip);
        console.log(flip);
    };

    return (
        <Grid item xs={2} sm={4} md={4}>
            <div className={flip ? "card flipped" : "card"}>
                <Card className="front">
                    <CardMedia
                        sx={{ height: 380 }}
                        image={props.Image}
                    />
                    <CardContent sx={{ height: 170 }}>
                        <Typography variant="h5" gutterBottom component="div">
                            {props.Place}
                        </Typography>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            {props.Name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Date: {props.Date}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Time: {props.Time}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ height: 60 }} style={{ marginLeft: '8px' }}>
                        <Button size="small" variant="contained" color="info" onClick={handleFlip}>Details</Button>
                        <JoinDialog
                            Name = {props.Name}
                            Place = {props.Place}
                            Date = {props.Date}
                            Time = {props.Time}
                        ></JoinDialog>
                    </CardActions>
                </Card>
                <Card className="front back" >
                    <CardContent sx={{ height: 550 }}>
                        <Typography variant="h5" gutterBottom component="div">
                            {props.Place}
                        </Typography>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            {props.Name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Date: {props.Date}
                        </Typography>
                        <Typography variant="body1" gutterBottom color="text.secondary">
                            Time: {props.Time}
                        </Typography>
                        <Typography variant="body1" gutterBottom color="text.secondary">
                            Details:
                        </Typography>
                        <Box
                            sx={{
                                height: 380,
                                overflow: "auto",
                            }}>
                            <CardAccordion
                                Title="Songs"
                                Name="Cô Đơn Trên Sofa"
                            ></CardAccordion>
                            <CardAccordion
                                Title="Members"
                                Name="Phạm Ngọc Quyền"
                            ></CardAccordion>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ height: 60 }} style={{ marginLeft: '8px' }}>
                        <Button size="small" variant="contained" color="info" onClick={handleFlip}>Back</Button>
                        <Button size="small" variant="contained" color="success">Attendance</Button>
                    </CardActions>
                </Card>
            </div>

        </Grid>
    );
}
function CardAccordion(props) {
    return (
        <div>
            <Accordion gutterBottom>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography gutterBottom >{props.Title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" aria-label="mailbox folders">
                        <Typography color="text.secondary">
                            <ListItem >
                                <ListItemText primary={props.Name} />
                            </ListItem>
                        </Typography>
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function JoinDialog(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleJoin = () => {
        CustomeAlert.success("Joined successfully!");
        setOpen(false);
    };
    const handleClose = () => {
        CustomeAlert.warning("Join failed!");
        setOpen(false);
    };
    return (
        <div>
            <CardActions sx={{ height: 60 }} style={{ marginLeft: '8px' }}>
            <Button size="small" variant="contained" color="success" onClick={handleClickOpen}>Join</Button>
            </CardActions>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" >
                    {"Join Show"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1">
                    Are you sure you will be able to attend the "{props.Name}" show at "{props.Place}" on {props.Date} at {props.Time}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" autoFocus onClick={handleJoin}>
                        Yes!
                    </Button>
                    <Button variant="contained" color="warning" onClick={handleClose} autoFocus>
                       Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default PerformanceItem