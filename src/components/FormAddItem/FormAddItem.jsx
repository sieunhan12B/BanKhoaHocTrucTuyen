import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { getLocalStorage } from "../../utils/utils";
import { NotificationContext } from "../../App";

const FormAddItem = ({ isModalOpen, handleCancel, onFinish, userData }) => {
  const { showNotification } = useContext(NotificationContext);
  const { accessToken } = getLocalStorage("user");

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
    },
    onSubmit: (values) => {
      if (userData) {
        // Update existing user
        nguoiDungService
          .updateUser(values, accessToken)
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
          .addUser(values, accessToken)
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
        maNhom: userData.maNhom || "GP01",
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
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
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
          id="soDt"
          name="soDt"
          placeholder="Nhập số điện thoại"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.soDt}
        />

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Loại người dùng
          </label>
          <select
            name="maLoaiNguoiDung"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={formik.handleChange}
            value={formik.values.maLoaiNguoiDung}
          >
            <option value="">Chọn loại người dùng</option>
            <option value="HV">Học viên</option>
            <option value="GV">Giáo viên</option>
          </select>
        </div>

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
