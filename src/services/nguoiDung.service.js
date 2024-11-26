import { http } from "./config";

export const nguoiDungService = {
  logIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data);
  },
  createUSer: (data, token) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getListUser: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
};
