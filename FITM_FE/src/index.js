import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./Components/Member/Shedule/Schedule";
import Profile from "./Components/Static/Profile/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App></App>}>
          <Route path="profile" element={<Profile></Profile>} />
          {/* tạo một component, không cần quan tâm header side bar, 
          xong gắn nó như mẫu profie ở trên
          profile chỉ là bản nháp, ai phụ trách phần này có thể xóa thoải mái
           */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
