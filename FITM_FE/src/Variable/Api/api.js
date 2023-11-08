import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}apis/`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const axiosLogin = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axiosLogin.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export { axiosLogin };
export default axiosClient;
