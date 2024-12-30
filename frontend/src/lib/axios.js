import axios from "axios";
import configuration from "../configuration/config";

export const axiosInstance = axios.create({
    baseURL: configuration.apiUrl,
    withCredentials: true,
})