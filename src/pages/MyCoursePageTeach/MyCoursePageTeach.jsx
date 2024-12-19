import React, { useState, useEffect, useContext } from "react";
import { getLocalStorage } from "../../utils/utils";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Image } from "antd";
import FormAddCourse from "../../components/FormAddItem/FormAddCourse";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

const MyCoursePageTeach = () => {
  const [courses, setCourses] = useState([]);
  const user = getLocalStorage("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [courseUpdateData, setCourseUpdateData] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    khoaHocService
      .getCourseByTeacher(user.taiKhoan)
      .then((res) => {
        console.log(res.data.data);
        setCourses(res.data.data);
        setFilteredCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const onFinish = () => {
    khoaHocService
      .getCourseByTeacher(user.taiKhoan)
      .then((res) => {
        setCourses(res.data.data);
        setFilteredCourses(res.data.data);
        showNotification("Dữ liệu đã được cập nhật", "success");
      })
      .catch((err) => {
        showNotification("Không thể cập nhật dữ liệu", "error");
      });
  };

  const handleEdit = (courseUpdateData = null) => {
    setIsModalOpen(true);
    setCourseUpdateData(courseUpdateData);
  };

  const handleDelete = (id) => {
    khoaHocService
      .deleteCourse(id)
      .then((res) => {
        showNotification("Xóa khóa học thành công", "success");
        onFinish();
      })
      .catch((err) => {
        showNotification("Xóa khóa học thất bại", "error");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) => {
      const normalizedName = removeVietnameseTones(course.tenKhoaHoc)
        .toLowerCase()
        .trim();
      return normalizedName.includes(searchTerm);
    });
    setFilteredCourses(filtered);
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <FormSearchProduct
          className="mx-0"
          title="Tìm kiếm khóa học..."
          onSearch={handleSearch}
        />
        <button
          className="bg-yellow-500  font-semibold text-xl  px-5 py-3 rounded-md "
          onClick={() => setIsModalOpen(true)}
        >
          Tạo khóa học mới
        </button>
      </div>
      <FormAddCourse
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onFinish={onFinish}
        handleCancel={handleCancel}
        userData={user}
        courseData={courseUpdateData}
      />
      <ul className="space-y-4">
        {filteredCourses.map((course) => (
          <li
            key={course.maKhoaHoc}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex gap-4">
              <Image
                src={`http://localhost:8080/Image/${course.hinhAnh}`}
                alt={course.tenKhoaHoc}
                className="w-full h-40 object-cover"
                width={200}
                height={100}
              />
              <div className="flex flex-col ">
                <h2 className="text-2xl font-bold text-gray-800">
                  {course.tenKhoaHoc}
                </h2>
                <p className="text-gray-700 mt-1"> Mô tả: {course.moTa}</p>
                <p className="text-gray-500 mt-2">
                  Ngày tạo:{" "}
                  <span className="font-medium">
                    {new Date(course.ngayTao).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="ml-4 space-x-4">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 text-white  py-2 px-5"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(course.maKhoaHoc)}
                className="bg-red-500/85 text-white py-2 px-5"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCoursePageTeach;
