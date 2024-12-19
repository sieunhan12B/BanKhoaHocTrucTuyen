import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import { path } from "../../common/path";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";
import { getLocalStorage } from "../../utils/utils";
import CartIcon from "../Icons/CartIcon";
import NotifyIcon from "../Icons/NotifyIcon";
import LanguageIcon from "../Icons/LanguageIcon";
import { useNavigate } from "react-router-dom";
import FormSearchCourse from "../FormAddItem/FormSearchCourse";
import CustomDropdownHeader from "../CustomDropdownHeader/CustomDropdownHeader";
import { useSelector } from "react-redux";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const cartData = useSelector((state) => state.cartSlice.cart);
  const cartCount = cartData.length;
  console.log(cartData);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = getLocalStorage("user");

  return (
    <header className="bg-white">
      <nav className="shadow-md">
        <div className="container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="logo w-24 lg:w-32">
              <Link to={path.homePage}>
                <Image width={60} src="/Image/logo2.jpeg" preview={false} />
              </Link>
            </div>

            {/* Menu navigation (PC) */}
            <div className="hidden lg:flex items-center space-x-6 mx-4">
              <FormSearchCourse />

              <CustomDropdownHeader />

              <NavLink
                to={path.blog}
                className={({ isActive }) => {
                  return `font-medium border-b-2 border-transparent transition-all duration-300 transform hover:translate-x-1 ${
                    isActive
                      ? "!border-yellow-600 text-yellow-600"
                      : "hover:border-black"
                  }`;
                }}
              >
                Bài viết
              </NavLink>
              <NavLink
                to={path.contact}
                className={({ isActive }) =>
                  `font-medium border-b-2 border-transparent transition-all duration-300 transform hover:translate-x-1 ${
                    isActive
                      ? "!border-yellow-600 text-yellow-600"
                      : "hover:border-black"
                  }`
                }
              >
                Liên hệ
              </NavLink>
            </div>
            {/* Icon */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {user && (
                <button
                  onClick={() => navigate(path.cart)}
                  className="relative flex items-center justify-center text-gray-600 hover:text-yellow-500 transition-colors duration-300"
                >
                  <CartIcon />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
              <button className="flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300">
                <NotifyIcon />
              </button>
              <button className="flex items-center justify-center text-gray-600 hover:text-green-500 transition-colors duration-300">
                <LanguageIcon />
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

        {/* Menu navigation (Mobile) */}
        {isMenuOpen && isMobile && (
          <div className="fixed inset-0 bg-white z-50">
            <div className="flex flex-col h-full">
              {/* Header với logo và nút đóng */}
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

              {/* Thanh tìm kiếm khóa học */}
              <div className="p-4">
                <FormSearchProduct className="w-full" />
              </div>

              {/* Menu điều hướng */}
              <div className="flex flex-col px-4">
                <CustomDropdownHeader />

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
