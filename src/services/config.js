import axios from "axios";

// NV1 : Coi và setup lại một axios custom xử lí gọi API cho dự án Sell course
export const http = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  timeout: 30000,
  // headers: {
  //   tokenCyberSoft:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDQiLCJIZXRIYW5TdHJpbmciOiIwMy8wNC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NDM2Mzg0MDAwMDAiLCJuYmYiOjE3MjUwMzcyMDAsImV4cCI6MTc0Mzc4NjAwMH0.N5sVjCi7aBpELt6vYeQ04gMIVjBTB81CWtl80LZnBwU",
  // },
});
