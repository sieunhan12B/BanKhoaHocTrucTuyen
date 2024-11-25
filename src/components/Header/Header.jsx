import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

import { Image, Dropdown } from "antd";
import React from "react";
import { path } from "../../common/path";
import { Link, NavLink } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { useState, useEffect } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";
import { getLocalStorage } from "../../utils/utils";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    khoaHocService
      .getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = {
    categories: [
      {
        icon: "🌐",
        title: "Ngoại Ngữ",
        subCategories: [
          "Tiếng Anh",
          "Tiếng Trung",
          "Tiếng Nhật",
          "Tiếng Hàn",
          "Ngôn Ngữ Khác",
        ],
      },
      {
        icon: "💻",
        title: "Lập Trình - CNTT",
      },
      {
        icon: "💼",
        title: "Kinh Doanh - Khởi Nghiệp",
      },
      {
        icon: "📈",
        title: "Đầu Tư",
      },
      {
        icon: "🎨",
        title: "Thiết Kế",
      },
      {
        icon: "🎭",
        title: "Nghệ Thuật - Đời Sống",
      },
      {
        icon: "📢",
        title: "Marketing",
      },
      {
        icon: "👤",
        title: "Phát Triển Bản Thân",
      },
      {
        icon: "🏃",
        title: "Thể Thao - Sức Khỏe",
      },
    ],
  };

  const user = getLocalStorage("user");

  return (
    <header className="bg-white">
      <nav className="shadow-md">
        <div className="container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px]">
          <div className="flex items-center justify-between h-16">
            <div className="logo w-24 lg:w-32">
              <Link to={path.homePage}>
                <Image width="100%" src="/Image/logo.png" preview={false} />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <FormSearchProduct className="hidden lg:block w-[350px]" />
              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white rounded-lg shadow-lg p-4 gap-4">
                    <div>
                      <h3 className="text-gray-500 font-medium mb-2">
                        DANH MỤC
                      </h3>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <Link
                            to={`/category/${category.maDanhMuc}`}
                            key={category.id}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          >
                            <span>{category.icon}</span>
                            <span className="text-gray-700">
                              {category.tenDanhMuc}
                            </span>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                placement="bottom"
                trigger={["hover"]}
              >
                <span className="flex items-center cursor-pointer">
                  <span className="text-gray-600 hover:text-gray-800 font-medium mr-2">
                    Khóa học
                  </span>
                  <DownOutlined style={{ fontSize: "12px" }} />
                </span>
              </Dropdown>
              {user && (
                <NavLink to={`${path.student}/${path.myLearning}`}>
                  Khóa học của tôi
                </NavLink>
              )}
              <NavLink to={path.blog}>Bài viết</NavLink>
              <NavLink to={path.contact}>Liên hệ</NavLink>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {user && (
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              )}
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
              <AvatarMenu />
              <button
                className="lg:hidden text-gray-600 ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuOutlined style={{ fontSize: "24px" }} />
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && isMobile && (
          <div className="fixed inset-0 bg-white z-50">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <div className="w-24">
                  <Image width="100%" src="/Image/logo.png" preview={false} />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600"
                >
                  <CloseOutlined style={{ fontSize: "24px" }} />
                </button>
              </div>

              <div className="p-4">
                <FormSearchProduct className="block lg:hidden" />
              </div>

              <div className="flex flex-col px-4">
                <Link
                  to="/"
                  className="text-lg font-medium py-3 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Khóa học
                </Link>
                {user && (
                  <Link
                    to={`${path.student}/${path.myLearning}`}
                    className="text-lg font-medium py-3 border-b"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Khóa học của tôi
                  </Link>
                )}
                <Link
                  to={path.blog}
                  className="text-lg font-medium py-3 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bài viết
                </Link>
                <Link
                  to={path.contact}
                  className="text-lg font-medium py-3 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
