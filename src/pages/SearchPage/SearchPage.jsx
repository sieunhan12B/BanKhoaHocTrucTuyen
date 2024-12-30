import React, { useEffect, useState } from "react";
import ListCourses from "../../components/ListCourses/ListCourses";
import { khoaHocService } from "../../services/khoaHoc.service";
import { useSearchParams } from "react-router-dom";
import { Empty } from "antd";

const SearchPage = () => {
  const [searchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  console.log(keyword);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Kiểm tra xem keyword có tồn tại không
    if (keyword) {
      // Gọi dịch vụ tìm kiếm với từ khóa
      khoaHocService
        .getCourseByKeyWord(keyword)
        .then((res) => {
          console.log(res);
          setCourses(res.data.data); // Cập nhật danh sách khóa học
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [keyword]); // Chỉ phụ thuộc vào keyword

  return keyword == null ? (
    <div className="h-screen flex justify-center items-center">
      <Empty
        className={"font-bold"}
        description={"Không tìm thấy kết quả nào"}
      />
    </div> // Nếu keyword không tồn tại thì không hiển thị gì cả
  ) : (
    <div className="">
      <div className="my-5 container max-w-[1400px] mx-auto px-4 lg:px-8 xl:px-20">
        <p className="text-xl">
          Kết quả tìm kiếm cho từ khóa:
          <span className="text-yellow-600 "> " {keyword} "</span>
        </p>
      </div>
      <ListCourses data={courses} title={false} />
    </div>
  );
};

export default SearchPage;
