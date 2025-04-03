import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { roleService } from "../../services/role.service";
const FormAddItem = ({ isModalOpen, handleCancel, onFinish, userData }) => {
  const { showNotification } = useContext(NotificationContext);
  const [rolesData, setRolesData] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      values.username = values.username.trim(); // Loại bỏ khoảng trắng đầu cuối

      if (userData) {
        console.log(values);
        // Update existing user
        nguoiDungService
          .updateUser(values)
          .then((res) => {
            console.log(res);
            showNotification("Cập nhật người dùng thành công", "success");

            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            showNotification(err.response.data.message, "error");
          });
      } else {
        // Add new user
        nguoiDungService
          .addUser(values)
          .then((res) => {
            console.log(res);
            showNotification("Thêm người dùng thành công", "success");
            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            showNotification(err.response.data.message, "error");
          });
      }
    },
  });

  useEffect(() => {
    roleService
      .getRoles()
      .then((res) => {
        console.log(res);
        setRolesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Reset form when modal opens/closes or userData changes
  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...userData,

        // roleId: "HV", // Clear password for security
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
          id="username"
          name="username"
          placeholder="Nhập tài khoản"
          classWrapper={userData ? "mb-4" : "mb-4"}
          onChange={formik.handleChange}
          value={formik.values.username}
          readOnly={userData ? true : false}
        />

        <InputCustom
          labelContent="Mật khẩu"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu"
          typeInput="password"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <InputCustom
          labelContent="Họ tên"
          id="fullName"
          name="fullName"
          placeholder="Nhập họ tên"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.fullName}
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
          id="phone"
          name="phone"
          placeholder="Nhập số điện thoại"
          classWrapper="mb-4"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />

        {!window.location.pathname.includes("/my-account") && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Loại người dùng
            </label>
            <select
              name="role.roleId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={formik.handleChange}
              value={formik.values.roleId}
            >
              {rolesData.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleId}
                </option>
              ))}
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
