import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import ListCourses from "../../components/ListCourses/ListCourses";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Image } from "antd";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourse()
      .then((result) => {
        setData(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Banner className="bg-[url('/Image/bannersale.jpg')]" />
      <ListCourses data={data} loading={loading} />
      <div className="propel-girl flex flex-col  my-10 mx-auto justify-between"></div>
      <div className="container mx-auto max-w-[1400px] px-4 my-10 lg:px-8 xl:px-20">
        <div className="w-full items-center flex flex-col md:flex-row space-x-0 md:space-x-8">
          <Image
            src="/Image/edupost.jpg"
            alt="Professional learning"
            fill
            className="object-cover mb-4 md:mb-0"
            priority
            width={500}
          />

          <div className="w-full md:w-1/2 flex flex-col justify-end items-end gap-5">
            <div className="title">
              <h2 className="text-5xl leading-tight text-center md:text-left">
                Thúc đẩy
                <span className="text-yellow-500 font-sans font-semibold italic mx-1">
                  Sự nghiệp của bạn & mở rộng kiến thức
                </span>
                ở bất kỳ cấp độ nào.
              </h2>
            </div>
            <div className="content w-full md:w-2/3 right space-y-3">
              <p className="font-thin text-center md:text-left">
                Mở khóa tiềm năng của bạn với nền tảng e-learning tiên tiến của
                chúng tôi, được thiết kế để thúc đẩy sự nghiệp của bạn và mở
                rộng kiến thức ở bất kỳ cấp độ nào. Sản phẩm của chúng tôi cung
                cấp thư viện khóa học phong phú trên nhiều lĩnh vực, cho phép
                bạn học theo tốc độ và sự tiện lợi của riêng mình. Hưởng lợi từ
                các hội thảo tương tác, hội thảo do chuyên gia dẫn dắt và các
                chứng chỉ được công nhận trong ngành.
              </p>
              <p className="font-thin text-center md:text-left">
                Kết nối với các cố vấn và đồng nghiệp thông qua các tính năng
                kết nối mạng của chúng tôi, và đặt ra các mục tiêu nghề nghiệp
                rõ ràng với các lộ trình học tập cá nhân hóa. Luôn đi đầu bằng
                cách nắm bắt công nghệ mới và trau dồi các kỹ năng thiết yếu như
                giao tiếp và giải quyết vấn đề. Với sản phẩm e-learning của
                chúng tôi, bạn có thể đảm bảo sự phát triển và thành công liên
                tục trong một thị trường việc làm luôn thay đổi.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button className="rounded-3xl bg-yellow-500 px-5 py-3 text-sm font-semibold">
                  Khám phá thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
