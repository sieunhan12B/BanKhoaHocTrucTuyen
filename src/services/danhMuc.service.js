import { http } from "./config";

export const danhMucService = {
  getCategory: () => {
    return http.get("/QuanLyDanhMuc/LayDanhSachDanhMuc");
  },
  addCategory: (data) => {
    return http.post("/QuanLyDanhMuc/ThemDanhMuc", data);
  },
  updateCategory: (data) => {
    return http.put("/QuanLyDanhMuc/CapNhatDanhMuc", data);
  },
  deleteCategory: (maDanhMuc) => {
    return http.delete(`/QuanLyDanhMuc/XoaDanhMuc/${maDanhMuc}`);
  },
};
