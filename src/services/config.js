import axios from "axios";
export const http = axios.create({
  baseURL: "https://nhom7sangthu6bankhoahoc.onrender.com",
  timeout: 30000,
});
