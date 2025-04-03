import React, { useState, useEffect } from "react";
import { Card, Row, Col, Empty, Image } from "antd";
import { Link } from "react-router-dom";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
import { khoaHocService } from "../../services/khoaHoc.service";
import { getLocalStorage } from "../../utils/utils";
import { authService } from "../../services/auth.service";

const MyLearningPage = () => {
  const user = getLocalStorage("user");
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Bắt đầu với loading là true

  useEffect(() => {
    const fetchCourses = async () => {
      // user = getLocalStorage("user");
      console.log(user);
      try {
        const res = await authService.getUserInfo(user.userId);
        console.log(res);
        // alert(res);
        // Lấy dữ liệu từ res.data
        setPurchasedCourses(res.data.coursesPurchased || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi hoàn thành
      }
    };

    fetchCourses();
  }, [user.userId]); // Thêm user.taiKhoan vào dependency array

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="my-learning-page">
      <div className="py-4 ">
        <FormSearchProduct className="mx-0" />
      </div>
      {purchasedCourses?.length === 0 ? (
        <Empty
          description="Bạn chưa mua khóa học nào"
          style={{ margin: "50px 0" }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {purchasedCourses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.courseId}>
              <Link
                to={`/courses-detail/${course.courseId}`}
                style={{ display: "block", height: "100%" }}
              >
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  cover={
                    <Image
                      alt={course.courseName}
                      src={`http://localhost:8080/Image/${course.image}`}
                      style={{ height: 200, objectFit: "cover", width: "100%" }}
                    />
                  }
                >
                  <Card.Meta
                    title={course.courseName}
                    description={course.description}
                    style={{
                      marginBottom: 10,
                      flex: 1,
                    }}
                  />
                  <div>
                    <div className="">Ngày mua: {course.registrationDate}</div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyLearningPage;
