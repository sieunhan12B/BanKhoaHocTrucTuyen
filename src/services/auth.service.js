import { http } from "./config";

export const authService = {
  logIn: (data) => {
    return http.post("/Auth/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/Auth/DangKy", data);
  },
  getUserInfo: (userId) => {
    return http.get(`/Auth/ThongTinTaiKhoan/${userId}`);
  },
};
