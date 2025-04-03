import React from "react";
import { Link } from "react-router-dom";
import FaceBook from "../Icons/FaceBook";
import { Image } from "antd";

const Footer = () => {
  const footerLinks = {
    products: {
      title: "Sản Phẩm",
      links: [
        { name: "Khóa học", path: "/khoa-hoc" },
        { name: "Bài viết", path: "/bai-viet" },
        { name: "Liên hệ", path: "/lien-he" },
      ],
    },
    policies: {
      title: "Chính sách chung & hỗ trợ",
      links: [
        { name: "Bài viết", path: "/bai-viet" },
        { name: "Điều khoản dịch vụ", path: "/dieu-khoan" },
        { name: "Chính sách bảo mật thông tin", path: "/chinh-sach" },
      ],
    },
  };

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo column */}
          <div className="lg:col-span-2">
            <Image
              src="/Image/logo2.jpeg"
              width={60}
              alt="Nhóm 7 Logo"
              preview={false}
            />
            <a href="https://facebook.com" className="mt-4 text-gray-600 block">
              <FaceBook />
            </a>
          </div>

          {/* Products column */}
          <div className="lg:col-span-2">
            <h3 className="font-bold mb-4">{footerLinks.products.title}</h3>
            <ul className="space-y-2">
              {footerLinks.products.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies column */}
          <div className="lg:col-span-3">
            <h3 className="font-bold mb-4">{footerLinks.policies.title}</h3>
            <ul className="space-y-2">
              {footerLinks.policies.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-5">
            <h3 className="font-bold mb-4">Nhận cập nhật mới nhất</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="px-2 py-1 border rounded-xl flex-grow"
              />
              <button className="bg-yellow-500 font-semibold hover:bg-yellow-600 text-black px-4 py-2 rounded-lg whitespace-nowrap text-sm">
                Đăng ký
              </button>
            </div>
            <p className="mt-4">Đường dây nóng: 0988925891</p>
          </div>
        </div>

        {/* Footer bottom - responsive text */}
        <div className="mt-8 pt-4 border-t flex flex-col lg:flex-row justify-between text-xs lg:text-sm text-gray-600 gap-2">
          <p>© 2024 CopyRights Nhóm 7| Sáng thứ 6 |D21_TH06</p>
          <div className="footer_icon ">
            <ul className="ps-0 ps-lg-4 flex gap-2">
              <li className="d-inline-block me-1">
                <a href="#">
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li className="d-inline-block me-1">
                <a href="#">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </li>
              <li className="d-inline-block me-1">
                <a href="#">
                  <i className="fa-brands fa-google-plus-g" />
                </a>
              </li>
              <li className="d-inline-block me-1">
                <a href="#">
                  <i className="fa-brands fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
