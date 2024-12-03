import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { getLocalStorage } from "../../utils/utils";
import { NotificationContext } from "../../App";
import { useLocation } from "react-router-dom";

const FormAddCourse = ({ isModalOpen, handleCancel, onFinish, courseData }) => {
  const { showNotification } = useContext(NotificationContext);
  const { accessToken } = getLocalStorage("user");
  const location = useLocation();
  const user = getLocalStorage("user");

  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      danhGia: 0,
      luotXem: 0,
      maDanhMucKhoaHoc: "",
      nguoiTao: "",
      ngayTao: new Date().toISOString().split("T")[0],
      hinhAnh:
        "https://elearningnew.cybersoft.edu.vn/hinhanh/javascriptt_gp01.png",
      maNhom: "GP01",
      moTa: "",
      biDanh: "",
      taiKhoanNguoiTao:
        location.pathname === "/teacher/my-courses" ? user.taiKhoan : "",
    },
    onSubmit: (values) => {
      if (courseData) {
        console.log(courseData);
        // Update existing course
        khoaHocService
          .updateCourse(values, accessToken)
          .then((res) => {
            showNotification("Cập nhật khóa học thành công", "success");
            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data, "error");
          });
      } else {
        // Add new course
        khoaHocService
          .addCourse(values, accessToken)
          .then((res) => {
            console.log(res);
            showNotification("Thêm khóa học thành công", "success");
            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data, "error");
          });
      }
    },
  });

  useEffect(() => {
    if (courseData) {
      formik.setValues({
        ...courseData,
        nguoiTao: courseData.nguoiTao || courseData.taiKhoanNguoiTao,
        maDanhMucKhoaHoc:
          courseData.maDanhMucKhoaHoc ||
          courseData.danhMucKhoaHoc?.maDanhMucKhoahoc,
      });
    } else {
      formik.resetForm();
    }
  }, [courseData, isModalOpen]);

  return (
    <Modal
      title={courseData ? "Cập nhật khóa học" : "Thêm khóa học"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputCustom
            labelContent="Mã khóa học"
            id="maKhoaHoc"
            name="maKhoaHoc"
            placeholder="Nhập mã khóa học"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.maKhoaHoc}
          />

          <InputCustom
            labelContent="Tên khóa học"
            id="tenKhoaHoc"
            name="tenKhoaHoc"
            placeholder="Nhập tên khóa học"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.tenKhoaHoc}
          />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Danh mục khóa học
            </label>
            <select
              name="maDanhMucKhoaHoc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={formik.handleChange}
              value={formik.values.maDanhMucKhoaHoc}
            >
              <option value="">Chọn danh mục</option>
              <option value="BackEnd">BackEnd</option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="FullStack">FullStack</option>
              <option value="Design">Design</option>
            </select>
          </div>

          {location.pathname !== "/teacher/my-courses" && (
            <InputCustom
              labelContent="Người tạo"
              id="taiKhoanNguoiTao"
              name="taiKhoanNguoiTao"
              placeholder="Nhập người tạo"
              classWrapper="mb-4"
              onChange={formik.handleChange}
              value={formik.values.taiKhoanNguoiTao}
            />
          )}

          <div className="mb-4 col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Hình ảnh
            </label>
            <input
              type="file"
              name="hinhAnh"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              //   onChange={(event) => {
              //     formik.setFieldValue("hinhAnh", event.currentTarget.files[0]);
              //   }}
            />
          </div>
        </div>

        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            {courseData ? "Cập nhật" : "Thêm"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormAddCourse;
