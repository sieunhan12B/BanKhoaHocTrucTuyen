import { http } from "./config";

export const authService = {
  logIn: (data) => {
    return http.post("/Auth/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/Auth/DangKy", data);
  },
};
