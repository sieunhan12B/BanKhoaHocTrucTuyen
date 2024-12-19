import React, { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import HomeIcon from "../../components/Icons/HomeIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

// Define menu items as constants
const menuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to={`/admin/${path.managerUser}`}>Quản Lý Người dùng</Link>,
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-briefcase"></i>,
    label: <Link to={`/admin/${path.managerCourse}`}>Quản Lý Khóa Học</Link>,
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-briefcase"></i>,
    label: <Link to={`/admin/${path.managerCategory}`}>Quản Lý Danh Mục</Link>,
  },
];

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(() => {
    const pathname = location.pathname;
    if (pathname.includes(path.managerUser)) {
      return "1";
    } else if (pathname.includes(path.managerCourse)) {
      return "2";
    } else if (pathname.includes(path.managerCategory)) {
      return "3";
    }
    return "1";
  });

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes(path.managerUser)) {
      setSelectedKey("1");
    } else if (pathname.includes(path.managerCourse)) {
      setSelectedKey("2");
    } else if (pathname.includes(path.managerCategory)) {
      setSelectedKey("3");
    }
  }, [location.pathname]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={`transition-all duration-300 ${
          collapsed ? "hidden md:block" : "block"
        }`}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <header className="p-5 flex items-center justify-between">
          <div className="flex items-center">
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(true)} />
            )}
            <div className="header_logo w-1/2 flex items-center space-x-5 ml-3">
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

// Add responsive styles
// In your CSS file or a styled component, add the following media queries:
