import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { danhMucService } from "../../services/danhMuc.service";
import { NotificationContext } from "../../App";

const FormAddCategory = ({
  isModalOpen,
  handleCancel,
  onFinish,
  categoryData,
}) => {
  const { showNotification } = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: {
      maDanhMuc: "",
      tenDanhMuc: "",
    },
    onSubmit: (values) => {
      values.maDanhMuc = values.maDanhMuc.trim();
      if (categoryData) {
        // Cập nhật danh mục
        danhMucService
          .updateCategory(values)
          .then((res) => {
            showNotification("Cập nhật danh mục thành công", "success");
            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data.message, "error");
          });
      } else {
        // Thêm mới danh mục
        danhMucService
          .addCategory(values)
          .then((res) => {
            console.log(res);
            showNotification("Thêm danh mục thành công", "success");
            setTimeout(() => {
              handleCancel();
              onFinish();
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data.message, "error");
          });
      }
    },
  });

  useEffect(() => {
    if (categoryData) {
      formik.setValues({
        ...categoryData,
      });
    } else {
      formik.resetForm();
    }
  }, [categoryData, isModalOpen]);

  return (
    <Modal
      title={categoryData ? "Cập nhật danh mục" : "Thêm danh mục"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputCustom
            labelContent="Mã danh mục"
            id="maDanhMuc"
            name="maDanhMuc"
            placeholder="Nhập mã danh mục"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.maDanhMuc}
            readOnly={categoryData ? true : false}
          />

          <InputCustom
            labelContent="Tên danh mục"
            id="tenDanhMuc"
            name="tenDanhMuc"
            placeholder="Nhập tên danh mục"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.tenDanhMuc}
          />
        </div>

        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            {categoryData ? "Cập nhật" : "Thêm"}
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

export default FormAddCategory;
