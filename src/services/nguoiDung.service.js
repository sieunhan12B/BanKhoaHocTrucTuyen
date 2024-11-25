import { http } from "./config";

export const nguoiDungService = {
  logIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data);
  },
};
