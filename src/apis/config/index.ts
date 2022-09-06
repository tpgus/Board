import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
export const axiosInstance: AxiosInstance = axios.create({ baseURL: BASE_URL });
