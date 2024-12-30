import React, { useState, useEffect, useContext } from "react";
import { getLocalStorage } from "../../utils/utils";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Empty, Image } from "antd";
import FormAddCourse from "../../components/FormAddItem/FormAddCourse";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

const MyCoursePageTeach = () => {
  const [courses, setCourses] = useState([]);
  const user = getLocalStorage("user");
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [courseUpdateData, setCourseUpdateData] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    khoaHocService
      .getCourseByTeacher(user.userId)
      .then((res) => {
        console.log(res);
        setCourses(res.data.data);
        setFilteredCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onFinish = () => {
    khoaHocService
      .getCourseByTeacher(user.userId)
      .then((res) => {
        console.log(res);
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
    setCourseUpdateData(null);
    setIsModalOpen(false);
  };

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) => {
      const normalizedName = removeVietnameseTones(course.courseName)
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
          className="bg-yellow-500 font-semibold text-xl px-5 py-3 rounded-md max-[768px]:text-base"
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
      {courses.length != 0 ? (
        <ul className="space-y-4">
          {filteredCourses.map((course) => (
            <li
              key={course.courseId}
              className="border p-4 rounded shadow flex max-[768px]:block justify-between items-center"
            >
              <div className="flex gap-4">
                <Image
                  src={`http://localhost:8080/Image/${course.image}`}
                  alt={course.courseName}
                  className="w-full h-40 object-cover"
                  width={200}
                  height={100}
                />
                <div className="flex flex-col ">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {course.courseName}
                  </h2>
                  <p className="text-gray-700 mt-1">
                    {" "}
                    Mô tả: {course.description}
                  </p>
                  <p className="text-gray-500 mt-2">
                    Ngày tạo:{" "}
                    <span className="font-medium">{course.creationDate}</span>
                  </p>
                </div>
              </div>
              <div className="ml-4 m space-x-4 text-right ">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white  py-2 px-5"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(course.courseId)}
                  className="bg-red-500/85 text-white py-2 px-5"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className=" flex justify-center items-center h-96">
          <Empty description="Chưa tạo khóa học nào" />
        </div>
      )}
    </div>
  );
};

export default MyCoursePageTeach;
