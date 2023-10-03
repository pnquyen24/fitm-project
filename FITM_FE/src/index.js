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
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="home" element={<App></App>}>
          <Route path="profile" element={<Profile></Profile>} />
          <Route path="RequestEditInfoList" element={<RequestEditInfo></RequestEditInfo>} />
            <Route path="member-manager">
                < Route path="create-member" element={<CreateMember></CreateMember>} />    
                < Route path="member-list" element={<MemberList></MemberList>} />
                < Route path="member-profile" element={<MemberProfile></MemberProfile>} />
             </Route>
          <Route path="changepassword" element={<ChangePassword></ChangePassword>} />
          <Route path="member-manager" >
            < Route path="create-member" element={<CreateMember></CreateMember>} />
            <Route path="request-edit-info-list" element={<RequestChangeInfoList></RequestChangeInfoList>} />
            < Route path="information-details" element={<MemberProfile></MemberProfile>} />
            < Route path="member-list" element={<MemberList></MemberList>} />
            < Route path="request-details" element={<RequestDetail></RequestDetail>} />
          </Route>
          {/* tạo một component trang bản thân phụ trách, không cần quan tâm header side bar, 
          xong gắn nó như mẫu profie ở trên
          profile chỉ là bản nháp, ai phụ trách phần này có thể xóa thoải mái
           */}
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="home" element={<App></App>}>
                    <Route path="profile" element={<Profile></Profile>} />
                    <Route path="changepassword" element={<ChangePassword></ChangePassword>} />
                    {/* tạo một component trang bản thân phụ trách, không cần quan tâm header side bar, 
                    xong gắn nó như mẫu profie ở trên
                    profile chỉ là bản nháp, ai phụ trách phần này có thể xóa thoải mái
                    */}
                </Route>
                <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();