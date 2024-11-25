import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Image } from "antd";
const CoursesDetail = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourseDetail(id)
      .then((res) => {
        setCourseDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!courseDetail) return <div>Không tìm thấy khóa học</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="course-image">
          <Image
            src={courseDetail.hinhAnh}
            alt={courseDetail.tenKhoaHoc}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="course-info">
          <h1 className="text-3xl font-bold mb-4">{courseDetail.tenKhoaHoc}</h1>
          <p className="text-gray-600 mb-4">{courseDetail.moTa}</p>
          <div className="course-meta mb-6">
            <p className="mb-2">
              <span className="font-semibold">Người tạo:</span>{" "}
              {courseDetail.nguoiTao?.hoTen}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Ngày tạo:</span>{" "}
              {new Date(courseDetail.ngayTao).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Lượt xem:</span>{" "}
              {courseDetail.luotXem}
            </p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Đăng ký khóa học
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
