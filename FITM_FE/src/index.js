import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ForgotPassword from "./Components/Authentication/ForgotPassword/ForgotPassword";
import Login from "./Components/Authentication/Login/Login";
import CreateMember from "./Components/HR/CreateMember/CreateMember";
import MemberList from "./Components/HR/MemberList/MemberList";
import MemberProfile from "./Components/HR/MemberProfile/MemberProfile";
import RequestChangeInfoList from "./Components/HR/RequestChangeInfoList/RequestChangeInfoList";
import RequestDetail from "./Components/HR/RequestDetail/RequestDetail";
import LandingPage from "./Components/LandingPage/LP";
import PracticalSchedule from "./Components/SpecialisedManager/Schedule";
import ChangePassword from "./Components/Static/ChangePassword/ChangePassword";
import Music from "./Components/Static/Music/Music";
import Profile from "./Components/Static/Profile/Profile";
import AttendancePractical from "./Components/SpecialisedManager/AttendancePractical";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Variable/Redux/store";

let Authented = true;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route
                        path="/*"
                        element={
                            Authented ? (
                                <App></App>
                            ) : (
                                <LandingPage></LandingPage>
                            )
                        }
                    >
                        <Route path="profile" element={<Profile />} />
                        <Route
                            path="request-edit-info-list"
                            element={<RequestChangeInfoList />}
                        />
                        <Route path="member-manager">
                            <Route
                                path="create-member"
                                element={<CreateMember />}
                            />
                            <Route
                                path="member-list"
                                element={<MemberList />}
                            />
                            <Route
                                path="member-profile"
                                element={<MemberProfile />}
                            />
                            <Route
                                path="request-edit-info-list"
                                element={<RequestChangeInfoList />}
                            />
                            <Route
                                path="request-details"
                                element={<RequestDetail />}
                            />
                        </Route>
                        <Route
                            path="schedule"
                            element={<PracticalSchedule />}
                        />
                        <Route
                            path="attendance"
                            element={<AttendancePractical />}
                        />
                        <Route
                            path="changepassword"
                            element={<ChangePassword />}
                        />
                        <Route path="music-list" element={<Music />} />
                    </Route>
                    <Route
                        path="/forgotPassword"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
