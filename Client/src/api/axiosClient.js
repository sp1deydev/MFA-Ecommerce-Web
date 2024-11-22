import axios from "axios";
import { API_URL } from "../constants/api";

let baseURL = API_URL;

const axiosClient = axios.create({
    baseURL: baseURL,
})

export default axiosClient;