import React from "react";
import { Link } from "react-router-dom";
import { path } from "../../common/path";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">
          Trang không tồn tại
        </h2>
        <p className="text-gray-500 mt-4 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to={path.homePage}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
