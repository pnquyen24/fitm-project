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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomeAlert from "../../Member/Alert/CustomeAlert";
import "./PerformanceItem.css";
import axiosClient from "../../../Variable/Api/api";
import moment from "moment/moment";

function PerformanceItem(props) {
    const VIEW_PERFORMANCE_DETAILS =
        "PerformanceSchedule/ViewPerformanceDetails";

    const [flip, setFlip] = useState(false);
    const [performance, setPerformance] = useState({});

    const handelClickDetails = () => {
        axiosClient
            .get(`${VIEW_PERFORMANCE_DETAILS}?pfmID=${props.ID}`)
            .then((response) => {
                setPerformance(response.data);
                handleFlip();
            })
            .catch((error) => {});
    };

    const handleFlip = () => {
        setFlip(!flip);
    };

    function dateCustomer(dateString) {
        return moment(dateString).format("DD/MM/YYYY");
    }

    function timeCustomer(timeString) {
        return moment(timeString, "HH:mm").format("HH:mm");
    }
    return (
        <Grid item xs={2} sm={4} md={4}>
            <div className={flip ? "card flipped" : "card"}>
                <Card className="front">
                    <CardMedia sx={{ height: 380 }} image={props.Image} />
                    <CardContent sx={{ height: 150 }}>
                        <Typography variant="h5" gutterBottom component="div">
                            {props.Place}
                        </Typography>
                        <Typography
                            variant="h6"
                            gutterBottom
                            color="text.secondary"
                        >
                            {props.Name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Date: {dateCustomer(props.Date)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Time: {timeCustomer(props.Time)}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{ height: 60 }}
                        style={{ marginLeft: "8px" }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={handelClickDetails}
                        >
                            Details
                        </Button>
                        <JoinDialog
                            Name={props.Name}
                            Place={props.Place}
                            Date={dateCustomer(props.Date)}
                            Time={timeCustomer(props.Time)}
                            pfmID={props.ID}
                        ></JoinDialog>
                    </CardActions>
                </Card>
                <Card className="front back">
                    <CardContent sx={{ height: 530 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            component="div"
                        ></Typography>
                        <Typography
                            variant="h6"
                            gutterBottom
                            color="text.secondary"
                        >
                            {performance.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Date: {dateCustomer(performance.date)}
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                            color="text.secondary"
                        >
                            Time: {timeCustomer(performance.time)}
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                            color="text.secondary"
                        >
                            Details:
                        </Typography>
                        <Box
                            sx={{
                                height: 360,
                                overflow: "auto",
                            }}
                        >
                            <CardAccordion
                                Title="Songs"
                                Items={performance.songs}
                            ></CardAccordion>
                            <CardAccordion
                                Title="Members"
                                Items={performance.members}
                            ></CardAccordion>
                        </Box>
                    </CardContent>
                    <CardActions
                        sx={{ height: 60 }}
                        style={{ marginLeft: "8px" }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={handleFlip}
                        >
                            Back
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Grid>
    );
}

function CardAccordion({ Title, Items, pfmID }) {
    const itemList =
        Items && Items.length > 0
            ? Items.map((item) => (
                  <ListItem>
                      <ListItemText key={item.id} primary={item.name} />
                  </ListItem>
              ))
            : null;

    return (
        <div>
            <Accordion gutterBottom>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography gutterBottom>{Title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" aria-label="mailbox folders">
                        <Typography color="text.secondary">
                            {itemList}
                        </Typography>
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function JoinDialog(props) {
    const JOIN_URL = "PerformanceSchedule/Join";

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleJoin = () => {
        axiosClient
            .put(`${JOIN_URL}?pfmID=${props.pfmID}`)
            .then((response) => {
                if (response.status == 500) {
                    CustomeAlert.error("You joined this performance!");
                } else {
                    CustomeAlert.success("Joined successfully!");
                }
            })
            .catch((error) => {
                CustomeAlert.error("You joined this performance!");
            });

        setOpen(false);
    };
    const handleClose = () => {
        CustomeAlert.warning("Join failed!");
        setOpen(false);
    };
    return (
        <div>
            <CardActions sx={{ height: 60 }} style={{ marginLeft: "8px" }}>
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={handleClickOpen}
                >
                    Join
                </Button>
            </CardActions>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Join Show"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1">
                        Are you sure you will be able to attend the "
                        {props.Name}" show at {props.Place} on {props.Date} at{" "}
                        {props.Time}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="success"
                        autoFocus
                        onClick={handleJoin}
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
export default PerformanceItem;
