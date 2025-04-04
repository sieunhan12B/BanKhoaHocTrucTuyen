import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Pagination, Spin } from "antd";

const ListCourses = ({ data, loading, title = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = data.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const CourseCard = ({ data }) => (
    <Link
      className="w-full shadow-md p-2 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
      key={data.courseId}
      to={`/courses-detail/${data.courseId}`}
    >
      <div className="course-card group w-full">
        <div className="relative overflow-hidden rounded-lg w-full mb-3">
          <Image
            // sizes="small"
            rootClassName="w-full"
            src={`https://nhom7sangthu6bankhoahoc.onrender.com/uploads/${data.image}`}
            alt={data.courseName}
            className="w-full rounded-lg max-h-[150px]    "
            onError={() => setImageError(true)}
            preview={false}
            // width={280}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-800 font-medium line-clamp-2 min-h-[40px]">
            {data.courseName}
          </h3>

          <div className="flex justify-between items-center">
            <span className="text-yellow-500 font-medium">
              {data.price || "Miễn phí"}
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
      {title ? (
        <h2 className="flex items-center gap-2 mb-6">
          <span className="text-2xl lg:text-4xl font-semibold">
            Các khóa học
          </span>
          <span className="text-2xl lg:text-4xl font-bold text-yellow-500 italic font-playfair">
            mới nhất
          </span>
        </h2>
      ) : (
        ""
      )}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {currentCourses.map((course) => (
              <CourseCard key={course.courseId} data={course} />
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
