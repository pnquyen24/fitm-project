import axios from "axios";

// axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export default axiosClient;