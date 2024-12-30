import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Image } from "antd";
import { NotificationContext } from "../../App";

import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
import { khoaHocService } from "../../services/khoaHoc.service";
import FormAddCourse from "../../components/FormAddItem/FormAddCourse";
// import { danhMucService } from "../../services/danhMuc.service";

const ManagerCourse = () => {
  const [listCourses, setListCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Thêm service call API get courses ở đây
    khoaHocService
      .getCourse()
      .then((res) => {
        showNotification("Lấy dữ liệu khóa học thành công", "success");
        console.log(res);
        setListCourses(res.data.data);
        setFilteredCourses(res.data.data);
      })
      .catch((err) => {
        showNotification("Lấy dữ liệu khóa học thất bại", "error");
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = listCourses.filter((course) => {
      console.log(course);
      const normalizedName = removeVietnameseTones(course.courseName)
        .toLowerCase()
        .trim();
      return normalizedName.includes(searchTerm);
    });
    setFilteredCourses(filtered);
  };

  const showModal = (course = null) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    khoaHocService
      .getCourse()
      .then((res) => {
        console.log(res);
        setListCourses(res.data.data);
        setFilteredCourses(res.data.data);
        showNotification("Dữ liệu đã được cập nhật", "success");
      })
      .catch((err) => {
        console.log("Error fetching updated data:", err);
        showNotification("Không thể cập nhật dữ liệu", "error");
      });
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (
        <span>{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "Mã khóa học",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          style={{ objectFit: "cover" }}
          height={75}
          width={100}
          alt="image"
          src={`http://localhost:8080/Image/${image}`}
          // className="w-20 h-20"
        />
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
      render: (creator) => creator.fullName,
    },
    {
      title: "Ngày tạo",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (creationDate) => creationDate,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description) => description,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
      key: "updateDate",
      render: (updateDate) => updateDate,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              console.log(record.courseId);

              // Thêm xử lý xóa khóa học
              khoaHocService
                .deleteCourse(record.courseId)
                .then((res) => {
                  console.log(res);
                  showNotification("Xóa khóa học thành công", "success");
                  onFinish();
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(err.response.data.message, "error");
                });
            }}
            className="bg-red-500/85 text-white py-2 px-5"
          >
            Xoá
          </button>
          <button
            className="bg-yellow-500/85 text-white py-2 px-5"
            onClick={() => {
              showModal(record);
            }}
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="w-max-[1000px]">
      <div className="mb-4 flex justify-between">
        <FormSearchProduct
          className="mx-0"
          title="Tìm kiếm khóa học..."
          onSearch={handleSearch}
        />
        <button
          onClick={() => {
            showModal();
          }}
          className="bg-yellow-500/85 font-semibold rounded-md py-2 px-5"
        >
          Thêm khóa học
        </button>
      </div>

      <FormAddCourse
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        courseData={selectedCourse}
      />

      <Table
        className="w-full max-w-full overflow-hidden"
        columns={columns}
        dataSource={filteredCourses}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredCourses.length,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManagerCourse;
