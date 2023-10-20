import { useState } from "react";
import { Box, Dialog, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddPfmSchedule from "./PerformanceSchedule/AddPfmSchedule";
import PracticalSchedule from "./PracticalSchedule/PracticalSchedule";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsModalOpen,
    toggleModal,
} from "../../Variable/Redux/Slice/scheduleSlice";

function ModalSchedule({ eventInfos, isEditCard }) {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsModalOpen);

    const [valueTab, setValueTab] = useState("1");

    function handleChangeTab(event, newValueTab) {
        setValueTab(newValueTab);
    }

    function handleClose() {
        dispatch(toggleModal(false));
        setValueTab("1");
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} scroll={"paper"}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab label="Practical Schedule" value="1" />
                        <Tab label="Performance Schedule" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PracticalSchedule
                        isEditCard={isEditCard}
                        eventInfos={eventInfos}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <AddPfmSchedule />
                </TabPanel>
            </TabContext>
        </Dialog>
    );
}

export default ModalSchedule;
