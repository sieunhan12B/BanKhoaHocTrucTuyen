import { http } from "./config";

export const nguoiDungService = {
  logIn: (data) => {
    return http.post("/Auth/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/Auth/DangKy", data);
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
  addUser: (data) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  deleteUser: (account) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung/${account}`);
  },
  updateUser: (data) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
  infoAccount: (token) => {
    return http.post(
      "/QuanLyNguoiDung/ThongTinTaiKhoan",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
