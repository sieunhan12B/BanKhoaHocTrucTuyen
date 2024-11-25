import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Rate, Pagination, Spin } from "antd";

const ListCourses = ({ data, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = data.slice(indexOfFirstItem, indexOfLastItem);

  // Thêm useEffect để reset page khi data thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const CourseCard = ({ course }) => (
    <Link key={course.maKhoaHoc} to={`/courses-detail/${course.maKhoaHoc}`}>
      <div className="course-card group">
        <div className="relative overflow-hidden rounded-lg mb-3">
          <Image
            src={course.hinhAnh || "/Image/khoahoc.png"}
            alt={course.tenKhoaHoc}
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            preview={false}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-800 font-medium line-clamp-2 min-h-[40px]">
            {course.tenKhoaHoc}
          </h3>

          <div className="flex items-center space-x-2">
            <Rate
              disabled
              defaultValue={course.danhGia || 5}
              className="text-sm text-yellow-400"
            />
            <span className="text-gray-500 text-sm">
              ({course.luotXem || 0})
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-yellow-500 font-medium">
              {course.hocPhi || "Miễn phí"}
            </span>
            <button className="px-4 py-1 text-sm bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px] py-8">
      <h2 className="flex items-center gap-2 mb-6">
        <span className="text-2xl lg:text-4xl font-semibold">Các khóa học</span>
        <span className="text-2xl lg:text-4xl font-bold text-yellow-500 italic font-playfair">
          mới nhất
        </span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {currentCourses.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>

          <Pagination
            align="end"
            current={currentPage}
            total={data.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            showLessItems
            className="mt-4"
          />
        </>
      )}
    </div>
  );
};

export default ListCourses;
