import "./App.css";
import SideBar from "./Components/Static/SideBar/SideBar";
import React, { useState } from 'react';
import Page from "./Components/Static/Content/Page";

function App() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="App">

            <SideBar isOpen={isOpen} setOpen={setOpen}></SideBar>
            <Page isOpen={isOpen} setOpen={setOpen}></Page>
        </div>
    );
}

export default App;