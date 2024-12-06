import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { Link } from "react-router-dom";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import FormAddItem from "../../components/FormAddItem/FormAddItem";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
import { getLocalStorage } from "../../utils/utils";
const ManagerUser = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { accessToken } = getLocalStorage("user");
  const { showNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    nguoiDungService
      .getListUser()
      .then((res) => {
        showNotification("Lấy dữ liệu người dùng thành công", "success");
        setListNguoiDung(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => {
        showNotification("Không thể lấy dữ liệu người dùng", "error");
        console.log(err);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = listNguoiDung.filter((user) => {
      const normalizedName = removeVietnameseTones(user.hoTen)
        .toLowerCase()
        .trim();
      const normalizedAccount = removeVietnameseTones(user.taiKhoan)
        .toLowerCase()
        .trim();
      return (
        normalizedName.includes(searchTerm) ||
        normalizedAccount.includes(searchTerm)
      );
    });
    setFilteredUsers(filtered);
  };

  const showModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    nguoiDungService
      .getListUser()
      .then((res) => {
        showNotification("Dữ liệu đã được cập nhật", "success");
        setListNguoiDung(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => {
        showNotification("Không thể cập nhật dữ liệu", "error");
        console.log(err);
      });
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (
        <span className="">{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },

    {
      title: "số điện thoại ",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "role",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => (
        <Tag color={text == "HV" ? "cyan-inverse" : "red-inverse"}>{text}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              console.log(record.taiKhoan, accessToken);
              nguoiDungService
                .deleteUser(record.taiKhoan, accessToken)
                .then((res) => {
                  console.log(res);
                  showNotification("Xoá thành công", "success");
                  onFinish();
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(err.response.data, "error");
                });
            }}
            className="bg-red-500/85 text-white py-2 px-5"
          >
            Xoá
          </button>
          <button
            className="bg-yellow-500/85 text-white py-2 px-5 "
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
          title="Tìm kiếm người dùng..."
          onSearch={handleSearch}
        />
        <button
          onClick={() => {
            showModal();
          }}
          className="bg-yellow-500/85 font-semibold rounded-md py-2 px-5"
        >
          Thêm người dùng
        </button>
      </div>

      <FormAddItem
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        userData={selectedUser}
      />

      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredUsers.length,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManagerUser;
