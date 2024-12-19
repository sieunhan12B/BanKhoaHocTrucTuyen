import { http } from "./config";

export const khoaHocService = {
  getCourse: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
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
  getCourseByTeacher: (taiKhoan) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoMaNguoiDung/${taiKhoan}`
    );
  },
};
