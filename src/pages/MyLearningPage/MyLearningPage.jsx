import React, { useState, useEffect } from "react";
import { Card, Row, Col, Empty } from "antd";
import { Link } from "react-router-dom";
import FormSearchProduct from "../../components/FormSearchProduct/FormSearchProduct";
// import axios from "axios";

const MyLearningPage = () => {
  // Mock data cho các khóa học
  const mockPurchasedCourses = [
    {
      id: 1,
      title: "Hóa học 12 - Luyện thi THPT Quốc gia",
      description:
        "Khóa học chuyên sâu về hóa học 12, chuẩn bị cho kỳ thi THPT",
      thumbnail: "/Image/rimuru.jpg",
      progress: 75,
    },
    {
      id: 2,
      title: "Hóa học 11 - Nâng cao",
      description: "Khóa học nâng cao dành cho học sinh khối 11",
      thumbnail: "/Image/rimuru.jpg",
      progress: 30,
    },
    {
      id: 3,
      title: "Ôn tập Hóa học 10",
      description: "Khóa học ôn tập kiến thức cơ bản hóa học 10",
      thumbnail: "/Image/rimuru.jpg",
      progress: 100,
    },
    {
      id: 4,
      title: "Hóa học Hữu cơ",
      description: "Chuyên đề hóa học hữu cơ cho học sinh THPT",
      thumbnail: "/Image/rimuru.jpg",
      progress: 45,
    },
    {
      id: 5,
      title: "Hóa học Đại cương",
      description: "Khóa học hóa học đại cương cho sinh viên đại học",
      thumbnail: "/Image/rimuru.jpg",
      progress: 20,
    },
    {
      id: 6,
      title: "Hóa học Vô cơ",
      description: "Khóa học hóa học vô cơ cho học sinh THPT",
      thumbnail: "/Image/rimuru.jpg",
      progress: 50,
    },
    {
      id: 7,
      title: "Hóa học Đại cương",
      description: "Khóa học hóa học đại cương cho sinh viên đại học",
      thumbnail: "/Image/rimuru.jpg",
      progress: 20,
    },
    {
      id: 8,
      title: "Hóa học Vô cơ",
      description: "Khóa học hóa học vô cơ cho học sinh THPT",
      thumbnail: "/Image/rimuru.jpg",
      progress: 50,
    },
  ];

  const [purchasedCourses, setPurchasedCourses] =
    useState(mockPurchasedCourses);
  const [loading, setLoading] = useState(false); // Đổi thành false vì không cần loading với mock data

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="my-learning-page">
      <div className="py-4 ">
        <FormSearchProduct className="mx-0" />
      </div>
      {purchasedCourses.length === 0 ? (
        <Empty
          description="Bạn chưa mua khóa học nào"
          style={{ margin: "50px 0" }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {purchasedCourses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
              <Link
                to={`/course/${course.id}`}
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
                    <img
                      alt={course.title}
                      src={course.thumbnail}
                      style={{ height: 200, objectFit: "cover", width: "100%" }}
                    />
                  }
                >
                  <Card.Meta
                    title={course.title}
                    style={{
                      marginBottom: 10,
                      flex: 1,
                      //   overflow: "hidden",
                    }}
                  />
                  <div>
                    <div>Tiến độ: {course.progress || 0}%</div>
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
