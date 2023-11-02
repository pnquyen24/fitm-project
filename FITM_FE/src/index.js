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
import ChangePassword from "./Components/Static/ChangePassword/ChangePassword";
import Music from "./Components/Static/Music/Music";
import Profile from "./Components/Static/Profile/Profile";
import FinanceList from "./Components/Finance/FinanceList";
import BalanceChart from "./Components/Finance/BalanceChart/BalanceChart";
import BalanceDetails from "./Components/Finance/BalanceDetails/BalanceDetails";
import IncomeDetail from "./Components/Finance/Income/IncomeDetail";
import OutcomeDetail from "./Components/Finance/Outcome/OutcomeDetail";
import CreateFinance from "./Components/Finance/CreateFinance/CreateFinance";
import FinanceRequestList from "./Components/Finance/FinanceRequestList/FinanceRequestList";
import IncomeRequestDetail from "./Components/Finance/FinanceRequestDetail/IncomeRequestDetail";
import OutcomeRequestDetail from "./Components/Finance/FinanceRequestDetail/OutcomeRequestDetail";
import AttendancePractical from "./Components/SpecialisedManager/PracticalSchedule/AttendancePractical";
import AboutUs from "./Components/Static/AboutUs/AboutUs";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Variable/Redux/store";
import Performance from "./Components/SpecialisedManager/PerformanceSchedule/Performance";
import PerformanceTable from "./Components/SpecialisedManager/PerformanceSchedule/PerformanceTable";
import Schedule from "./Components/SpecialisedManager/Schedule";
import AttendancePerformance from "./Components/SpecialisedManager/PerformanceSchedule/AttendancePerformance";
import PracticalList from "./Components/SpecialisedManager/PracticalSchedule/PracticalList";
import InstrumentReport from "./Components/Static/ReportInstrument/ReportInstrument";
import InstrumentReportManagement from "./Components/Static/InstrumentReportManagement/InstrumentReportManagement";
import Instrument from "./Components/Static/Instrument/Instrument";
import SupportFeePerformance from "./Components/SpecialisedManager/PerformanceSchedule/SupportFeePerformance";

let Authented = true;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/*" element={ Authented 
                        ? ( <App></App> ) 
                        : ( <LandingPage></LandingPage> )
                    }>
                        <Route path="" element={<Performance />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="request-edit-info-list" element={<RequestChangeInfoList />} />
                        <Route path="member-manager">
                            <Route path="create-member" element={<CreateMember />} />
                            <Route path="member-list" element={<MemberList />} />
                            <Route path="member-profile" element={<MemberProfile />} />
                            <Route path="request-edit-info-list" element={<RequestChangeInfoList />} />
                            <Route path="request-details" element={<RequestDetail />} />
                        </Route>
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="practical" element={<PracticalList />} />
                        <Route path="practical/attendancePractical" element={<AttendancePractical/>} />
                        <Route path="performance" element={<PerformanceTable />} />
                        <Route path="attendancePerformance" element={<AttendancePerformance />} />
                        <Route path="changepassword" element={<ChangePassword />} />
                        <Route path="music-list" element={<Music />} />
                        <Route path="financial-manager" >
                            <Route path="finance-list" element={<FinanceList />} />
                            <Route path="balance" element={<BalanceChart />} />
                            <Route path="income-detail" element={<IncomeDetail />} />
                            <Route path="outcome-detail" element={<OutcomeDetail />} />
                            <Route path="create-finance" element={<CreateFinance />} />
                            <Route path="finance-request-list" element={<FinanceRequestList />} />
                            <Route path="income-request-detail" element={<IncomeRequestDetail />} />
                            <Route path="outcome-request-detail" element={<OutcomeRequestDetail />} />
                            <Route path="balance-chart-details" element={<BalanceDetails />} />
                        </Route>
                        <Route path="report-instrument" element={<InstrumentReport />} />
                        <Route path="instrument-report-management" element={<InstrumentReportManagement />} />
                        <Route path="instrument" element={<Instrument />} />
                    </Route>
                    <Route path="/about-us" element={<AboutUs />}/>
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                </Routes>
            </BrowserRouter>
        </Provider>
);

reportWebVitals();
