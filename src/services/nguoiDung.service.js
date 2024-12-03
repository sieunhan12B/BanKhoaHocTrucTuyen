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
  addUser: (data, token) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteUser: (account, token) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: (data, token) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
