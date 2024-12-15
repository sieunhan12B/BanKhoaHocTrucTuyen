import React from "react";
import Banner from "../../components/Banner/Banner";
const ContactPage = () => {
  return (
    <div>
      <Banner
        className={"bg-[url('/Image/banner.png')]"}
        title1={"Liên hệ"}
        title2="với chúng tôi"
        content1={`Bạn có thắc mắc, gợi ý, hoặc tìm hiểu giải pháp thông minh?`}
        content2={`Liên hệ với chúng tôi!`}
      />
      <div className="flex justify-between h-48 m-20">
        <div className="w-1/3 mx-2 bg-gray-50 p-5 ">
          <div className="rounded-full bg-yellow-500 w-10 h-10 text-center leading-10">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <p className="my-2">Email</p>
          <a href="" className="text-yellow-500">
            trogiup@edumall.vn
          </a>
        </div>
        <div className="w-1/3 mx-2 bg-gray-50 p-5">
          <div className="rounded-full bg-yellow-500 w-10 h-10 text-center leading-10">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <p className="my-2">Văn Phòng</p>
          <a href="" className="text-yellow-500">
            Tầng 6, Tòa nhà Kim Khí Thăng long, Sô 1 Lương Yên, Phường Bạch
            Đằng, Quận Hai Bà Trưng, Thành phố Hà Nội, Việt Nam
          </a>
        </div>
        <div className="w-1/3 mx-2 bg-gray-50 p-5">
          <div className="rounded-full bg-yellow-500 w-10 h-10 text-center leading-10">
            <i class="fa-solid fa-phone"></i>
          </div>
          <p className="my-2">Điện thoại</p>
          <a href="" className="text-yellow-500">
            0865868256
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
