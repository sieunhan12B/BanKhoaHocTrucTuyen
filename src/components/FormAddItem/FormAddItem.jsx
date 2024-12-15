import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { getLocalStorage } from "../../utils/utils";
import { NotificationContext } from "../../App";
import { path } from "../../common/path";
const FormAddItem = ({ isModalOpen, handleCancel, onFinish, userData }) => {
  const { showNotification } = useContext(NotificationContext);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      sdt: "",
      role: "HV",
    },
    onSubmit: (values) => {
      values.taiKhoan = values.taiKhoan.trim(); // Loại bỏ khoảng trắng đầu cuối

      if (userData) {
        // Update existing user
        nguoiDungService
          .updateUser(values)
          .then((res) => {
            showNotification("Cập nhật người dùng thành công", "success");

            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data, "error");
          });
      } else {
        // Add new user
        nguoiDungService
          .addUser(values)
          .then((res) => {
            showNotification("Thêm người dùng thành công", "success");
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

  // Reset form when modal opens/closes or userData changes
  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...userData,
        matKhau: "", // Clear password for security
      });
    } else {
      formik.resetForm();
    }
  }, [userData, isModalOpen]);

  return (
    <Modal
      title={userData ? "Cập nhật người dùng" : "Thêm người dùng"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={formik.handleSubmit}>
        <InputCustom
          labelContent="Tài khoản"
          id="taiKhoan"
          name="taiKhoan"
          placeholder="Nhập tài khoản"
          classWrapper={userData ? "mb-4" : "mb-4"}
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
          readOnly={userData ? true : false}
        />

        <InputCustom
          labelContent="Mật khẩu"
          id="matKhau"
          name="matKhau"
          placeholder="Nhập mật khẩu"
          typeInput="password"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />

        <InputCustom
          labelContent="Họ tên"
          id="hoTen"
          name="hoTen"
          placeholder="Nhập họ tên"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />

        <InputCustom
          labelContent="Email"
          id="email"
          name="email"
          placeholder="Nhập email"
          typeInput="email"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <InputCustom
          labelContent="Số điện thoại"
          id="sdt"
          name="sdt"
          placeholder="Nhập số điện thoại"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.sdt}
        />

        {!window.location.pathname.includes("/my-account") && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Loại người dùng
            </label>
            <select
              name="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={formik.handleChange}
              value={formik.values.role}
            >
              <option value="HV">Học viên</option>

              <option value="admin">Quản trị</option>
              <option value="GV">Giảng viên</option>
            </select>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            {userData ? "Cập nhật" : "Thêm"}
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

export default FormAddItem;
