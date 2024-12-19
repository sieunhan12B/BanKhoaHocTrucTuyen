import React, { useEffect, useState } from "react";
import { Layout, Menu, Space, Drawer } from "antd";
import { MenuOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HomeIcon from "../../components/Icons/HomeIcon";
import { getLocalStorage } from "../../utils/utils";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { path } from "../../common/path";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { khoaHocService } from "../../services/khoaHoc.service";
const { Header, Content, Sider } = Layout;

const TeacherTemplate = () => {
  const user = getLocalStorage("user");
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedKey, setSelectedKey] = useState(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case path.myAccount:
        return "2";
      case path.myLearning:
        return "1";
      default:
        if (pathname.includes("my-courses")) return "1";
        if (pathname.includes("my-account")) return "2";
        return "1";
    }
  });

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("my-account")) {
      setSelectedKey("2");
    } else if (pathname.includes("my-learning")) {
      setSelectedKey("1");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "1",
      icon: <BookOutlined />,
      label: "Bài học của tôi",
      onClick: () => {
        setSelectedKey("1");
        navigate(path.myCourse);
      },
    },

    {
      key: "2",
      icon: <UserOutlined />,
      label: "Thông tin tài khoản",
      onClick: () => {
        setSelectedKey("2");
        navigate(path.myAccount);
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          width={250}
          theme="light"
          style={{
            borderRight: "1px solid #f0f0f0",
            overflow: "hidden",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="p-4">
            <Image
              src="/Image/logo2.jpeg"
              alt="Logo"
              preview={false}
              width={60}
            />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
      )}

      <Drawer
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={250}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="p-4">
          <Image
            src="/Image/logo2.jpeg"
            alt="Logo"
            preview={false}
            width="60%"
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
        />
      </Drawer>

      <Layout style={{ marginLeft: isMobile ? 0 : 250 }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          {/* Left side */}
          <div className="flex items-center gap-2">
            <Link to={path.homePage} className="flex items-center gap-2">
              <HomeIcon className="w-6 h-6" />
              <span> Trang chủ</span>
            </Link>
          </div>

          {/* Right side */}
          <Space size={24} className="flex items-center">
            <button className="flex items-center justify-center text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="flex items-center justify-center text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <AvatarMenu />
              <div className="hidden lg:flex flex-col">
                <h3 className="text-lg font-semibold">{user?.hoTen}</h3>
                <p className="text-sm text-gray-600">
                  {user?.role === "HV" ? "Học viên" : "Giảng viên"}
                </p>
              </div>
            </div>
            {isMobile && (
              <button onClick={() => setOpenDrawer(true)}>
                <MenuOutlined style={{ fontSize: "20px" }} />
              </button>
            )}
          </Space>
        </Header>

        {/* Content */}
        <Content>
          <h1 className="text-2xl font-bold ml-4 my-4 ">Hello {user?.hoTen}</h1>

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherTemplate;
