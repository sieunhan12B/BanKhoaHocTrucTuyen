import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Image } from "antd";
import { NotificationContext } from "../../App";

import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
import { khoaHocService } from "../../services/khoaHoc.service";
import FormAddCourse from "../../components/FormAddItem/FormAddCourse";
import { getLocalStorage } from "../../utils/utils";
const ManagerCourse = () => {
  const [listCourses, setListCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { accessToken } = getLocalStorage("user");
  useEffect(() => {
    // Thêm service call API get courses ở đây
    khoaHocService
      .getCourse()
      .then((res) => {
        showNotification("Lấy dữ liệu khóa học thành công", "success");
        console.log(res);
        setListCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => {
        showNotification("Lấy dữ liệu khóa học thất bại", "error");
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = listCourses.filter((course) => {
      const normalizedName = removeVietnameseTones(course.tenKhoaHoc)
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
        setListCourses(res.data);
        setFilteredCourses(res.data);
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
      title: "ID",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Lượt xem  ",
      dataIndex: "luotXem",
      key: "luotXem",
    },
    // {
    //   title: "Hình ảnh",
    //   dataIndex: "hinhAnh",
    //   key: "hinhAnh",
    //   render: (hinhAnh) => (
    //     console.log(hinhAnh),
    //     (
    //       <Image
    //         width={100}
    //         src={hinhAnh}
    //         alt="Hình ảnh khóa học"
    //         // className="w-20 h-20"
    //       />
    //     )
    //   ),
    // },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (nguoiTao) => nguoiTao?.hoTen,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              // Thêm xử lý xóa khóa học
              khoaHocService
                .deleteCourse(record.maKhoaHoc, accessToken)
                .then((res) => {
                  showNotification("Xóa khóa học thành công", "success");
                  onFinish();
                })
                .catch((err) => {
                  showNotification(err.response.data, "error");
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
    <div>
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
