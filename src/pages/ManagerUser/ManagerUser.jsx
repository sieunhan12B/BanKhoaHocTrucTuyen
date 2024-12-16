import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import FormAddItem from "../../components/FormAddItem/FormAddItem";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

const ManagerUser = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
        setListNguoiDung(res.data.data);
        setFilteredUsers(res.data.data);
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

  const handleCancel = () => setIsModalOpen(false);

  const onFinish = () => {
    nguoiDungService
      .getListUser()
      .then((res) => {
        showNotification("Dữ liệu đã được cập nhật", "success");
        setListNguoiDung(res.data.data);
        setFilteredUsers(res.data.data);
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
        <span>{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text === "HV" ? "cyan-inverse" : "red-inverse"}>{text}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.taiKhoan)
                .then(() => {
                  showNotification("Xoá thành công", "success");
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
            onClick={() => showModal(record)}
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
    <div className={` w-max-[1000px]  p-4  overflow-x-auto `}>
      <div className={`mb-4 flex flex-col`}>
        <FormSearchProduct
          className="mx-0 mb-4"
          title="Tìm kiếm người dùng..."
          onSearch={handleSearch}
        />
        <button
          onClick={() => showModal()}
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
        className="w-full max-w-full overflow-hidden"
        columns={columns}
        dataSource={filteredUsers}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredUsers.length,
        }}
        onChange={handleTableChange}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default ManagerUser;
