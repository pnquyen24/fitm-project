import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Profile from "./Components/Static/Profile/Profile";
import ChangePassword from "./Components/Static/ChangePassword/ChangePassword";
import Login from "./Components/Authentication/Login/Login";
import ForgotPassword from "./Components/Authentication/ForgotPassword/ForgotPassword";
import Music from "./Components/Static/Music/Music";
import Song from "./Components/Static/Music/Song/Song";
import LandingPage from "./Components/LandingPage/LP";

let Authented = true;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="/*" element={Authented?<App></App>:<LandingPage></LandingPage>}>
          <Route path="profile" element={<Profile></Profile>} />
          <Route path="changepassword" element={<ChangePassword></ChangePassword>} />
          <Route path="music" element={<Music></Music>} />
          <Route path="song" element={<Song></Song>} />

        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
