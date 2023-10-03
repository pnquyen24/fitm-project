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
import MemberList from "./Components/HR/MemberList/MemberList";
import MemberProfile from "./Components/HR/MemberProfile/MemberProfile";
import CreateMember from "./Components/HR/CreateMember/CreateMember";
import RequestChangeInfoList from "./Components/HR/RequestChangeInfoList/RequestChangeInfoList";
import RequestDetail from "./Components/HR/RequestDetail/RequestDetail";
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
            {/* tạo một component trang bản thân phụ trách, không cần quan tâm header side bar, 
          xong gắn nó như mẫu profie ở trên
          profile chỉ là bản nháp, ai phụ trách phần này có thể xóa thoải mái
           */}
          </Route>
          <Route path="changepassword" element={<ChangePassword />} />
          {/* Add more top-level routes under home as needed */}
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();