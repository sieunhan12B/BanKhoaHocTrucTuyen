import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal, Form, Input, message, Image } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import FormAddCourse from "../../components/FormAddItem/FormAddCourse";
import { khoaHocService } from "../../services/khoaHoc.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { getLocalStorage } from "../../utils/utils";
const MyCoursePageTeach = () => {
  const { showNotification } = useContext(NotificationContext);
  const { accessToken } = getLocalStorage("user");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Khóa học React",
      description: "Học cách xây dựng ứng dụng với React",
      studentCount: 30,
      price: 500000,
      image: "/Image/hocthietke.png",
    },
    {
      id: 2,
      title: "Khóa học Node.js",
      description: "Học cách xây dựng server với Node.js",
      studentCount: 25,
      price: 600000,
      image: "/Image/hocthietke.png",
    },
    {
      id: 3,
      title: "Khóa học Python",
      description: "Học lập trình Python từ cơ bản đến nâng cao",
      studentCount: 40,
      price: 700000,
      image: "/Image/hocthietke.png",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    nguoiDungService
      .infoAccount(accessToken)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        showNotification("Thêm khóa học thành công", "success");
      })
      .catch((err) => {
        console.log(err);
        showNotification("Thêm khóa học thất bại", "error");
      });
    // Refresh the courses list after adding/updating
    // You might want to fetch the updated list from your API here
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Khóa học của tôi</h1>
        <Button
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="!bg-yellow-500 hover:!bg-yellow-700 hover:!text-white text-white p-3 text-lg h-auto border-none"
        >
          Thêm khóa học
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            className="w-full hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row gap-4">
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-gray-700 text-lg mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <UserOutlined className="text-gray-500" />
                    <p className="text-gray-600">
                      Số học viên: {course.studentCount}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">
                    {course.price.toLocaleString()} VND
                  </p>
                  <Button className="!bg-yellow-500 hover:!bg-yellow-700 hover:!text-white text-white p-2 text-lg h-auto border-none">
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <FormAddCourse
        isModalOpen={isModalVisible}
        handleCancel={handleCancel}
        onFinish={onFinish}
        courseData={null}
      />
    </div>
  );
};

export default MyCoursePageTeach;
