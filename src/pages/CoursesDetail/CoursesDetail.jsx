import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { NotificationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import CartIcon from "../../components/Icons/CartIcon";
import { path } from "../../common/path";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/utils";
import {
  Tabs,
  Avatar,
  Typography,
  Rate,
  Progress,
  Select,
  Image,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ratings = [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0 }));

const CoursesDetail = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useContext(NotificationContext);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getLocalStorage("user");
  console.log(user);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourseDetail(id)
      .then((res) => setCourseDetail(res.data.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      showNotification(
        "Vui lòng đăng nhập để mua khóa học,bạn sẽ chuyển về trang đăng nhập trong 1 giây nữa",
        "info"
      );
      setTimeout(() => {
        navigate(`${path.logIn}`);
      }, 1500);
      return;
    }

    const isCourseInCart = cart.some(
      (item) => item.maKhoaHoc === courseDetail.maKhoaHoc
    );
    if (isCourseInCart) {
      showNotification("Khóa học đã có trong giỏ hàng", "info");
    } else {
      dispatch(addToCart(courseDetail));
      showNotification("Thêm vào giỏ hàng thành công", "success");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!courseDetail) return <div>Không tìm thấy khóa học</div>;

  return (
    <div className="my-10 container px-8 mx-auto">
      <div className="w-full">
        <div className="ml-16">
          <Link className="flex items-center gap-2 w-max" to="/">
            <i className="text-gray-400 fa-solid fa-arrow-left"></i>
            <span className="text-xl w-full font-bold text-gray-400">
              Quay lại trang chủ
            </span>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-4 max-[1280px]:flex-col">
          <div className="placeholder-text max-[1280px]:w-full   w-3/5 order-1 max-[1280px]:order-2">
            <div className="h-screen max-[1280px]:h-auto">
              <h1 className="text-5xl font-bold mb-4 leading-normal">
                Combo. Thành thạo Excel và tin học văn phòng
              </h1>
              <p className="text-xl mb-4">
                Excel là một phần mềm rất phổ biến của Microsoft Office với mục
                đích chính là tổng hợp và xử lý các dữ liệu có số lượng lớn
                nhanh chóng, hiệu quả, và chính xác hơn nhiều lần so với làm thủ
                công. Tuy nhiên không phải ai cũng có thể làm chủ công cụ tuyệt
                vời này. Combo này sẽ giúp học viên hiểu rõ và thành thạo hơn về
                các ứng dụng văn phòng để áp dụng ngay vào công việc, tăng năng
                suất làm việc.
              </p>
              <div className="flex items-center mb-8">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className="bg-blue-500 mr-4"
                >
                  <span className="text-2xl">E</span>
                </Avatar>
                <Title level={4} className="m-0">
                  Edumall
                </Title>
              </div>
            </div>
            <div className="mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Các khóa học trong lộ trình học tập này
              </h2>
              <div className="w-full gap-4 space-y-4">
                {["Course 1", "Course 2"].map((course, index) => (
                  <div
                    key={index}
                    className="border w-full rounded-lg p-4 shadow-md flex items-center"
                    style={{ marginBottom: "10px" }}
                  >
                    <img
                      src="/Image/khoahoc1.jpg"
                      alt={course}
                      className="w-1/3 h-32 object-cover rounded-md mb-2"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{course}</h3>
                      <p className="text-gray-600">bởi Đinh Hồng Linh</p>
                      <p className="text-gray-500">
                        82 Bài học • 12 giờ 46 phút
                      </p>
                      <p className="text-yellow-500">4.7 ★</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Bạn sẽ học được những gì
              </h2>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Các bài giảng được thiết kế theo dạng cầm tay chỉ việc, học
                  viên có thể thực hành, áp dụng được ngay vào trong công việc
                </li>
                <li>
                  Khóa học như một cuốn sách tra cứu các thủ thuật, giúp dễ dàng
                  cho bạn khi cần xem lại và sử dụng
                </li>
                <li>Có thể áp dụng được ngay vào trong công việc</li>
                <li>
                  Thành thạo các thủ thuật, cách giải quyết các vấn đề gặp phải
                  trong Excel
                </li>
                <li>
                  Hiểu được bản chất của cell (ô tính), thành phần quan trọng
                  nhất của Excel, từ đó giúp bạn tự tin khi sử dụng Excel
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">
                Những kỹ năng bạn sẽ đạt được
              </h2>
              <p className="mb-2">
                Excel, Kỹ năng chuyên ngành, Tin học văn phòng
              </p>
            </div>
            <div className="w-full">
              <Tabs defaultActiveKey="excel" size="large" className="mb-8">
                <TabPane tab="Excel" key="excel" />
                <TabPane tab="Kĩ năng chuyên ngành" key="skills" />
                <TabPane tab="Tin học văn phòng" key="office" />
              </Tabs>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-8">
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    className="bg-blue-500 mr-4"
                  >
                    <span className="text-2xl">E</span>
                  </Avatar>
                  <Title level={4} className="m-0">
                    Edumall
                  </Title>
                </div>
                <Title level={3} className="mb-8">
                  Đánh giá
                </Title>
                <div className="flex mb-8">
                  <div className="text-center mr-12">
                    <Title level={1} className="mb-2">
                      5
                    </Title>
                    <Rate disabled defaultValue={5} className="text-2xl" />
                    <Text type="secondary" className="block mt-2 text-lg">
                      0 Đánh giá
                    </Text>
                  </div>
                  <div className="flex-1">
                    {ratings.map(({ stars }) => (
                      <div key={stars} className="flex items-center mb-4">
                        <Rate
                          disabled
                          defaultValue={stars}
                          className="text-lg mr-4"
                        />
                        <Progress
                          percent={0}
                          showInfo={false}
                          className="flex-1 mr-4"
                        />
                        <Text type="secondary" className="min-w-[50px] text-lg">
                          (0)
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-yellow-500 mb-8 border-yellow-500 px-7 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  disabled={loading}
                >
                  đánh giá
                </button>
                <div className="flex space-x-4">
                  <Select
                    defaultValue="newest"
                    style={{ width: 200 }}
                    onChange={setSortBy}
                    size="large"
                    options={[
                      { value: "newest", label: "Mới nhất" },
                      { value: "oldest", label: "Cũ nhất" },
                    ]}
                  />
                  <Select
                    defaultValue="all"
                    style={{ width: 200 }}
                    onChange={setFilterBy}
                    size="large"
                    options={[
                      { value: "all", label: "Tất cả đánh giá" },
                      ...ratings.map(({ stars }) => ({
                        value: stars.toString(),
                        label: `${stars} sao`,
                      })),
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="course-card w-1/3 max-[1280px]:w-full  order-2 max-[1280px]:order-1">
            <Card className="rounded-lg w-full shadow-md sticky top-0 ">
              <div className="course-image w-full">
                <Image
                  src={`http://localhost:8080/Image/${courseDetail.hinhAnh}`}
                  alt={courseDetail.tenKhoaHoc}
                  className="w-full rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
              <div className="course-info">
                <h1 className="text-3xl font-bold mb-4">
                  {courseDetail.tenKhoaHoc}
                </h1>
                <p className="mb-2">
                  <strong>{courseDetail.giaTien}</strong>
                </p>
                <div className="course-meta mb-6">
                  <p className="font-semibold">{courseDetail.moTa}</p>

                  <p className="mb-2">
                    <span className="font-semibold">Người tạo:</span>{" "}
                    {courseDetail.nguoiTao}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Ngày tạo:</span>{" "}
                    {new Date(courseDetail.ngayTao).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-5 justify-end">
                  <button
                    className="bg-gray-900 flex items-center gap-2  border-yellow-500 px-2 py-4 font-semibold hover:text-black text-yellow-500  hover:bg-yellow-600 transition-colors"
                    onClick={handleAddToCart}
                  >
                    <CartIcon />
                    Thêm Vào Giỏ Hàng
                  </button>
                  <button
                    className="bg-yellow-500 border-yellow-500 px-10 py-4 font-semibold  hover:bg-gray-900 hover:text-yellow-500 transition-colors"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      if (!user) {
                        showNotification(
                          "Vui lòng đăng nhập để mua khóa học,bạn sẽ chuyển về trang đăng nhập trong 1 giây nữa ",
                          "info"
                        );
                        setTimeout(() => {
                          navigate(`${path.logIn}`);
                        }, 1500);
                      } else {
                        if (
                          cart.some(
                            (item) => item.maKhoaHoc === courseDetail.maKhoaHoc
                          )
                        ) {
                          navigate(`/${path.cart}`);
                        } else {
                          dispatch(addToCart(courseDetail));
                          navigate(`/${path.cart}`);
                        }
                      }
                    }}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
