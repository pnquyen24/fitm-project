import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

function ConditionalTabs({ tabs }) {
    const [currentTab, setCurrentTab] = useState(tabs[0].value);

    const handleChangeTab = (e, newTab) => {
        setCurrentTab(newTab);
    };

    return (
        <TabContext value={currentTab}>
            <Box>
                <TabList variant="fullWidth" onChange={handleChangeTab}>
                    {tabs.map((tab) => (
                        <Tab key={tab.value} value={tab.value} {...tab} />
                    ))}
                </TabList>
            </Box>
            {tabs.map((tab) =>
                tab.value === currentTab ? (
                    <TabPanel key={tab.value} value={tab.value}>
                        {tab.panel}
                    </TabPanel>
                ) : null
            )}
        </TabContext>
    );
}

export default ConditionalTabs;
