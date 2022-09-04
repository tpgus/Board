import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
export const axiosAPI: AxiosInstance = axios.create({ baseURL: BASE_URL });
