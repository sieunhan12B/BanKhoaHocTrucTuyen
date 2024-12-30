import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import FormAddItem from "../../components/FormAddItem/FormAddItem";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
import "./ManagerUser.scss";

const ManagerUser = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  // const roles = ["Tất cả", "GV", "HV", "admin"];
  const roles = [
    { label: "Tất cả", key: "Tất cả" },
    { label: "Giảng viên", key: "GV" },
    { label: "Học viên", key: "HV" },
    { label: "Quản trị viên", key: "ADMIN" },
  ];

  const itemsFilter = roles.map((role) => ({
    label: (
      <span
        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition duration-150 ease-in-out"
        onClick={() => handleRoleFilter(role.key)}
      >
        {role.label}
      </span>
    ),
    key: role,
  }));

  useEffect(() => {
    nguoiDungService
      .getListUser()
      .then((res) => {
        console.log(res);
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
    filterUsers(searchTerm, selectedRole);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterUsers("", role);
  };

  const filterUsers = (searchTerm, role) => {
    const filtered = listNguoiDung.filter((user) => {
      const normalizedName = removeVietnameseTones(user.fullName)
        .toLowerCase()
        .trim();
      const normalizedAccount = removeVietnameseTones(user.username)
        .toLowerCase()
        .trim();
      const matchesRole =
        role && role !== "Tất cả" ? user.roleId === role : true;
      return (
        (normalizedName.includes(searchTerm) ||
          normalizedAccount.includes(searchTerm)) &&
        matchesRole
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
      title: <div className="text-center">STT</div>,
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (
        <span className="text-center">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: <div className="text-center">Mã người dùng</div>,
      dataIndex: "userId",
      key: "userId",
      align: "center",
    },
    {
      title: <div className="text-center">Tài khoản</div>,
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: <div className="text-center">Mật khẩu</div>,
      dataIndex: "password",
      key: "password",
      align: "center",
    },
    {
      title: <div className="text-center">Họ tên</div>,
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: <div className="text-center">Email</div>,
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: <div className="text-center">Số điện thoại</div>,
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: <div className="text-center">Vai trò</div>,
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
      render: (text) => (
        <Tag
          className="text-center"
          color={
            text === "HV"
              ? "green"
              : text === "ADMIN"
              ? "red-inverse"
              : "volcano"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: <div className="text-center">Hành động</div>,
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.userId)
                .then(() => {
                  showNotification("Xoá thành công", "success");
                  onFinish();
                })
                .catch((err) => {
                  showNotification(err.response.data.message, "error");
                });
            }}
            className="bg-red-500/85 text-white py-2 px-5 rounded-md transition duration-150 ease-in-out hover:bg-red-600"
          >
            Xoá
          </button>
          <button
            className="bg-yellow-500/85 text-white py-2 px-5 rounded-md transition duration-150 ease-in-out hover:bg-yellow-600"
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
    <div className="w-max-[1000px]">
      <div className="mb-4 flex justify-between">
        <FormSearchProduct
          className="mx-0"
          title="Tìm kiếm người dùng..."
          onSearch={handleSearch}
        />
        <div className="dropdown-manageruser flex gap-4">
          <Dropdown
            overlayClassName="bg-white rounded-lg dropdown-manageruser shadow-lg z-50"
            menu={{
              items: itemsFilter,
            }}
            trigger={["click"]}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center dropdown-manager-the-a text-gray-700 font-semibold text-xl hover:text-yellow-500  "
            >
              <Space>
                Lọc theo vai trò
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <button
            onClick={() => {
              showModal();
            }}
            className="bg-yellow-500/85 font-semibold rounded-md py-2 px-5 transition duration-150 ease-in-out hover:bg-yellow-600"
          >
            Thêm người dùng
          </button>
        </div>
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
