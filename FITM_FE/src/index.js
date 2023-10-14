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
import PracticalSchedule from "./Components/SpecialisedManager/PracticalSchedule";
import ChangePassword from "./Components/Static/ChangePassword/ChangePassword";
import Music from "./Components/Static/Music/Music";
import Profile from "./Components/Static/Profile/Profile";
import FinanceList from "./Components/Finance/FinanceList";
import BalanceChart from "./Components/Finance/BalanceChart/BalanceChart";
import IncomeDetail from "./Components/Finance/Income/IncomeDetail";
import OutcomeDetail from "./Components/Finance/Outcome/OutcomeDetail";
import CreateFinance from "./Components/Finance/CreateFinance/CreateFinance";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<App />}>
          <Route path="profile" element={<Profile />} />
          <Route path="request-edit-info-list" element={<RequestChangeInfoList />} />
          <Route path="member-manager" >
            <Route path="create-member" element={<CreateMember />} />
            <Route path="member-list" element={<MemberList />} />
            <Route path="member-profile" element={<MemberProfile />} />
            <Route path="request-edit-info-list" element={<RequestChangeInfoList />} />
            <Route path="request-details" element={<RequestDetail />} />
          </Route>

          <Route path="financial-manager" >
        <Route path="finance-list" element={<FinanceList/>}/>
        <Route path="balance" element={<BalanceChart/>}/>
        <Route path="income-detail" element={<IncomeDetail/>}/>
        <Route path="outcome-detail" element={<OutcomeDetail/>}/>
        <Route path="create-finance" element={<CreateFinance/>}/>
          </Route>

        <Route path="practicalSchedule" element={<PracticalSchedule />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="music" element={<Music></Music>} />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();