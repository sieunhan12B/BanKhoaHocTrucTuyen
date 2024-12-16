import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { NotificationContext } from "../../App";
import { useLocation } from "react-router-dom";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { danhMucService } from "../../services/danhMuc.service";
const FormAddCourse = ({ isModalOpen, handleCancel, onFinish, courseData }) => {
  const { showNotification } = useContext(NotificationContext);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [listUsers, setListUsers] = useState([]);

  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      giaTien: "",
      nguoiTao: "",
      hinhAnh: "",
      moTa: "",
      loaiDanhMuc: "",
    },
    onSubmit: (values) => {
      values.maKhoaHoc = values.maKhoaHoc.trim();
      const serviceCall = courseData
        ? khoaHocService.updateCourse
        : khoaHocService.addCourse;
      serviceCall(values)
        .then((res) => {
          showNotification(
            courseData
              ? "Cập nhật khóa học thành công"
              : "Thêm khóa học thành công",
            "success"
          );
          setTimeout(() => {
            handleCancel();
            onFinish();
          }, 1000);
        })
        .catch((err) => {
          showNotification(err.response.data.message, "error");
        });
    },
  });

  useEffect(() => {
    danhMucService
      .getCategory()
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    nguoiDungService
      .getListUser()
      .then((res) => {
        console.log(res.data.data);
        setListUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            readOnly={!!courseData}
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
          <InputCustom
            labelContent="Giá tiền"
            id="giaTien"
            name="giaTien"
            placeholder="Nhập giá tiền"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.giaTien}
            typeInput="number"
          />
          <InputCustom
            labelContent="Mô tả"
            id="moTa"
            name="moTa"
            placeholder="Nhập mô tả"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Loại danh mục
            </label>
            <select
              name="loaiDanhMuc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={formik.handleChange}
              value={formik.values.loaiDanhMuc}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.maDanhMuc} value={category.maDanhMuc}>
                  {category.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>
          {location.pathname !== "/teacher/my-courses" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Người tạo
              </label>
              <select
                name="nguoiTao"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={formik.handleChange}
                value={formik.values.nguoiTao}
              >
                <option value="">Chọn người tạo</option>
                {listUsers.map((user) => (
                  <option key={user.taiKhoan} value={user.taiKhoan}>
                    {user.taiKhoan}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4 col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Hình ảnh
            </label>
            <input
              type="file"
              name="hinhAnh"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  formik.setFieldValue("hinhAnh", file);
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                }
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
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
