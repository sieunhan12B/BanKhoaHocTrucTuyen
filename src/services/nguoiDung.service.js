import { http } from "./config";

export const nguoiDungService = {
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
};
