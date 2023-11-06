import { Dialog } from "@mui/material";
import PracticalSchedule from "./PracticalSchedule/PracticalSchedule";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsModalOpen,
    toggleModal,
} from "../../Variable/Redux/Slice/scheduleSlice";
import ConditionalTabs from "../Member/Schedule/ConditionalTabs";
import PerformanceSchedule from "./PerformanceSchedule/PerformanceSchedule";

function ModalSchedule({ eventInfos, isEditCard }) {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsModalOpen);
    const type = eventInfos?.event?.extendedProps?.type;

    const tabs = {
        practical: {
            value: "1",
            label: "Practical Schedule",
            panel: (
                <PracticalSchedule
                    isEditCard={isEditCard}
                    eventInfos={eventInfos}
                />
            ),
        },
        performance: {
            value: "2",
            label: "Performance Schedule",
            panel: (
                <PerformanceSchedule
                    isEditCard={isEditCard}
                    eventInfos={eventInfos}
                />
            ),
        },
    };

    const filteredTabs = getTabs();

    function getTabs() {
        if (type === "practical") {
            return [tabs.practical];
        }
        if (type === "performance") {
            return [tabs.performance];
        } else {
            return [tabs.practical, tabs.performance];
        }
    }

    function handleClose() {
        dispatch(toggleModal(false));
    }

    return (
        <Dialog
            id="schedule-dialog"
            open={isOpen}
            onClose={handleClose}
            scroll={"paper"}
        >
            <ConditionalTabs tabs={filteredTabs} />
        </Dialog>
    );
}

export default ModalSchedule;
