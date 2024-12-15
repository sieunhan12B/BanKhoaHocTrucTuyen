import { http } from "./config";

export const khoaHocService = {
  getCourse: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  getCategory: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getCourseByCategory: (maDanhMuc) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoDanhMuc/${maDanhMuc}`
    );
  },
  getCourseDetail: (maKhoaHoc) => {
    return http.get(
      `/QuanLyKhoaHoc/LayThongTinKhoaHocTheoMaKhoaHoc/${maKhoaHoc}`
    );
  },
  getCourseByName: (tenKhoaHoc) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoTenKhoaHoc/${tenKhoaHoc}`
    );
  },
  getCoursePhanTrang: (page, limit) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?pageIndex=${page}&pageSize=${limit}`
    );
  },
  addCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCourse: (maKhoaHoc) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc/${maKhoaHoc}`);
  },
  updateCourse: (data) => {
    return http.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  registerCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
  },
};
