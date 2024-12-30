import { http } from "./config";

export const khoaHocService = {
  getCourse: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  getCourseByCategory: (categoryId) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoDanhMuc/${categoryId}`
    );
  },
  getCourseDetail: (courseId) => {
    return http.get(
      `/QuanLyKhoaHoc/LayThongTinKhoaHocTheoMaKhoaHoc/${courseId}`
    );
  },
  getCourseByName: (courseName) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoTenKhoaHoc/${courseName}`
    );
  },
  addCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCourse: (courseId) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc/${courseId}`);
  },
  updateCourse: (data) => {
    return http.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getCourseByTeacher: (userId) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoMaGiangVien/${userId}`
    );
  },

  getCourseByUser: (userId) => {
    return http.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoMaHocVien/${userId}`);
  },
  registerCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
  },
  getCourseByKeyWord: (tuKhoa) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHocTheoTuKhoaTimKiem/${tuKhoa}`
    );
  },
};
