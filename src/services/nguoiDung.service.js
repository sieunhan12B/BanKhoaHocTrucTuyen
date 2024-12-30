import { http } from "./config";

export const nguoiDungService = {
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
