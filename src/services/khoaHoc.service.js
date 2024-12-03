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
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}`
    );
  },
  getCourseDetail: (maKhoaHoc) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  getCoursePhanTrang: (page, limit) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?pageIndex=${page}&pageSize=${limit}`
    );
  },
  addCourse: (data, token) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteCourse: (maKhoaHoc, token) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateCourse: (data, token) => {
    return http.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  registerCourse: (data, token) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
