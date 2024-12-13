import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: "https://backend-final-0cv0.onrender.com/api",
    withCredentials: true, // Allow cookies
});

// User APIs
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const logoutUser = () => API.get("/users/logout", { withCredentials: true });

export default API;
