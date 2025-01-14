import axios from "axios";
import configuration from "../configuration/config";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? configuration.apiUrl : "/",
    withCredentials: true,
})