import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { path } from "../../common/path";
import UserIcon from "../../components/Icons/UserIcon";
import LogoutIcon from "../../components/Icons/LogoutIcon";
import { getLocalStorage } from "../../utils/utils";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const infoUser = getLocalStorage("user");
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      label: (
        <Link className="flex space-x-2 items-center">
          <UserIcon />
          <span>Thông tin cá nhân</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="flex space-x-2 items-center">
          <LogoutIcon />
          <span>Đăng xuất</span>
        </Link>
      ),
      key: "1",
    },
  ];

  const checkUserLogin = () => {
    return infoUser ? (
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar className="cursor-pointer hover:bg-orange-500 duration-300">
          {infoUser.taiKhoan.slice(0, 1)}
        </Avatar>
      </Dropdown>
    ) : (
      <>
        <Link
          to={path.signIn}
          className="py-2 px-4 rounded-md hover:bg-gray-200 duration-300"
        >
          sign in
        </Link>
        <Link
          to={path.signUp}
          className="py-2 px-4 text-green-500 border border-green-500 rounded-md hover:bg-green-500 duration-300 hover:text-white "
        >
          Join
        </Link>
      </>
    );
  };
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/admin/manager-user">Quản Lý Người dùng</Link>,
            },
            {
              key: "2",
              icon: <i className="fa-solid fa-briefcase"></i>,
              label: <Link>Quản Lý Khóa Học </Link>,
            },
            {
              key: "3",
              icon: <i className="fa-regular fa-handshake"></i>,
              label: <Link>Công việc đã thuê</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to={"/admin/create-user"}>Tạo người dùng</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <header className="p-5">
          <div className="container">
            <div className="header_content flex items-center justify-between">
              <div className="header_logo flex items-center space-x-5">
                <Link
                  className="text-2xl font-semibold opacity-50"
                  to={path.homePage}
                >
                  Trang chủ
                </Link>
              </div>
              <nav className="header_navigate space-x-5">
                {checkUserLogin()}
              </nav>
            </div>
          </div>
        </header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
