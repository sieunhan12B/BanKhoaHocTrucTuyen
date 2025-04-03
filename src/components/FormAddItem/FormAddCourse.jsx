import React, { useContext, useEffect, useState, useRef } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import InputCustom from "../Input/InputCustom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { NotificationContext } from "../../App";
import { useLocation } from "react-router-dom";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { danhMucService } from "../../services/danhMuc.service";
import { getLocalStorage } from "../../utils/utils";
const FormAddCourse = ({ isModalOpen, handleCancel, onFinish, courseData }) => {
  console.log(courseData);
  const { showNotification } = useContext(NotificationContext);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const user = getLocalStorage("user");
  const fileInputRef = useRef(null);
  console.log(user);

  const formik = useFormik({
    initialValues: {
      courseId: "",
      courseName: "",
      price: "",
      creatorAccount: user?.username || "",
      description: "",
      courseType: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const serviceCall = courseData
        ? khoaHocService.updateCourse
        : khoaHocService.addCourse;
      serviceCall(values)
        .then((res) => {
          console.log(res);
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
          console.log(err);
          showNotification(err.response.data.message, "error");
        });
    },
  });

  useEffect(() => {
    danhMucService
      .getCategory()
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    nguoiDungService
      .getListUser()
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setListUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // const fileValue = formik.values.d; // Lưu giá trị của trường file
    // console.log(fileValue);
    if (courseData) {
      // console.log(dPreview);
      console.log(courseData);
      formik.setValues({
        ...courseData,
        creatorAccount: courseData.createrResponse?.username,
        courseType: courseData.category?.categoryName,

        // image: fileValue,
      });
      // setImagePreview(null); // Reset imagePreview nếu form được sử dụng để cập nhật
    } else {
      formik.resetForm();
      // setImagePreview(null); // Reset imagePreview khi thêm mới
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
            labelContent="Tên khóa học"
            id="courseName"
            name="courseName"
            placeholder="Nhập tên khóa học"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.courseName}
          />
          <InputCustom
            labelContent="Giá tiền"
            id="price"
            name="price"
            placeholder="Nhập giá tiền"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.price}
            typeInput="number"
          />
          <InputCustom
            labelContent="Mô tả"
            id="description"
            name="description"
            placeholder="Nhập mô tả"
            classWrapper="mb-4"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Loại danh mục
            </label>
            <select
              disabled={courseData ? true : false}
              name="courseType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={formik.handleChange}
              value={formik.values.courseType}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option
                  key={category.categoryName}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          {location.pathname !== "/teacher/my-courses" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Tài khoản Người tạo
              </label>
              <select
                name="creatorAccount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={formik.handleChange}
                value={formik.values.creatorAccount}
              >
                <option value="">Chọn tài khoản người tạo</option>
                {listUsers
                  .filter((user) => user.role.roleId === "GV") // Filter for users with role "GV"
                  .map((user) => (
                    <option key={user.username} value={user.username}>
                      {user.username}
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
              name="file"
              // ref={fileInputRef} // Thêm ref vào đây
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  formik.setFieldValue("file", file);
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  // formik.setFieldValue("image", null); // Nếu không có file, đặt lại giá trị trong formik
                  setImagePreview(null); // Xóa preview
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
