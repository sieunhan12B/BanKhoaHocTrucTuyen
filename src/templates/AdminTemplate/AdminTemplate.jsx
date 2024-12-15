import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { path } from "../../common/path";
const { Header, Sider, Content } = Layout;
import HomeIcon from "../../components/Icons/HomeIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const selectedKey = location.pathname.includes(path.managerCourse)
    ? "2"
    : location.pathname.includes(path.managerCategory)
    ? "3"
    : location.pathname.includes(path.managerUser)
    ? "1"
    : "1";

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
          defaultSelectedKeys={[selectedKey]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <Link to={`/admin/${path.managerUser}`}>
                  Quản Lý Người dùng
                </Link>
              ),
            },
            {
              key: "2",
              icon: <i className="fa-solid fa-briefcase"></i>,
              label: (
                <Link to={`/admin/${path.managerCourse}`}>
                  Quản Lý Khóa Học{" "}
                </Link>
              ),
            },
            {
              key: "3",
              icon: <i className="fa-solid fa-briefcase"></i>,
              label: (
                <Link to={`/admin/${path.managerCategory}`}>
                  Quản Lý Danh Mục
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <header className="p-5">
          <div className="container">
            <div className="header_content flex items-center justify-between">
              <div className="header_logo w-1/2 flex items-center space-x-5">
                <div className="flex items-center space-x-3 w-full">
                  <Link to={path.homePage}>
                    <HomeIcon className="text-sm w-8 h-8 opacity-50" />
                  </Link>
                  <span className="text-xl font-semibold opacity-50">
                    Trang chủ
                  </span>
                </div>
              </div>
              <div>
                <AvatarMenu />
              </div>
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
